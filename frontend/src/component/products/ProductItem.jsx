import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './style/product-item.scss';
import RatingStars from '../utilis/RatingStars';

const ProductItem = () => {
  return (
    <Fragment>
      <Link to="#" className="product__item">
        <img
          src="img/house-5.jpeg"
          alt="product"
          className="product__item__img"
        />
        <div className="product__item__details">
          <h2 className="product__item__name">Baby Nylon Head band,</h2>

          <div className="product__item__info">
            <span className="product__item__price-dis">120.99$</span>
            <span className="product__item__price-dis-rate">-34%</span>
          </div>
          <div className="product__item__review">
            <RatingStars rating="58%" />
            <span className="product__item__review-number">(134)</span>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default ProductItem;
