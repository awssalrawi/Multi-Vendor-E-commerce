import React, { Fragment, useState, useEffect } from 'react';
import './styles/display-selected-items.scss';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Add, RemoveRounded } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getMyCartItems } from '../../redux/actions/cartAction';

const dimi = [
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'dreams',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'dreams',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'marka',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'colins',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'dreams',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'WAQ',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'Aws',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
];

const DisplaySelectedItems = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyCartItems());
    }
  }, [isAuthenticated]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  return (
    <div className="dsi-items-side">
      {cartItems?.length > 0 &&
        cartItems.map((item, index) => (
          <Fragment key={index}>
            <div className="dsi-item-container">
              <div className="item-info">
                <figure className="item-info__shape">
                  <img
                    src={item.image}
                    alt="Product"
                    className="item-info__shape-img"
                  />
                </figure>

                <div className="item-info__text-container">
                  <span className="iin-name">{item.name}</span>

                  {item.specific && (
                    <span className="iin-specific">
                      {`selected : ${item.specific}`}
                    </span>
                  )}
                  <span className="iin-delivered">delivered at 5-20 day</span>
                </div>
              </div>
              <div className="item-quant">
                <span className="value">{`${item.cartQuant} Item`}</span>
              </div>
              <div className="item-price">{`${item.cartQuant} x ${item.price}`}</div>
            </div>
          </Fragment>
        ))}
    </div>
  );
};
export default DisplaySelectedItems;
