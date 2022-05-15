import {
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from './../constants/productConstant';

export const adminProductReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case ADMIN_CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case ADMIN_CREATE_PRODUCT_FAIL:
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
