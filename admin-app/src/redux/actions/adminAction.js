import axios from "axios";

import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_LOGO_ADS_REQUEST,
  UPDATE_LOGO_ADS_SUCCESS,
  UPDATE_LOGO_ADS_FAIL,
  GET_LOGO_ADS_REQUEST,
  GET_LOGO_ADS_SUCCESS,
  GET_LOGO_ADS_FAIL,
} from "../constants/adminConstant";

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/get-users");

    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await axios.put(`/api/v1/admin/update-user/${id}`, body);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAdsLogo = (body) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LOGO_ADS_REQUEST });

    const { data } = await axios.put("/api/v1/admin/initial-imgs", body);

    dispatch({ type: UPDATE_LOGO_ADS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_LOGO_ADS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdsLogo = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LOGO_ADS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/getadslogo");

    dispatch({ type: GET_LOGO_ADS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_LOGO_ADS_FAIL,
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
