import {
  USER_ADD_ORDER_REQUEST,
  USER_ADD_ORDER_SUCCESS,
  USER_ADD_ORDER_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
} from '../constants/orderConstant';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  message: null,
};
export const userOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER_REQUEST:
    case USER_ADD_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_USER_ORDER_FAIL:
    case USER_ADD_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };

    default:
      return state;
  }
};
