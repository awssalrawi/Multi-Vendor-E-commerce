import React from 'react';
import './styles/simpleProductCart.scss';
const SimpleProductCard = () => {
  return (
    <div className="simple-product">
      <div className="simple-product__content">
        <img
          className="simple-product__content-img"
          src="./img/house-6.jpeg"
          alt="Product"
        />
        <p className="simple-product__content-name">Smart Watch</p>
        <span className="simple-product__content-price">$16</span>
      </div>
    </div>
  );
};

export default SimpleProductCard;
