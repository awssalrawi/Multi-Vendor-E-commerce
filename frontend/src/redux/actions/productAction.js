import axios from 'axios';
import {
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAIL,
  GET_PRODUCTS_BY_SLUG_REQUEST,
  GET_PRODUCTS_BY_SLUG_SUCCESS,
  GET_PRODUCTS_BY_SLUG_FAIL,
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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
