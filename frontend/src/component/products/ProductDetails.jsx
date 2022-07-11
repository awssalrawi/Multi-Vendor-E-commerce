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
import { realPrice } from '../../assests/currencyControl';
import WaitingDialog from '../utilis/WaitingDialog';

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
  const [value, setValue] = React.useState(2.5);

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
          dots: false,
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
      const { cardPicture, quantity, price } = product;
      item.image = cardPicture;
      item.price = product.priceAfterDiscount
        ? product.priceAfterDiscount
        : price;
      item.inStock = quantity;
    }

    dispatch(addItemToCart(item));
  };
  return (
    <Fragment>
      <WaitingDialog loading={checkAddToCardLoading} />
      {loading ? (
        <LoaderSpinner text="Getting Product.." />
      ) : (
        Object.keys(product).length > 0 && (
          <div className="details_product">
            <div className="detail__container">
              <div className="pictures-part">
                {/* <div className="imgs__container-withswiper">
                  <ProductImagesSlider images={product.productPictures} />
                </div> */}
                {/* <div className="verticalImageStack">
                  {product.productPictures.map((item, index) => (
                    <div className="thumbnail" key={index}>
                      <img src={item.img} alt="Product" />
                    </div>
                  ))}
                </div> */}
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
                    <p className="select-size-text">{`Please Select ${product.subProducts.subName}`}</p>
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
                    <span className="h-Txt">Price:</span>
                    <span className="h-val">
                      {currs?.length > 0 &&
                        (ePrice
                          ? realPrice(selectedCurrency, currs, ePrice)
                          : realPrice(selectedCurrency, currs, product.price))}
                      {/* {ePrice
                        ? realPrice(selectedCurrency, currs, ePrice)
                        : realPrice(selectedCurrency, currs, product.price)} */}
                    </span>
                  </div>
                  <div className="info-part__stockCount-price-Container">
                    <span className="h-Txt">In Stock:</span>
                    <span className="h-val">
                      {eQuantity ? eQuantity : product.quantity}
                    </span>
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
                    Add To Cart
                  </Button>
                </div>

                <div className="info-part__description">
                  <span className="description-header">Description:</span>
                  <p className="description-content">{product.description}</p>
                </div>

                <div className="info-part__sold-by">
                  <p className="sold-text">Sold By:</p>
                  <Link className="seller-store" to={`/store/${product.shop}`}>
                    {product.shop}
                  </Link>
                </div>

                <div className="info-part__rating-review">
                  <RatingStars rating="50%" />
                  <span className="review-number">56 Review</span>
                </div>
              </div>
            </div>
            <div className="review-part">
              <p className="review-header">Reviews</p>
              <div className="review-card__container">
                <div className="review-card">
                  <div className="review-card__user">
                    <img
                      src="https://picsum.photos/200"
                      alt="user avatar"
                      className="review-card__user-avatar "
                    />
                    <span className="review-card__user-name">Awss</span>
                  </div>
                  <div className="review-card__rating">
                    <Box component="fieldset" borderColor="transparent">
                      <Rating name="read-only" value={value} readOnly />
                    </Box>
                    <span className="review-card__rating-data">17.03.2022</span>
                  </div>
                  <p className="review-card__comment">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis voluptas id quidem nostrum? Quasi minima doloribus
                    magnam recusandae accusamus. Sint minus repudiandae ab
                    adipisci aliquam animi, delectus consectetur vitae quae.
                  </p>
                </div>
                <div className="review-card">
                  <div className="review-card__user">
                    <img
                      src="https://picsum.photos/200"
                      alt="user avatar"
                      className="review-card__user-avatar "
                    />
                    <span className="review-card__user-name">Awss</span>
                  </div>
                  <div className="review-card__rating">
                    <RatingStars rating="50%" />
                    <span className="review-card__rating-data">17.03.2022</span>
                  </div>
                  <p className="review-card__comment">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis voluptas id quidem nostrum? Quasi minima doloribus
                    magnam recusandae accusamus. Sint minus repudiandae ab
                    adipisci aliquam animi, delectus consectetur vitae quae.
                  </p>
                </div>
              </div>
            </div>
            <div className="information-part">
              {product.specification && product.specification.length > 0 && (
                <Fragment>
                  <p className="information-part__header">Specifications</p>
                  <div className="information-part__texts">
                    <div className="info__container">
                      {product.specification.map((c, index) => (
                        <div className="feature-item" key={index}>
                          <p className="feature-item__title">{c.specific}</p>
                          <p className="feature-item__specific">
                            {/* {' '}
                            {c.specific.split(':')[1].toUpperCase()} */}
                          </p>
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
          </div>
        )
      )}
    </Fragment>
  );
};

export default ProductDetails;
