import React, { Fragment, useEffect, useState } from 'react';
import './style/list-show.scss';
import { Link } from 'react-router-dom';
import { priceShow } from '../assests/currencyControl';
import { useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
const ListShow = ({ products }) => {
  const { currs, selectedCurrency } = useSelector((state) => state.currency);

  const [userCur, setUserCur] = useState(selectedCurrency);

  useEffect(() => {
    setUserCur(selectedCurrency);
    console.log('use Effect called for selecetcurrency');
  }, [selectedCurrency]);

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
                      priceShow(
                        userCur,
                        product.currency,
                        product.priceAfterDiscount,
                        currs
                      )}
                  </span>
                  <span className="item__price-dis-rate">{`-${(
                    100 -
                    (product.priceAfterDiscount * 100) / product.price
                  ).toFixed(0)}%`}</span>
                </Fragment>
              ) : (
                <span className="item__price-dis">
                  {currs.length > 0 &&
                    priceShow(userCur, product.currency, product.price, currs)}
                </span>
              )}
              {/* <span className="card-content__price">{product.price}</span> */}
              <span className="card-content__Shipping">
                {product.shippingPrice}
              </span>
              <Link
                className="card-content__store"
                to={`/store/${product.shop}`}
              >
                {product.shop}
              </Link>
              <div className="card-content__ratings">
                <Box component="fieldset" borderColor="transparent">
                  <Rating
                    name="read-only"
                    value={product.ratingsAverage}
                    readOnly
                    size="small"
                  />
                </Box>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListShow;
