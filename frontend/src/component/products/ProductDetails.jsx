import React, { Fragment, useState, useEffect } from 'react';
import './style/productDetails.scss';
import ProductImagesSlider from '../utilis/ProductImagesSlider';
import { Link, useLocation, useParams } from 'react-router-dom';
import { productImages } from './../../assests/exp';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import RatingStars from './../utilis/RatingStars';
import { AddShoppingCartOutlined } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import { toast } from 'react-toastify';
import Box from '@material-ui/core/Box';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import {
  cusGetSingleProductDetails,
  clearErrors,
} from '../../redux/actions/productAction';
import Button from '@mui/material/Button';
import LoaderSpinner from '../utilis/LoaderSpinner';
import { addItemToCart } from '../../redux/actions/cartAction';
import { realPrice, priceConvert } from '../../assests/currencyControl';
import WaitingDialog from '../utilis/WaitingDialog';
//*avatar mui
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../layout/Footer';
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0)}`,
    // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
//*avatar mui
const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(cusGetSingleProductDetails(params.productId));
  }, []);

  //! if there state inside location we dont need to send request to database,but if not like someone shared a link we need to get info from database

  const { product, error, loading } = useSelector((state) => state.cusProducts);
  const { currs, selectedCurrency } = useSelector((state) => state.currency);
  const cart = useSelector((state) => state.cart);

  const [checkAddToCardLoading, setCheckAddToCardLoading] = useState(false);
  //const addTocartLoading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    setCheckAddToCardLoading(cart.loading);
    console.log('In product detail card loading effect');
  }, [cart.loading]);

  const [ePrice, setEPrice] = useState(product.price);
  const [eQuantity, setEQuantity] = useState(product.quantity);
  const [selectedSize, setSelectedSize] = useState({});

  function handleSizeSelect(i, item) {
    const box = document.querySelectorAll('.sizing');
    box.forEach((size, index) => {
      if (index === i && !size.classList.contains('selected-item')) {
        size.classList.add('selected-item');
      } else {
        size.classList.remove('selected-item');
      }
    });

    if (document.querySelector('.selected-item')) {
      setEPrice(item.subPrice);
      setEQuantity(item.subNumInStock);
      if (
        !document
          .querySelector('.selected-item')
          .classList.contains('outOfStock')
      ) {
        setSelectedSize(item);
      }
    } else {
      setEPrice(product.price);
      setEQuantity(product.quantity);
      setSelectedSize({});
    }
  }

  const featureSetting = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    //  mobileFirst: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          dots: true,
        },
      },
    ],

    // prevArrow: true,
  };

  //! add item to cartItem
  const addItemToCartHandel = () => {
    const { name, _id, shop } = product;
    let item = { name, _id, shop };
    if (product.quantity <= 0)
      return toast.warning('There is no Product In stock left');

    if (product.subProducts.model.length > 1) {
      if (Object.keys(selectedSize).length === 0) {
        toast.warning(`Please Select ${product.subProducts.subName}`);
        const el = document.querySelector('.select-size-text');
        el.classList.add('please-select-size');
        setTimeout(() => {
          el.classList.remove('please-select-size');
        }, 2000);
        return;
      }
      item.specific = selectedSize.name;
      item.price = selectedSize.subPrice;
      item.inStock = selectedSize.subNumInStock;
      item.image = product.cardPicture;
      item.cartQuant = 1;
    } else {
      const { cardPicture, inStockCount, price } = product;
      item.image = cardPicture;
      item.price = product.priceAfterDiscount
        ? product.priceAfterDiscount
        : price;
      item.inStock = inStockCount;
    }

    dispatch(addItemToCart(item));
  };

  const priceShow = (price, currency) => {
    return `${priceConvert(
      selectedCurrency,
      currency,
      price,
      currs
    ).toLocaleString('en-US')} ${selectedCurrency}`;
  };
  return (
    <Fragment>
      <WaitingDialog loading={checkAddToCardLoading} />
      {loading ? (
        <LoaderSpinner />
      ) : (
        Object.keys(product).length > 0 && (
          <div className="details_product">
            <div className="detail__container">
              <div className="pictures-part">
                <div className="imageWithRepCor">
                  <Carousel>
                    {product.productPictures &&
                      product.productPictures.map((picture, index) => (
                        <div key={index}>
                          <img
                            src={picture.img}
                            alt="product"
                            className="try-img-carousel"
                          />
                        </div>
                      ))}
                  </Carousel>
                </div>
                <div className="img_containerWithSlick">
                  <Slider {...featureSetting}>
                    {product.productPictures &&
                      product.productPictures.map((picture, index) => (
                        <img
                          src={picture.img}
                          alt="Product"
                          className="slickImages"
                          key={index}
                        />
                      ))}
                  </Slider>
                </div>
              </div>
              <div className="info-part">
                <h3 className="info-part__name">{product.name}</h3>

                {/* <span className="info-part__product-id">
              Product # sklfjdk35fsdf5090
            </span> for development-mode */}
                {product.subProducts.model.length > 1 && (
                  <div className="info-part__size-select ">
                    <p className="select-size-text">{`قم بتحديد ${product.subProducts.subName}`}</p>
                    <div className="size-select-container">
                      {product.subProducts.model.map((item, index) => (
                        <span
                          key={index}
                          className={
                            item.subNumInStock > 0
                              ? 'sizing'
                              : 'outOfStock sizing'
                          }
                          onClick={() => handleSizeSelect(index, item)}
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="info-part__stockCount-price">
                  <div className="info-part__stockCount-price-Container">
                    {/* <span className="h-Txt">{`السعر :`}</span> */}
                    <span className="h-val">
                      {currs?.length > 0 &&
                        (ePrice
                          ? priceShow(ePrice, product.currency)
                          : priceShow(product.price, product.currency))}
                      {/* {ePrice
                        ? realPrice(selectedCurrency, currs, ePrice)
                        : realPrice(selectedCurrency, currs, product.price)} */}
                    </span>
                    <span className="h-Txt">{': السعر'}</span>
                  </div>
                  <div className="info-part__stockCount-price-Container">
                    {/* <span className="h-Txt">In Stock:</span> */}

                    <span className="h-val">
                      {eQuantity ? eQuantity : product.inStockCount}
                    </span>
                    <span className="h-Txt">{' : العدد المتوفر'}</span>
                  </div>
                </div>

                <div className="info-part__stockContainer">
                  {/* <button
                    className="addToCard-btn"
                    onClick={addItemToCartHandel}
                  >
                    <AddShoppingCartOutlined className="card-icon" />
                    <p className="button-text">add to card</p>
                  </button> */}
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartOutlined />}
                    onClick={addItemToCartHandel}
                    className="styledBtn"
                  >
                    {'أضف الى السلة'}
                  </Button>
                </div>

                <div className="info-part__description">
                  <span className="description-header">: الوصف</span>
                  <p className="description-content">{product.description}</p>
                </div>

                <div className="info-part__sold-by">
                  <Link className="seller-store" to={`/store/${product.shop}`}>
                    {product.shop}
                  </Link>
                  <p className="sold-text">{': المتجر'}</p>
                </div>

                <div className="info-part__rating-review">
                  <Box component="fieldset" borderColor="transparent">
                    <Rating
                      name="read-only"
                      value={product.ratingsAverage}
                      readOnly
                      size="medium"
                    />
                  </Box>
                  {/* <RatingStars rating="50%" /> */}
                  <span className="review-number">{`تقييم (${product.ratingsQuantity}) `}</span>
                </div>
              </div>
            </div>

            <div className="information-part">
              {product.specification && product.specification.length > 0 && (
                <Fragment>
                  <p className="information-part__header">{'المواصفات'}</p>
                  <div className="information-part__texts">
                    <div className="info__container">
                      {product.specification.map((c, index) => (
                        <div className="feature-item" key={index}>
                          <p className="feature-item__title">{c.specific}</p>
                          {/* <p className="feature-item__specific">
                    
                          </p> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </Fragment>
              )}

              <div className="information-part__images">
                <figure className="item__specific-container">
                  {product.detailsPictures.map((item, index) => (
                    <img
                      key={index}
                      src={item.img}
                      alt="product specification"
                      className="item__specific-img"
                    />
                  ))}
                </figure>
              </div>
            </div>

            <div className="review-part">
              <p className="review-header">{'التقيمات والاراء'}</p>

              <div className="review-card__container">
                {product.reviews.length > 0 &&
                  product.reviews.map((rev, i) => (
                    <div className="review-card" key={i}>
                      <div className="review-card__user">
                        <Stack direction="row" spacing={4}>
                          <Avatar
                            {...stringAvatar(rev.user.name)}
                            sx={{
                              ['@media (max-width:780px)']: {
                                width: 20,
                                height: 20,
                              },
                            }}
                          />
                        </Stack>
                        <span className="review-card__user-name">
                          {rev.user.name}
                        </span>
                      </div>
                      <div className="review-card__rating">
                        <Rating
                          name="read-only"
                          value={rev.rating}
                          readOnly
                          size="small"
                        />

                        <span className="review-card__rating-data">
                          {showDate(rev.CreatedAt)}
                        </span>
                      </div>
                      <p className="review-card__comment">{rev.comment}</p>
                    </div>
                  ))}
              </div>
            </div>
            <Footer />
          </div>
        )
      )}
    </Fragment>
  );
};
const showDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
export default ProductDetails;
