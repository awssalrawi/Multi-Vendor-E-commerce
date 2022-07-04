import axios from "axios";

import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_CREATE_CATEGORY_FAIL,
  ADMIN_GET_CATEGORY_BY_ID_REQUEST,
  ADMIN_GET_CATEGORY_BY_ID_SUCCESS,
  ADMIN_GET_CATEGORY_BY_ID_FAIL,
  ADMIN_DELETE_CATEGORY_BY_ID_REQUEST,
  ADMIN_DELETE_CATEGORY_BY_ID_SUCCESS,
  ADMIN_DELETE_CATEGORY_BY_ID_FAIL,
  ADMIN_UPDATE_CATEGORY_REQUEST,
  ADMIN_UPDATE_CATEGORY_SUCCESS,
  ADMIN_UPDATE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryConstant";

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });

    const { data } = await axios.get("/api/v1/categories/getall");
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: data.data.categoryList,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
    console.log("error in category action", error);
  }
};

export const adminCreateCategory = (form) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CREATE_CATEGORY_REQUEST });
    console.log(form);
    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "/api/v1/categories/create",
      form,
      config
    );
    dispatch({ type: ADMIN_CREATE_CATEGORY_SUCCESS, payload: data.category });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminGetCategoryById = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_CATEGORY_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/v1/categories/${categoryId}`);

    dispatch({
      type: ADMIN_GET_CATEGORY_BY_ID_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_GET_CATEGORY_BY_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminDeleteCategoryById = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_CATEGORY_BY_ID_REQUEST });

    await axios.delete(`/api/v1/categories/${categoryId}`);
    dispatch({
      type: ADMIN_DELETE_CATEGORY_BY_ID_SUCCESS,
      payload: categoryId,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_CATEGORY_BY_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminUpdateCategory = (categoryId, form) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_CATEGORY_REQUEST });

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/categories/${categoryId}`,
      form,
      config
    );

    dispatch({
      type: ADMIN_UPDATE_CATEGORY_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
