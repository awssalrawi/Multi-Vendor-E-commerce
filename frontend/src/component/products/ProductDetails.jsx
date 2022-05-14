import React, { Fragment, useState } from 'react';
import './style/productDetails.scss';
import ProductImagesSlider from '../utilis/ProductImagesSlider';
import { Link } from 'react-router-dom';
import { productImages } from './../../assests/exp';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
//import { ReactComponent as CardIcon } from './../../assests/add-to-cart.svg';
import RatingStars from './../utilis/RatingStars';
import { AddShoppingCartOutlined } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';

import Box from '@material-ui/core/Box';
import Slider from 'react-slick';
const ProductDetails = () => {
  const [value, setValue] = React.useState(2.5);
  const [quantity, setQuantity] = useState(1);

  let selectedSize;
  function handleSizeSelect(i) {
    const box = document.querySelectorAll('.sizing');
    box.forEach((size, index) => {
      if (index === i && !size.classList.contains('selected-item')) {
        console.log(index);
        selectedSize = size.textContent;
        console.log('selectedSize: ', selectedSize);
        size.classList.add('selected-item');
      } else {
        size.classList.remove('selected-item');
      }
    });
  }

  const increaseQty = () => {
    const count = document.querySelector('.toAddCount').innerText * 1;
    // let a = document.querySelector('.toAddCount').innerText;
    console.log('count', count);
    if (count >= 10) return;
    const qty = count + 1;
    document.querySelector('.toAddCount').innerHTML = qty;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector('.toAddCount').innerText * 1;
    if (count <= 1) return;
    const qty = count - 1;
    document.querySelector('.toAddCount').innerHTML = qty;
    setQuantity(qty);
  };

  const featureSetting = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    mobileFirst: true,
    autoplaySpeed: 3000,
    arrows: true,

    // prevArrow: true,
  };
  return (
    <Fragment>
      <div className="details_product">
        <div className="detail__container">
          <div className="pictures-part">
            <div className="imgs__container-withswiper">
              <ProductImagesSlider images={productImages} />
            </div>
            <div className="img_containerWithSlick">
              <Slider {...featureSetting}>
                <img
                  src="/img/gal-1.jpeg"
                  alt="Product"
                  className="slickImages"
                />
                <img
                  src="/img/gal-2.jpeg"
                  alt="Product"
                  className="slickImages"
                />
                <img
                  src="/img/gal-3.jpeg"
                  alt="Product"
                  className="slickImages"
                />
                <img
                  src="/img/gal-4.jpeg"
                  alt="Product"
                  className="slickImages"
                />
                <img
                  src="/img/gal-5.jpeg"
                  alt="Product"
                  className="slickImages"
                />
                <img
                  src="/img/gal-6.jpeg"
                  alt="Product"
                  className="slickImages"
                />
              </Slider>
            </div>
          </div>
          <div className="info-part">
            <h3 className="info-part__name">
              onn. 32” Class HD (720P) LED Roku Smart TV (100012589)
            </h3>
            <span className="info-part__product-price">$35.88</span>

            {/* <span className="info-part__product-id">
              Product # sklfjdk35fsdf5090
            </span> for development-mode */}

            <div className="info-part__size-select">
              <p className="select-size-text">Please Select Size</p>
              <div className="size-select-container">
                <span className="sizing" onClick={() => handleSizeSelect(0)}>
                  xl
                </span>
                <span className="sizing" onClick={() => handleSizeSelect(1)}>
                  s
                </span>
                <span className="sizing" onClick={() => handleSizeSelect(2)}>
                  xxs
                </span>
                <span className="sizing" onClick={() => handleSizeSelect(3)}>
                  xs
                </span>
                <span className="sizing" onClick={() => handleSizeSelect(4)}>
                  xxl
                </span>
                <span className="sizing">xl</span>
                <span className="sizing">m</span>
                <span className="sizing">xxxl</span>
                <span className="sizing">xxxxl</span>
                <span className="sizing">xs</span>
                <span className="sizing">xxl</span>
                <span className="sizing">xl</span>
                <span className="sizing">m</span>
                <span className="sizing">xxxl</span>
                <span className="sizing">xxxxl</span>
                <span className="sizing">xs</span>
                <span className="sizing" onClick={() => handleSizeSelect(18)}>
                  xxl
                </span>
                <span className="sizing">xl</span>
                <span className="sizing">m</span>
                <span className="sizing selected-item">xxxl</span>
                <span className="sizing outOfStock">xxxxl</span>
              </div>
            </div>

            <div className="info-part__stockContainer">
              <div className="product-amounts">
                <button className="stock-count-btn minus" onClick={decreaseQty}>
                  -
                </button>
                <span className="toAddCount" type="number">
                  1
                </span>
                {/* <input
                  type="number"
                  className="toAddCount"
                  value={quantity}
                  readOnly
                /> */}
                <button className="stock-count-btn plus" onClick={increaseQty}>
                  +
                </button>
              </div>

              <div className="product-quantity"></div>
              <Link to="/activate" className="addToCard-btn">
                <AddShoppingCartOutlined className="card-icon" />
                <p className="button-text">add to card</p>
              </Link>
            </div>

            <div className="info-part__description">
              <span className="description-header">Description:</span>
              <p className="description-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                quo adipisci consequuntur deserunt animi quae ducimus ipsam
                possimus molestiae a quis explicabo qui voluptatum iusto!
                Deleniti ut perspiciatis sapiente quasi?
              </p>
            </div>

            <div className="info-part__sold-by">
              <p className="sold-text">Sold By:</p>
              <p className="seller-store">Amazon store</p>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                voluptas id quidem nostrum? Quasi minima doloribus magnam
                recusandae accusamus. Sint minus repudiandae ab adipisci aliquam
                animi, delectus consectetur vitae quae.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                voluptas id quidem nostrum? Quasi minima doloribus magnam
                recusandae accusamus. Sint minus repudiandae ab adipisci aliquam
                animi, delectus consectetur vitae quae.
              </p>
            </div>
          </div>
        </div>
        <div className="information-part">
          <p className="information-part__header">Specifications</p>
          <div className="information-part__texts">
            <div className="info__container">
              <div className="feature-item">
                <p className="feature-item__title">Origin :</p>
                <p className="feature-item__specific">Turkey</p>
              </div>
              <div className="feature-item">
                <p className="feature-item__title">Origin :</p>
                <p className="feature-item__specific">Turkey</p>
              </div>
              <div className="feature-item">
                <p className="feature-item__title">Origin :</p>
                <p className="feature-item__specific">Turkey</p>
              </div>
              <div className="feature-item">
                <p className="feature-item__title">Origin :</p>
                <p className="feature-item__specific">Turkey</p>
              </div>
            </div>
          </div>
          <div className="information-part__images">
            <figure className="item__specific-container">
              {productImages.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="product specification"
                  className="item__specific-img"
                />
              ))}
            </figure>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
