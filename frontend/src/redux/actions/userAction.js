import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GOOGLE_SIGN_REQUEST,
  GOOGLE_SIGN_SUCCESS,
  GOOGLE_SIGN_FAIL,
  FACEBOOK_SIGN_REQUEST,
  FACEBOOK_SIGN_SUCCESS,
  FACEBOOK_SIGN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  GET_TOKEN_FROM_COOKIE,
  CLEAR_ERRORS,
  GET_USER_ADDRESS_REQUEST,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAIL,
  ADD_USER_ADDRESS_REQUEST,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAIL,
  CLEAR_MESSAGE,
  DELETE_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_FAIL,
} from '../constants/userConstant';
import { URL } from '../../Url';
import axios from 'axios';
import { updateCart } from './cartAction';
export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    //!bearer token

    const token = localStorage.getItem('authTokenReload')
      ? localStorage.getItem('authTokenReload')
      : '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.post(
      `${URL}/api/v1/user/signin`,
      { email, password },
      config
    );
    localStorage.setItem('ltredaUser', JSON.stringify(data.user));
    localStorage.setItem('authTokenReload', data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    dispatch({ type: GET_TOKEN_FROM_COOKIE, payload: data.token });
  } catch (error) {
    console.log('Login action error', error);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const getMyProfileData = () => async (dispatch) => {
  if (localStorage.getItem('ltredaUser')) {
    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: JSON.parse(localStorage.getItem('ltredaUser')),
    });
  } else {
    try {
      dispatch({ type: LOAD_PROFILE_REQUEST });

      const { data } = await axios.get(`${URL}/api/v1/user/me`);

      dispatch({ type: LOAD_PROFILE_SUCCESS, payload: data.user });
      localStorage.setItem('ltredaUser', JSON.stringify(data.user));
    } catch (error) {
      console.log('Login action error', error);
      dispatch({ type: LOAD_PROFILE_FAIL });
      // dispatch({ type: LOAD_PROFILE_FAIL, payload: error.response.data.message });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${URL}/api/v1/user/logout`);
    localStorage.removeItem('authTokenReload');
    localStorage.removeItem('ltredaUser');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT_FAIL, payload: error.message });
  }
};

//!google and facebook
export const SignWithGoogle = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: GOOGLE_SIGN_REQUEST });

    // const tokenId = response.tokenId;
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    //!bearer token

    const token = localStorage.getItem('authTokenReload')
      ? localStorage.getItem('authTokenReload')
      : '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token
    const { data } = await axios.post(
      `${URL}/api/v1/user/google-login`,
      info,
      config
    );
    localStorage.setItem('authTokenReload', data.token);
    localStorage.setItem('ltredaUser', JSON.stringify(data.user));
    dispatch({ type: GOOGLE_SIGN_SUCCESS, payload: data.user });
    // dispatch(updateCart());
  } catch (error) {
    console.log(error);
    dispatch({ type: GOOGLE_SIGN_FAIL, payload: error.response.data.message });
  }
};

export const signWithFacebook = (response) => async (dispatch) => {
  try {
    dispatch({ type: FACEBOOK_SIGN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${URL}/api/v1/user/facebook-login`,
      response,
      config
    );

    localStorage.setItem('authTokenReload', data.token);
    localStorage.setItem('ltredaUser', JSON.stringify(data.user));
    dispatch({ type: FACEBOOK_SIGN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FACEBOOK_SIGN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const signUpWithEmailAndPassword =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      //!bearer token

      const token = localStorage.getItem('authTokenReload')
        ? localStorage.getItem('authTokenReload')
        : '';
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      //!bearer token

      const { data } = await axios.post(
        `${URL}/api/v1/user/signup`,
        { name, email, password },
        config
      );
      dispatch({ type: SIGNUP_SUCCESS, payload: data.message });
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNUP_FAIL, payload: error.response.data.message });
    }
  };

//! user addresses
export const addAddress = (obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_USER_ADDRESS_REQUEST });
    const form = {
      data: { address: obj },
    };

    //!bearer token

    const token = localStorage.getItem('authTokenReload')
      ? localStorage.getItem('authTokenReload')
      : '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.post(
      `${URL}/api/v1/user/address/create`,
      form,
      config
    );

    dispatch({ type: ADD_USER_ADDRESS_SUCCESS, payload: data.newAddress });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_USER_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAddress = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_ADDRESS_REQUEST });
    //!bearer token

    const token = localStorage.getItem('authTokenReload')
      ? localStorage.getItem('authTokenReload')
      : '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.get(`${URL}/api/v1/user/address/get`, config);

    dispatch({
      type: GET_USER_ADDRESS_SUCCESS,
      payload: data.userAddress.address,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_ADDRESS_FAIL,
      payload: error,
    });
  }
};

export const removeAddress = (obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_ADDRESS_REQUEST });

    //!bearer token

    const token = localStorage.getItem('authTokenReload')
      ? localStorage.getItem('authTokenReload')
      : '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.put(
      `${URL}/api/v1/user/address/delete`,
      obj,
      config
    );

    dispatch({ type: DELETE_USER_ADDRESS_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_USER_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//! user addresses

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
