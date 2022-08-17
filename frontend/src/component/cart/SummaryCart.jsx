import React, { Fragment, useState, useEffect } from 'react';
import {
  priceConvert,
  iqdDesign,
  priceShow,
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

  const [userPoint, setUserPoint] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      setUserPoint(point);
    } else {
      setUserPoint(1);
    }
  }, [isAuthenticated]);

  //*designed summary
  // const priceShow = (price, currency) => {
  //   return `${priceConvert(
  //     selectedCurrency,
  //     currency,
  //     price,
  //     currs
  //   ).toLocaleString('en-US')} ${selectedCurrency}`;
  // };

  const stringPrice = (number, currency) => {
    return `${number.toLocaleString('en-US')} ${currency}`;
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
    discountPrice: catTotalDiscount(cartItems, userPoint),
    finalPriceText: priceShow(
      calFinalPrice(cartItems, selectedCurrency, userPoint),
      selectedCurrency
    ),
    totalAmountInDollar: priceConvert(
      'USD',
      selectedCurrency,
      calFinalPrice(cartItems, selectedCurrency, userPoint),
      currs
    ),
  });
  return (
    <div className="sum-side">
      <span className="ss-header">{'خلاصة الطلب'}</span>

      <div className="sum-side__row">
        <span className="ss-item-val">
          {cartItems && calTotalItemsInCart(cartItems)}
        </span>
        <span className="ss-item-txt">{' : ألعدد الكلي'}</span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-val">
          {cartItems &&
            currs.length > 0 &&
            stringPrice(calTotalPrice(cartItems), selectedCurrency)}
        </span>
        <span className="ss-item-txt">{' : السعر الكلي'}</span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-val">{point}</span>
        <span className="ss-item-txt">{' : المستوى'}</span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-val">
          {cartItems?.length > 0 &&
            stringPrice(
              calShippingPrice(cartItems, selectedCurrency),
              selectedCurrency
            )}
        </span>
        <span className="ss-item-txt">{' : سعر الشحن'}</span>
      </div>
      <div className="sum-side__row">
        <span className="ss-item-val">
          {cartItems?.length > 0 &&
            currs.length > 0 &&
            stringPrice(
              catTotalDiscount(cartItems, userPoint),
              selectedCurrency
            )}
        </span>
        <span className="ss-item-txt">{' : الخصم'}</span>
      </div>
      <hr />
      <div className="sum-side__row">
        <span className="ss-item-val">
          {cartItems?.length > 0 &&
            currs.length &&
            stringPrice(
              calFinalPrice(cartItems, selectedCurrency, userPoint),
              selectedCurrency
            )}
        </span>
        <span className="ss-item-txt">{' : السعر النهائي'}</span>
      </div>
    </div>
  );
};

export default SummaryCart;
