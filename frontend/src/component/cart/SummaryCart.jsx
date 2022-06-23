import React, { Fragment, useState, useEffect } from 'react';
import {
  realPrice,
  designPrice,
  convertToUsd,
} from '../../assests/currencyControl';
import { useSelector, useDispatch } from 'react-redux';
import './styles/summary-cart.scss';

const SummaryCart = ({ summaryObj }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const { currs, selectedCurrency } = useSelector((state) => state.currency);

  useEffect(() => {
    setCartItems(cart.cartItems);
    if (cart.cartItems?.length > 0) {
      summaryObj(sendSummaryInfoToSteps(cart.cartItems));
      console.log('Iam is use Effect inside summary card');
    }
  }, [cart.cartItems]);

  const calTotalItemsInCart = (cartItems) => {
    const items = cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0);
    console.log('items', items);
    return items;
  };

  const calTotalPrice = (cartItems) => {
    // (priceText.replace(/\D/g, '') * 1)
    // realPrice(selectedCurrency, currs, ePrice)
    return cartItems.reduce(
      (acc, item) =>
        acc +
        item.cartQuant *
          (realPrice(selectedCurrency, currs, item.price).replace(/\D/g, '') *
            1),
      0
    );
  };

  const catTotalDiscount = (cartItems) => {
    let totalItems;

    let point = 0.005;
    if (cartItems.length > 0) {
      totalItems =
        cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0) - 1;
    } else {
      totalItems = 0;
    }
    return totalItems * point * 100;
  };

  const calFinalPrice = (cartItems) => {
    return (
      calTotalPrice(cartItems) -
      (calTotalPrice(cartItems) * catTotalDiscount(cartItems)) / 100
    );
  };

  const sendSummaryInfoToSteps = (cartItems) => ({
    totalItemInCart: calTotalItemsInCart(cartItems),
    totalPrice: calTotalPrice(cartItems),
    discountPrice: catTotalDiscount(cartItems),
    finalPriceText: designPrice(selectedCurrency, calFinalPrice(cartItems)),
    finalPriceNumber:
      designPrice(selectedCurrency, calFinalPrice(cartItems)).replace(
        /\D/g,
        ''
      ) * 1,
    currency: selectedCurrency,
    priceInDollar: convertToUsd(
      selectedCurrency,
      currs,
      designPrice(selectedCurrency, calFinalPrice(cartItems)).replace(
        /\D/g,
        ''
      ) * 1
    ),
  });

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
          {cartItems &&
            `${calTotalPrice(cartItems).toLocaleString(
              'us-US'
            )} ${selectedCurrency}`}
        </span>
      </div>
      <div className="summary-side__row">
        <span className="ss-item-txt">Discount </span>
        <span className="ss-item-val">
          {cartItems && `${catTotalDiscount(cartItems).toFixed(1)} %`}
        </span>
      </div>
      <hr />
      <div className="summary-side__row">
        <span className="ss-item-txt">Final Price </span>
        <span className="ss-item-val">
          {cartItems && designPrice(selectedCurrency, calFinalPrice(cartItems))}
        </span>
      </div>
    </div>
  );
};

export default SummaryCart;
