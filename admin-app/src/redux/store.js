import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./reducers/authReducer";
import {
  categoryReducer,
  categoryConfigReducer,
} from "./reducers/categoryReducer";
import {
  sellerProductReducer,
  adminProductsReducer,
} from "./reducers/productReducer";
import {
  shopReducer,
  singleOrderReducer,
  adminOrdersReducer,
  adminOrderConfigReducer,
} from "./reducers/orderReducer";

import { adminReducer, logoAdsReducer } from "./reducers/adminReducer";
const reducer = combineReducers({
  auth: authReducer,
  sellerProduct: sellerProductReducer,
  category: categoryReducer,
  shop: shopReducer,
  singleOrder: singleOrderReducer,
  categoryConfig: categoryConfigReducer,
  adminProducts: adminProductsReducer,
  adminOrders: adminOrdersReducer,
  adminOrderConfig: adminOrderConfigReducer,
  admin: adminReducer,
  logoAds: logoAdsReducer,
});

const store = configureStore({
  reducer,
});

export default store;
