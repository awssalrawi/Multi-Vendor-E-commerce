import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//import { thunk } from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
import {
  categoryReducer,
  categoryConfigReducer,
} from './reducers/categoryReducer';
import { authReducer } from './reducers/userReducer';
import {
  adminProductReducer,
  getProductsBySlugReducer,
} from './reducers/productReducer';
const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  adminProduct: adminProductReducer,
  getProductsBySlug: getProductsBySlugReducer,
  categoryConfig: categoryConfigReducer,
});

//const middleware = [thunk];

const store = configureStore({
  reducer,
});

export default store;
