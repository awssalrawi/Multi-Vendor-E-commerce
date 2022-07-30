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
  CLEAR_MESSAGE,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_REQUEST,
  ADD_USER_ADDRESS_FAIL,
  DELETE_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_FAIL,
} from '../constants/userConstant';

let authInitialState = {
  user: {},
  loading: false,
  error: null,
  message: null,
};

let userInfoInitialState = {
  address: [],
  loading: false,
  error: null,
  message: null,
};

export const authReducer = (state = authInitialState, action) => {
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
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return { ...state };
  }
};

export const userInfoReducer = (state = userInfoInitialState, action) => {
  switch (action.type) {
    case GET_USER_ADDRESS_REQUEST:
    case ADD_USER_ADDRESS_REQUEST:
    case DELETE_USER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    case ADD_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
        message: 'Address Added Successfully',
      };
    case DELETE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'Address removed Successfully',
      };
    case GET_USER_ADDRESS_FAIL:
    case ADD_USER_ADDRESS_FAIL:
    case DELETE_USER_ADDRESS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
