import { combineReducers, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//import { thunk } from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
import {
  categoryReducer,
  categoryConfigReducer,
} from './reducers/categoryReducer';
import { authReducer } from './reducers/userReducer';
import {
  getProductsBySlugReducer,
  productsManagementReducer,
  cusProductsReducer,
} from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';
const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  getProductsBySlug: getProductsBySlugReducer,
  categoryConfig: categoryConfigReducer,
  cusProducts: cusProductsReducer,
  productsManagement: productsManagementReducer,
  cart: cartReducer,
});

//const middleware = [thunk];

const store = configureStore({
  reducer,
});

export default store;
