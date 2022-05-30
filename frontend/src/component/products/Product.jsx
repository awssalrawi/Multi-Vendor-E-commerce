import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './style/product.scss';

import Rating from '@material-ui/lab/Rating';

import Box from '@material-ui/core/Box';

const Product = ({ products }) => {
  // const { name, price,  cardPicture, shop } = products;
  const [value, setValue] = React.useState(2.5);
  return (
    <Fragment>
      <div className="product">
        <div className="product__container">
          {/*//? Job Place */}
          {products &&
            products.map((product) => {
              const { name, price, cardPicture, shop } = product;
              return (
                <Link
                  className="product__item link"
                  to={`/product/${product._id}`}
                  key={product._id}
                  state={product}
                >
                  <img
                    src={
                      cardPicture
                        ? cardPicture
                        : 'https://cdn.dribbble.com/users/844846/screenshots/2855815/no_image_to_show_.jpg'
                    }
                    alt="product"
                    className="product__item__img"
                  />
                  <div className="product__item__details">
                    <span className="product__item__name">{name}</span>

                    <div className="product__item__info">
                      {product.priceAfterDiscount ? (
                        <Fragment>
                          <span className="item__price-dis">
                            {product.priceAfterDiscount}$
                          </span>
                          <span className="item__price-dis-rate">{`-${(
                            (product.priceAfterDiscount * 100) /
                            price
                          ).toFixed(0)}%`}</span>
                        </Fragment>
                      ) : (
                        <span className="item__price-dis">{price}</span>
                      )}
                    </div>
                    <div className="product__item__review">
                      <Box component="fieldset" borderColor="transparent">
                        <Rating name="read-only" value={value} readOnly />
                      </Box>
                      <span className="product-review-number">(134)</span>
                    </div>
                    {/* <span className="product__item__shipping">+Shipping: 5$</span> */}
                    <span className="product__item__seller">{`${shop}-store`}</span>
                  </div>
                </Link>
              );
            })}

          {/*//? Job Place */}
          {/* 
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div>
          <div className="product__item">
            <img
              src="img/house-5.jpeg"
              alt="product"
              className="product__item__img"
            />
            <div className="product__item__details">
              <span className="product__item__name">
                2021 New Printed Baby Nylon Headband,
              </span>

              <div className="product__item__info">
                <span className="item__price-dis">120.99$</span>
                <span className="item__price-dis-rate">-34%</span>
              </div>
              <div className="product__item__review">
                <Box component="fieldset" borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <span className="product-review-number">(134)</span>
              </div>
              <span className="product__item__shipping">+Shipping: 5$</span>
              <span className="product__item__seller">Awss store</span>
            </div>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
