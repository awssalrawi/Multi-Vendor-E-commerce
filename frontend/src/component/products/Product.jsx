import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/product.scss';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { priceShow, priceConvert } from '../../assests/currencyControl';

const Product = ({ products }) => {
  // const { name, price,  cardPicture, shop } = products;
  const [value, setValue] = React.useState(2.5);
  const { currs, selectedCurrency } = useSelector((state) => state.currency);

  const [load, setLoad] = useState(false);
  const onLoadedImage = () => {
    setLoad(true);
  };

  const [userCur, setUserCur] = useState(selectedCurrency);

  useEffect(() => {
    setUserCur(selectedCurrency);
    console.log('use Effect called for selecetcurrency');
  }, [selectedCurrency]);

  return (
    <Fragment>
      <div className="product">
        <div className="product__container">
          {products &&
            currs.length > 0 &&
            products.map((product) => {
              const { name, price, cardPicture, shop } = product;
              return (
                <Link
                  className="product__item link"
                  to={`/product/${product._id}`}
                  key={product._id}
                  state={product}
                >
                  <div className="product__item__img-container">
                    {!load && (
                      <div className="prod-no-img">
                        <span className="prod-no-img__text">Ltreda</span>
                      </div>
                    )}
                    <img
                      src={
                        cardPicture
                          ? cardPicture
                          : 'https://cdn.dribbble.com/users/844846/screenshots/2855815/no_image_to_show_.jpg'
                      }
                      alt="product"
                      className="product-image"
                      onLoad={() => setLoad(true)}
                    />
                  </div>
                  <div className="product__item__details">
                    <span className="product__item__name">{name}</span>

                    <div className="product__item__info">
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
                            priceShow(
                              userCur,
                              product.currency,
                              product.price,
                              currs
                            )}
                        </span>
                      )}
                    </div>
                    <div className="product__item__review">
                      <Box component="fieldset" borderColor="transparent">
                        <Rating
                          name="read-only"
                          value={value}
                          readOnly
                          size="small"
                        />
                      </Box>
                      <span className="product-review-number">(134)</span>
                    </div>
                    {/* <span className="product__item__shipping">+Shipping: 5$</span> */}
                    <span className="product__item__seller">{`${shop}-store`}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
