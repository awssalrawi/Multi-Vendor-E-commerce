import axios from 'axios';
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
  GET_SHOP_PRODUCT_REQUEST,
  GET_SHOP_PRODUCT_SUCCESS,
  GET_SHOP_PRODUCT_FAIL,
  GET_FILTERED_PRODUCTS_REQUEST,
  GET_FILTERED_PRODUCTS_SUCCESS,
  GET_FILTERED_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_LOAD_MORE,
  NO_PRODUCTS_STOP_PAGINATION,
  CLEAR_ERRORS,
} from './../constants/productConstant';

export const adminCreateProduct = (form) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST });
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post('/api/v1/products/create', form, config);

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
    // const response  = await axios.post("/signin")
    const { data } = await axios.get(`/api/v1/products-cat/${slug}`);
    dispatch({ type: GET_PRODUCTS_BY_SLUG_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PRODUCTS_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllProducts =
  (page = 1) =>
  async (dispatch, getState) => {
    if (!getState().productsManagement.noProductMore) {
      try {
        if (getState().productsManagement.loading) {
          return;
        }
        dispatch({ type: ADMIN_GET_ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(
          `/api/v1/products/get-all?page=${page}`
        );
        if (page > 1) {
          if (data.products.length > 0) {
            dispatch({
              type: GET_ALL_PRODUCTS_LOAD_MORE,
              payload: data.products,
            });
          } else {
            dispatch({
              type: NO_PRODUCTS_STOP_PAGINATION,
            });
          }
        } else {
          dispatch({
            type: ADMIN_GET_ALL_PRODUCTS_SUCCESS,
            payload: data.products,
          });
        }
      } catch (error) {
        dispatch({
          type: ADMIN_GET_ALL_PRODUCTS_FAIL,
          payload: error.response.data.message,
        });
      }
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
        'Content-Type': 'multipart/form-data',
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

export const cusGetShopProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOP_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/products-stor/${slug}`);
    console.log(data);
    dispatch({ type: GET_SHOP_PRODUCT_SUCCESS, payload: data.info });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SHOP_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductsByFilter =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_FILTERED_PRODUCTS_REQUEST });

      const { data } = await axios.get(
        `/api/v1/products/get-all?keyword=${keyword}`
      );

      dispatch({
        type: GET_FILTERED_PRODUCTS_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: GET_FILTERED_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
