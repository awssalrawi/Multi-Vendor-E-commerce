import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

export const realPrice = (selectedCurrency, arrayOfCurrency, price) => {
  //*selectedCurrency =IQD,TRY,USD

  if (selectedCurrency === 'IQD') {
    const iqdObj = arrayOfCurrency.find((obj) => obj.currency === 'USD_IQD');
    //console.log('Iam inside assest/cuurncyController', iqdObj);
    const val = Math.ceil(price * iqdObj.value);
    const editedVal = Math.round(val);
    let mod;
    if (editedVal % 250 < 125) {
      mod = 0;
    } else mod = 250;

    return `${(editedVal - (editedVal % 250) + mod).toLocaleString(
      'en-US'
    )} د.ع`;
    //  return `${(price * iqdObj.value).toFixed(1)} د.ع`;
  } else if (selectedCurrency === 'TRY') {
    const tryObj = arrayOfCurrency.find((obj) => obj.currency === 'USD_TRY');
    return `${Math.ceil(price * tryObj.value).toLocaleString('tr-TR')} TL`;
  }
  return `${price} $`;
};
export const convertToUsd = (currency, arrayOfCurrency, value) => {
  if (currency === 'IQD') {
    const iqdObj = arrayOfCurrency.find((obj) => obj.currency === 'USD_IQD');
    return Math.ceil(value / iqdObj.value).toFixed(2);
  } else if (currency === 'TRY') {
    const tryObj = arrayOfCurrency.find((obj) => obj.currency === 'USD_TRY');
    return Math.ceil(value / tryObj.value).toFixed(2);
  }

  return value.toFixed(2);
};

export const iraqiCurrencyShapes = (val) => {
  const editedVal = Math.round(val);
  let mod;
  if (editedVal % 250 < 125) {
    mod = 0;
  } else mod = 250;

  return `${(editedVal - (editedVal % 250) + mod).toLocaleString('en-US')} د.ع`;
};

export const designPrice = (currency, price) => {
  if (currency === 'IQD') {
    const nearestNum = Math.round(price);
    let mod;
    if (nearestNum % 250 < 125) mod = 0;
    else {
      mod = 250;
    }
    const finalVal = (nearestNum - (nearestNum % 250) + mod).toLocaleString(
      'en-US'
    );
    return `${finalVal} د.ع`;
    // 14221583.75
  } else if (currency === 'TRY') {
    return `${Math.ceil(price).toLocaleString('tr-TR')} TL`;
  }

  return `${price.toLocaleString('en-US')} USD`;
};
