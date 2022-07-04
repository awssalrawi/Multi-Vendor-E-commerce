import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./reducers/authReducer";
import {
  categoryReducer,
  categoryConfigReducer,
} from "./reducers/categoryReducer";
import { currencyReducer } from "./reducers/currencyReducer";
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

const reducer = combineReducers({
  auth: authReducer,
  currency: currencyReducer,
  sellerProduct: sellerProductReducer,
  category: categoryReducer,
  shop: shopReducer,
  singleOrder: singleOrderReducer,
  categoryConfig: categoryConfigReducer,
  adminProducts: adminProductsReducer,
  adminOrders: adminOrdersReducer,
  adminOrderConfig: adminOrderConfigReducer,
});

const store = configureStore({
  reducer,
});

export default store;
