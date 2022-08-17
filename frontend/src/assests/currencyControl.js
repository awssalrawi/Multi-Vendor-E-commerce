import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

export const priceConvert = (
  userCurr,
  productCurr,
  productPrice,
  arrOfCurr
) => {
  //*if same return price itself without any converting
  if (userCurr === productCurr) return productPrice;
  if (productPrice === 0) return 0;

  if (userCurr === 'IQD') {
    let finalPrice = 0;

    if (productCurr === 'USD') {
      const usdIqd = arrOfCurr.find((obj) => obj.currency === 'USD_IQD');
      const priceIqd = Math.round(usdIqd.value * productPrice);

      let mod;
      if (priceIqd % 250 < 125) {
        mod = 0;
      } else mod = 250;

      finalPrice = priceIqd - (priceIqd % 250) + mod;
    } else if (productCurr === 'TRY') {
      const tryIqd = arrOfCurr.find((obj) => obj.currency === 'TRY_IQD');
      const priceIqd = Math.round(tryIqd.value * productPrice);
      let mod;
      if (priceIqd % 250 < 125) {
        mod = 0;
      } else mod = 250;

      finalPrice = priceIqd - (priceIqd % 250) + mod;
    }

    return finalPrice;
  } else if (userCurr === 'TRY') {
    let finalPrice = 0;
    if (productCurr === 'USD') {
      const usdTry = arrOfCurr.find((obj) => obj.currency === 'USD_TRY');

      finalPrice = Math.round(usdTry.value * productPrice);
    } else if (productCurr === 'IQD') {
      const tryIqd = arrOfCurr.find((obj) => obj.currency === 'TRY_IQD');

      finalPrice = Math.round(productPrice / tryIqd.value);
    }

    return finalPrice;
  } else if (userCurr === 'USD') {
    let finalPrice = 0;
    if (productCurr === 'IQD') {
      const usdIqd = arrOfCurr.find((obj) => obj.currency === 'USD_IQD');
      finalPrice = (productPrice / usdIqd.value).toFixed(1);
    } else if (productCurr === 'TRY') {
      const usdTry = arrOfCurr.find((obj) => obj.currency === 'USD_TRY');
      finalPrice = (productPrice / usdTry.value).toFixed(1);
    }
    return finalPrice;
  }

  return `Wrong Currency`;
};

export const iqdDesign = (price) => {
  if (price === 0) return;
  let mod;
  if (price % 250 < 125) {
    mod = 0;
  } else mod = 250;

  return price - (price % 250) + mod;
};

export const priceShow = (selectedCurrency, currency, price, currs) => {
  // console.log('selectedCurrency', selectedCurrency);
  // console.log('currency', currency);
  // console.log('price', price);
  return `${priceConvert(
    selectedCurrency,
    currency,
    price,
    currs
  ).toLocaleString('en-US')} ${selectedCurrency}`;
};
