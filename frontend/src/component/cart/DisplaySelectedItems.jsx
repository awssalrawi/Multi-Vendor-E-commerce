import React, { Fragment, useState, useEffect } from 'react';
import './styles/display-selected-items.scss';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Add, RemoveRounded } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getMyCartItems } from '../../redux/actions/cartAction';

import { realPrice, priceConvert } from '../../assests/currencyControl';

const DisplaySelectedItems = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const { currs, selectedCurrency } = useSelector((state) => state.currency);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyCartItems());
    }
  }, [isAuthenticated]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const priceShow = (price, currency) => {
    return `${priceConvert(
      selectedCurrency,
      currency,
      price,
      currs
    ).toLocaleString('en-US')} ${selectedCurrency}`;
  };

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
                <span className="value">{` x ${item.cartQuant}`}</span>
              </div>
              <div className="item-price">{`${item.cartQuant} x ${priceShow(
                item.price,
                item.currency
              )}`}</div>
            </div>
          </Fragment>
        ))}
    </div>
  );
};
export default DisplaySelectedItems;
