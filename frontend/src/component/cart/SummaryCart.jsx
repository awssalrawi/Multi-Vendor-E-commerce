import React, { useState, useEffect } from 'react';
import './styles/summary-cart.scss';

import { useSelector } from 'react-redux';

const SummaryCart = () => {
  const cart = useSelector((state) => state.cart);

  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const calTotalItemsInCart = (cartItems) => {
    const items = cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0);
    console.log('items', items);
    return items;
  };

  const calTotalPrice = (cartItems) => {
    return cartItems
      .reduce((acc, item) => acc + item.cartQuant * item.price, 0)
      .toFixed(1);
  };

  const catTotalDiscount = (cartItems) => {
    let discount;
    if (cartItems.length > 0) {
      discount =
        (cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0) - 1) * 20;
    } else {
      discount = 0;
    }
    return discount;
  };

  const calFinalPrice = (cartItems) => {
    return calTotalPrice(cartItems) - catTotalDiscount(cartItems);
  };

  return (
    <div className="summary-side">
      <span className="ss-header">Order Summary</span>

      <div className="summary-side__row">
        <span className="ss-item-txt">Total Items:</span>
        <span className="ss-item-val">
          {cartItems && calTotalItemsInCart(cartItems)}
        </span>
      </div>
      <div className="summary-side__row">
        <span className="ss-item-txt">Total Price:</span>
        <span className="ss-item-val">
          {cartItems && calTotalPrice(cartItems)}
        </span>
      </div>
      <div className="summary-side__row">
        <span className="ss-item-txt">Discount </span>
        <span className="ss-item-val">
          {cartItems && catTotalDiscount(cartItems)}
        </span>
      </div>
      <hr />
      <div className="summary-side__row">
        <span className="ss-item-txt">Final Price </span>
        <span className="ss-item-val">
          {cartItems && calFinalPrice(cartItems)}
        </span>
      </div>
    </div>
  );
};

export default SummaryCart;
