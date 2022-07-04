import axios from "axios";
import {
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAIL,
  GET_PRODUCTS_BY_SLUG_REQUEST,
  GET_PRODUCTS_BY_SLUG_SUCCESS,
  GET_PRODUCTS_BY_SLUG_FAIL,
  ADMIN_GET_ALL_PRODUCTS_REQUEST,
  ADMIN_GET_ALL_PRODUCTS_SUCCESS,
  ADMIN_GET_ALL_PRODUCTS_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  GET_CUS_PRODUCT_BY_ID_REQUEST,
  GET_CUS_PRODUCT_BY_ID_SUCCESS,
  GET_CUS_PRODUCT_BY_ID_FAIL,
  CLEAR_ERRORS,
  SELLER_GET_PRODUCTS_REQUEST,
  SELLER_GET_PRODUCTS_SUCCESS,
  SELLER_GET_PRODUCTS_FAIL,
  SELLER_UPDATE_PRODUCTS_REQUEST,
  SELLER_UPDATE_PRODUCTS_SUCCESS,
  SELLER_UPDATE_PRODUCTS_FAIL,
  SELLER_CREATE_PRODUCTS_REQUEST,
  SELLER_CREATE_PRODUCTS_SUCCESS,
  SELLER_CREATE_PRODUCTS_FAIL,
  SELLER_DELETE_PRODUCTS_REQUEST,
  SELLER_DELETE_PRODUCTS_SUCCESS,
  SELLER_DELETE_PRODUCTS_FAIL,
  CLEAR_MESSAGE,

  //*will stay
} from "./../constants/productConstant";

export const adminCreateProduct = (form) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST });
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/v1/products/create", form, config);

    dispatch({ type: ADMIN_CREATE_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductsBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_BY_SLUG_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${slug}`);
    dispatch({ type: GET_PRODUCTS_BY_SLUG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminGetAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/get-product");

    dispatch({ type: ADMIN_GET_ALL_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminDeleteProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });

    await axios.delete(`/api/v1/products/${id}`);
    dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminUpdateProductById = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(`/api/v1/products/${id}`, form, config);
    dispatch({ type: ADMIN_UPDATE_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const cusGetSingleProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CUS_PRODUCT_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: GET_CUS_PRODUCT_BY_ID_SUCCESS, payload: data.product });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CUS_PRODUCT_BY_ID_FAIL,
      payload: `error.response.data.message,`,
      // payload: error.response.data.message,
    });
  }
};
//*Seller
export const getSellerProducts = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_GET_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/seller/products");

    dispatch({ type: SELLER_GET_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELLER_GET_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sellerUpdateProductById = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_UPDATE_PRODUCTS_REQUEST });
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/seller/products/${id}`,
      form,
      config
    );
    dispatch({ type: SELLER_UPDATE_PRODUCTS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELLER_UPDATE_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sellerCreateProduct = (form) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_CREATE_PRODUCTS_REQUEST });
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/v1/products/create", form, config);

    dispatch({ type: SELLER_CREATE_PRODUCTS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELLER_CREATE_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sellerDeleteProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_DELETE_PRODUCTS_REQUEST });

    await axios.delete(`/api/v1/seller/products/${id}`);
    dispatch({ type: SELLER_DELETE_PRODUCTS_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELLER_DELETE_PRODUCTS_FAIL,
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
