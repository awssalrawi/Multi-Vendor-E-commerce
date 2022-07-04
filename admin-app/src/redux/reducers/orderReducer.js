import {
  USER_ADD_ORDER_REQUEST,
  USER_ADD_ORDER_SUCCESS,
  USER_ADD_ORDER_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,
  GET_SELLER_INFO_REQUEST,
  GET_SELLER_INFO_SUCCESS,
  GET_SELLER_INFO_FAIL,
  CLEAR_ERRORS,
  GET_SELLER_ORDERS_REQUEST,
  GET_SELLER_ORDERS_SUCCESS,
  GET_SELLER_ORDERS_FAIL,
  CLEAR_MESSAGE,
  GET_SINGLE_ORDER_REQUEST,
  GET_SINGLE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_FAIL,
  UPDATE_SINGLE_ORDER_REQUEST,
  UPDATE_SINGLE_ORDER_SUCCESS,
  UPDATE_SINGLE_ORDER_FAIL,
  ADMIN_GET_ORDERS_REQUEST,
  ADMIN_GET_ORDERS_SUCCESS,
  ADMIN_GET_ORDERS_FAIL,
  ADMIN_GET_ORDER_DET_REQUEST,
  ADMIN_GET_ORDER_DET_SUCCESS,
  ADMIN_GET_ORDER_DET_FAIL,
  ADMIN_UPDATE_STATUS_REQUEST,
  ADMIN_UPDATE_STATUS_SUCCESS,
  ADMIN_UPDATE_STATUS_FAIL,
} from "../constants/orderConstant";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  message: null,
};

const sellerOrderInitial = {
  shop: {},
  loading: false,
  error: null,
  message: null,
  orders: [],
};

const singOrder = {
  loading: false,
  error: null,
  message: null,
  order: {},
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

export const shopReducer = (state = sellerOrderInitial, action) => {
  switch (action.type) {
    case GET_SELLER_INFO_REQUEST:
    case GET_SELLER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SELLER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        shop: action.payload,
      };
    case GET_SELLER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_SELLER_INFO_FAIL:
    case GET_SELLER_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const singleOrderReducer = (state = singOrder, action) => {
  switch (action.type) {
    case GET_SINGLE_ORDER_REQUEST:
    case UPDATE_SINGLE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case UPDATE_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_SINGLE_ORDER_FAIL:
    case UPDATE_SINGLE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
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
      return state;
  }
};

const adminOrder = {
  loading: false,
  orders: [],
  error: null,
  message: null,
};

const orderDetail = {
  loading: false,
  order: {},
  error: null,
  message: null,
};

export const adminOrdersReducer = (state = adminOrder, action) => {
  switch (action.type) {
    case ADMIN_GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ADMIN_GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
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
      return state;
  }
};

export const adminOrderConfigReducer = (state = orderDetail, action) => {
  switch (action.type) {
    case ADMIN_GET_ORDER_DET_REQUEST:
    case ADMIN_UPDATE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_ORDER_DET_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ADMIN_UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Order Updated Successfully!",
      };
    case ADMIN_GET_ORDER_DET_FAIL:
      return {
        ...state,
        loading: false,
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
      return state;
  }
};
