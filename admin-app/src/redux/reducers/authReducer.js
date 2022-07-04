import {
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAIL,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/authConstant";

let authInitialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};
export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case SELLER_LOGIN_REQUEST:
    case LOAD_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case SELLER_LOGIN_SUCCESS:
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case SELLER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
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
