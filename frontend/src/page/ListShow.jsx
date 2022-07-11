import React from 'react';
import './style/list-show.scss';
import { Link } from 'react-router-dom';
const ListShow = ({ products }) => {
  return (
    <div class="pro-list">
      {products &&
        products.map((product, index) => (
          <div className="list-card" key={index}>
            <figure className="card-fig">
              <img
                src={product.cardPicture}
                alt="Product"
                className="card-fig__img"
              />
            </figure>
            <div className="card-content">
              <Link
                className="card-content__text"
                to={`/product/${product._id}`}
              >
                {product.name}
              </Link>
              <span className="card-content__price">{product.price}</span>
              <span className="card-content__Shipping">
                {product.shippingPrice}
              </span>
              <Link className="card-content__store" to="#">
                {product.shop}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListShow;
