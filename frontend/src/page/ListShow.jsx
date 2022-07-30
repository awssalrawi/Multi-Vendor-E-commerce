import React, { Fragment } from 'react';
import './style/list-show.scss';
import { Link } from 'react-router-dom';
import { priceConvert } from '../assests/currencyControl';
import { useSelector } from 'react-redux';

const ListShow = ({ products }) => {
  const { currs, selectedCurrency } = useSelector((state) => state.currency);

  const priceShow = (price, currency) => {
    return `${priceConvert(
      selectedCurrency,
      currency,
      price,
      currs
    )} ${selectedCurrency}`;
  };
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
              {product.priceAfterDiscount ? (
                <Fragment>
                  <span className="item__price-dis">
                    {currs.length > 0 &&
                      priceShow(product.priceAfterDiscount, product.currency)}
                  </span>
                  <span className="item__price-dis-rate">{`-${(
                    100 -
                    (product.priceAfterDiscount * 100) / product.price
                  ).toFixed(0)}%`}</span>
                </Fragment>
              ) : (
                <span className="item__price-dis">
                  {currs.length > 0 &&
                    priceShow(product.price, product.currency)}
                </span>
              )}
              {/* <span className="card-content__price">{product.price}</span> */}
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
