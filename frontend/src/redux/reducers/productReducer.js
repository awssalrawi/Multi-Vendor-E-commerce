import {
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAIL,
  GET_PRODUCTS_BY_SLUG_REQUEST,
  GET_PRODUCTS_BY_SLUG_SUCCESS,
  GET_PRODUCTS_BY_SLUG_FAIL,
  CLEAR_ERRORS,
} from './../constants/productConstant';

const getProductsBySlugState = {
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
  },
};
export const adminProductReducer = (state = { products: [] }, action) => {
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

export const getProductsBySlugReducer = (
  state = getProductsBySlugState,
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SLUG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS_BY_SLUG_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
    case GET_PRODUCTS_BY_SLUG_FAIL:
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
