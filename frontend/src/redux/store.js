import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//import { thunk } from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
import { categoryReducer } from './reducers/categoryReducer';
import { authReducer } from './reducers/userReducer';
import { adminProductReducer } from './reducers/productReducer';
const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  adminProduct: adminProductReducer,
});

//const middleware = [thunk];

const store = configureStore({
  reducer,
});

export default store;
