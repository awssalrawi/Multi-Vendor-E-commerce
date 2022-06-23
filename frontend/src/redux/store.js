import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import {
  categoryReducer,
  categoryConfigReducer,
} from './reducers/categoryReducer';
import { authReducer, userInfoReducer } from './reducers/userReducer';
import {
  getProductsBySlugReducer,
  productsManagementReducer,
  cusProductsReducer,
} from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';
import { currencyReducer } from './reducers/currencyReducer';
import { userOrderReducer } from './reducers/orderReducer';
const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  getProductsBySlug: getProductsBySlugReducer,
  categoryConfig: categoryConfigReducer,
  cusProducts: cusProductsReducer,
  productsManagement: productsManagementReducer,
  cart: cartReducer,
  userInfo: userInfoReducer,
  currency: currencyReducer,
  userOrder: userOrderReducer,
});

const store = configureStore({
  reducer,
});

export default store;
