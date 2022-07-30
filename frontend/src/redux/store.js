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
  storePageReducer,
  filteredProductsReducer,
} from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';
import { currencyReducer } from './reducers/currencyReducer';
import { userOrderReducer } from './reducers/orderReducer';
import { reviewReducer } from './reducers/reviewReducer';
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
  storePage: storePageReducer,
  filteredProducts: filteredProductsReducer,
  review: reviewReducer,
});

const store = configureStore({
  reducer,
});

export default store;
