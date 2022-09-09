import {
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  GET_SELLER_INFO_REQUEST,
  GET_SELLER_INFO_SUCCESS,
  GET_SELLER_INFO_FAIL,
  GET_SELLER_ORDERS_REQUEST,
  GET_SELLER_ORDERS_SUCCESS,
  GET_SELLER_ORDERS_FAIL,
  GET_SINGLE_ORDER_REQUEST,
  GET_SINGLE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_FAIL,
  UPDATE_SINGLE_ORDER_REQUEST,
  UPDATE_SINGLE_ORDER_SUCCESS,
  UPDATE_SINGLE_ORDER_FAIL,
  UPDATE_SHOP_INFO_REQUEST,
  UPDATE_SHOP_INFO_SUCCESS,
  UPDATE_SHOP_INFO_FAIL,
  ADMIN_GET_ORDERS_REQUEST,
  ADMIN_GET_ORDERS_SUCCESS,
  ADMIN_GET_ORDERS_FAIL,
  ADMIN_GET_ORDER_DET_REQUEST,
  ADMIN_GET_ORDER_DET_SUCCESS,
  ADMIN_GET_ORDER_DET_FAIL,
  ADMIN_UPDATE_STATUS_REQUEST,
  ADMIN_UPDATE_STATUS_SUCCESS,
  ADMIN_UPDATE_STATUS_FAIL,
} from "../constants/orderConstant";
import axios from "axios";
import { URL } from "../../Url";
// export const userAddOrder = (order) => async (dispatch) => {
//   try {
//     console.log(order);
//     dispatch({ type: USER_ADD_ORDER_REQUEST });

//     //await axios.post('/api/user/order/create', order);
//     const response = await axios.post("/api/v1/user/order/create", {
//       order,
//     });
//     if (response.status === 201) {
//       dispatch(getMyCartItems());
//     }
//     console.log("data", response);
//     dispatch({ type: USER_ADD_ORDER_SUCCESS, payload: response.data.order });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: USER_ADD_ORDER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const userGetOrder = () => async (dispatch) => {
//   try {
//     dispatch({ type: GET_USER_ORDER_REQUEST });

//     const { data } = await axios.get("/api/v1/user/order/getorders");

//     dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data.order });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: GET_USER_ORDER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
//*Stay

export const sellerGetInfo = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SELLER_INFO_REQUEST });
    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token
    const { data } = await axios.get(
      `${URL}/api/v1/seller/get-my-data`,
      config
    );

    dispatch({ type: GET_SELLER_INFO_SUCCESS, payload: data.shop });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SELLER_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sellerOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SELLER_ORDERS_REQUEST });
    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token
    const { data } = await axios.get(`${URL}/api/v1/seller/getorders`, config);

    dispatch({ type: GET_SELLER_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SELLER_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_ORDER_REQUEST });
    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.get(
      `${URL}/api/v1/seller/getorder-details/${id}`,
      config
    );

    dispatch({ type: GET_SINGLE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SINGLE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sellerUpdateOrderStatus = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_ORDER_REQUEST });

    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    await axios.put(
      `${URL}/api/v1/seller/getorder-details/${id}`,
      body,
      config
    );

    dispatch({ type: UPDATE_SINGLE_ORDER_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_SINGLE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSellerShop = (form) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SHOP_INFO_REQUEST });
    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.put(
      `${URL}/api/v1/seller/update-shop`,
      form,
      config
    );

    dispatch({ type: UPDATE_SHOP_INFO_SUCCESS, payload: data.shop });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_SHOP_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

//*admin

export const adminGetOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_ORDERS_REQUEST });
    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.get(`${URL}/api/v1/admin/get-orders`, config);

    dispatch({ type: ADMIN_GET_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_GET_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminGetOrderDetail = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_ORDER_DET_REQUEST });
    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.get(
      `${URL}/api/v1/admin/get-orders/${orderId}`,
      config
    );

    dispatch({ type: ADMIN_GET_ORDER_DET_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_GET_ORDER_DET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminUpdateOrderStatus = (body) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_STATUS_REQUEST });
    //!bearer token

    const token = localStorage.getItem("SellerAuthTokenReload")
      ? localStorage.getItem("SellerAuthTokenReload")
      : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token
    const { data } = await axios.post(
      `${URL}/api/v1//order/update`,
      body,
      config
    );

    dispatch({ type: ADMIN_UPDATE_STATUS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_UPDATE_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
