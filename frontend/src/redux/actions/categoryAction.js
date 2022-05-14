import axios from 'axios';

import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_CREATE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from '../constants/categoryConstant';

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });

    const { data } = await axios.get('/api/v1/categories/getall');
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: data.data.categoryList,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
    console.log('error in category action', error);
  }
};

export const adminCreateCategory = (form) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CREATE_CATEGORY_REQUEST });
    console.log(form);
    const config = {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(
      '/api/v1/categories/create',
      form,
      config
    );
    dispatch({
      type: ADMIN_CREATE_CATEGORY_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
