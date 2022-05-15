import axios from 'axios';
import {
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAIL,
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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
