import React, { Fragment, useState, useEffect } from 'react';
import {
  designPrice,
  priceConvert,
  iqdDesign,
} from '../../assests/currencyControl';
import { useSelector, useDispatch } from 'react-redux';
import './styles/summary-cart.scss';

const SummaryCart = ({ summaryObj }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {
    isAuthenticated,
    user: { point },
  } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const { currs, selectedCurrency } = useSelector((state) => state.currency);

  useEffect(() => {
    setCartItems(cart.cartItems);
    if (cart.cartItems?.length > 0) {
      summaryObj(sendSummaryInfoToSteps(cart.cartItems));
      console.log('Iam is use Effect inside summary card');
    }
  }, [cart.cartItems]);

  // const calTotalItemsInCart = (cartItems) => {
  //   const items = cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0);
  //   console.log('items', items);
  //   return items;
  // };

  // const calTotalPrice = (cartItems) => {
  //   // (priceText.replace(/\D/g, '') * 1)
  //   // realPrice(selectedCurrency, currs, ePrice)
  //   return cartItems.reduce(
  //     (acc, item) =>
  //       acc +
  //       item.cartQuant *
  //         (realPrice(selectedCurrency, currs, item.price).replace(/\D/g, '') *
  //           1),
  //     0
  //   );
  // };

  // const catTotalDiscount = (cartItems) => {
  //   let totalItems;

  //   let point = 0.005;
  //   if (cartItems.length > 0) {
  //     totalItems =
  //       cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0) - 1;
  //   } else {
  //     totalItems = 0;
  //   }
  //   return totalItems * point * 100;
  // };

  // const calFinalPrice = (cartItems) => {
  //   return (
  //     calTotalPrice(cartItems) -
  //     (calTotalPrice(cartItems) * catTotalDiscount(cartItems)) / 100
  //   );
  // };

  //*designed summary
  const priceShow = (price, currency) => {
    return `${priceConvert(
      selectedCurrency,
      currency,
      price,
      currs
    ).toLocaleString('en-US')} ${selectedCurrency}`;
  };

  const calTotalItemsInCart = (cartItems) => {
    const items = cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0);
    console.log('items', items);
    return items;
  };

  const calTotalPrice = (cartItems) => {
    if (cartItems.length > 0) {
      return cartItems.reduce(
        (acc, item) =>
          acc +
          item.cartQuant *
            priceConvert(selectedCurrency, item.currency, item.price, currs),
        0
      );
    }
    return 0;
  };

  const catTotalDiscount = (cartItems, point) => {
    let totalItems;

    // let point = 0.005;
    if (cartItems.length > 0) {
      totalItems = cartItems.reduce(
        (acc, item) =>
          acc +
          (item.cartQuant *
            priceConvert(selectedCurrency, item.currency, item.price, currs) *
            point) /
            500,
        0
      );
    } else {
      totalItems = 0;
    }
    if (selectedCurrency === 'IQD') {
      return iqdDesign(totalItems);
    }

    return totalItems;
  };
  const calShippingPrice = (cartItems, curSelect) => {
    let shippingPrice = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item, i) => {
        let qty = 1;
        if (item.cartQuant > 1) {
          qty = item.cartQuant / 2;
        }
        shippingPrice =
          shippingPrice +
          (priceConvert(
            selectedCurrency,
            'USD',
            item.shippingPriceInDollar,
            currs
          ) *
            qty) /
            (i + 2);
      });
    } else {
      shippingPrice = priceConvert(selectedCurrency, 'USD', 5, currs);
    }
    if (shippingPrice < priceConvert(selectedCurrency, 'USD', 5, currs))
      shippingPrice = priceConvert(selectedCurrency, 'USD', 5, currs);

    if (curSelect === 'IQD') {
      let mod;
      if (shippingPrice % 250 < 125) {
        mod = 0;
      } else mod = 250;

      return shippingPrice - (shippingPrice % 250) + mod;
    }

    return shippingPrice;
  };
  const calFinalPrice = (cartItems, selCur, point) => {
    return (
      calTotalPrice(cartItems) +
      calShippingPrice(cartItems, selCur) -
      catTotalDiscount(cartItems, point).toFixed(1)
    );
  };
  //*designed summary

  const sendSummaryInfoToSteps = (cartItems) => ({
    totalItemInCart: calTotalItemsInCart(cartItems),
    totalPrice: calTotalPrice(cartItems),
    discountPrice: catTotalDiscount(cartItems, point),
    finalPriceText: priceShow(
      calFinalPrice(cartItems, selectedCurrency, point),
      selectedCurrency
    ),
    totalAmountInDollar: priceConvert(
      'USD',
      selectedCurrency,
      calFinalPrice(cartItems, selectedCurrency, point),
      currs
    ),
  });
  return (
    <div className="sum-side">
      <span className="ss-header">Order Summary</span>

      <div className="sum-side__row">
        <span className="ss-item-txt">Total Items:</span>
        <span className="ss-item-val">
          {cartItems && calTotalItemsInCart(cartItems)}
        </span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-txt">Total Price:</span>
        <span className="ss-item-val">
          {cartItems &&
            currs.length > 0 &&
            priceShow(calTotalPrice(cartItems), selectedCurrency)}
        </span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-txt">Points:</span>
        <span className="ss-item-val">{point}</span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-txt">Shipping Price:</span>
        <span className="ss-item-val">
          {cartItems?.length > 0 &&
            priceShow(
              calShippingPrice(cartItems, selectedCurrency),
              selectedCurrency
            )}
        </span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-txt">Discount </span>
        <span className="ss-item-val">
          {cartItems?.length > 0 &&
            priceShow(catTotalDiscount(cartItems, point), selectedCurrency)}
        </span>
      </div>
      <hr />
      <div className="sum-side__row">
        <span className="ss-item-txt">Final Price </span>
        <span className="ss-item-val">
          {cartItems?.length > 0 &&
            priceShow(
              calFinalPrice(cartItems, selectedCurrency, point),
              selectedCurrency
            )}
        </span>
      </div>
    </div>
  );
};

export default SummaryCart;
