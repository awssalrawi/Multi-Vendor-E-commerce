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

let initialState = {
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_PROFILE_REQUEST:
    case GOOGLE_SIGN_REQUEST:
    case FACEBOOK_SIGN_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        message: action.payload,
      };

    case LOGIN_SUCCESS:
    case LOAD_PROFILE_SUCCESS:
    case GOOGLE_SIGN_SUCCESS:
    case FACEBOOK_SIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case GOOGLE_SIGN_FAIL:
    case FACEBOOK_SIGN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case GET_TOKEN_FROM_COOKIE:
      return {
        ...state,
        token: action.payload,
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        //error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return { ...state };
  }
};
