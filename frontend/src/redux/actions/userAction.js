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
} from '../constants/userConstant';

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/v1/user/signin',
      { email, password },
      config
    );
    console.log(data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    dispatch({ type: GET_TOKEN_FROM_COOKIE, payload: data.token });
    localStorage.setItem('authTokenReload', data.token);
  } catch (error) {
    console.log('Login action error', error);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const getMyProfileData = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_PROFILE_REQUEST });

    const { data } = await axios.get('/api/v1/user/me');

    dispatch({ type: LOAD_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    console.log('Login action error', error);
    dispatch({ type: LOAD_PROFILE_FAIL });
    // dispatch({ type: LOAD_PROFILE_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/v1/user/logout');
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem('authTokenReload');
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.message });
  }
};

//!google and facebook
export const SignWithGoogle = (response) => async (dispatch) => {
  try {
    dispatch({ type: GOOGLE_SIGN_REQUEST });

    const tokenId = response.tokenId;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/v1/user/google-login',
      { tokenId },
      config
    );
    dispatch({ type: GOOGLE_SIGN_SUCCESS, payload: data.user });
    localStorage.setItem('authTokenReload', data.token);
  } catch (error) {
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
    const { userID, accessToken } = response;

    const { data } = await axios.post(
      '/api/v1/user/facebook-login',
      { userID, accessToken },
      config
    );

    dispatch({ type: FACEBOOK_SIGN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: FACEBOOK_SIGN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const signUpWithEmailAndPassword =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/user/signup',
        { name, email, password },
        config
      );
      dispatch({ type: SIGNUP_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL, payload: error.response.data.message });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
