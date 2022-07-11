import {
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAIL,
  GET_PRODUCTS_BY_SLUG_REQUEST,
  GET_PRODUCTS_BY_SLUG_SUCCESS,
  GET_PRODUCTS_BY_SLUG_FAIL,
  ADMIN_GET_ALL_PRODUCTS_REQUEST,
  ADMIN_GET_ALL_PRODUCTS_SUCCESS,
  ADMIN_GET_ALL_PRODUCTS_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  GET_CUS_PRODUCT_BY_ID_REQUEST,
  GET_CUS_PRODUCT_BY_ID_SUCCESS,
  GET_CUS_PRODUCT_BY_ID_FAIL,
  GET_SHOP_PRODUCT_REQUEST,
  GET_SHOP_PRODUCT_SUCCESS,
  GET_SHOP_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from './../constants/productConstant';

const getProductsBySlugState = {
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
  },
};

const initialStateOfProduct = {
  products: [],
};
const storeInitial = {
  loading: false,
  data: {},
  error: null,
};

const productsAfterCreateNewProduct = (products, newProduct) => {
  return [...products, newProduct];
};

const productsAfterDeleteProduct = (products, deletedProductId) => {
  return products.filter((product) => product._id !== deletedProductId);
};

const productsAfterUpdateOne = (products, updateProduct) => {
  const productsDeletedItem = productsAfterDeleteProduct(
    products,
    updateProduct._id
  );
  return productsAfterCreateNewProduct(productsDeletedItem, updateProduct);
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

export const productsManagementReducer = (
  state = initialStateOfProduct,
  action
) => {
  switch (action.type) {
    case ADMIN_GET_ALL_PRODUCTS_REQUEST:
    case ADMIN_CREATE_PRODUCT_REQUEST:
    case ADMIN_DELETE_PRODUCT_REQUEST:
    case ADMIN_UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case ADMIN_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: productsAfterCreateNewProduct(state.products, action.payload),
      };

    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: productsAfterDeleteProduct(state.products, action.payload),
      };
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: productsAfterUpdateOne(state.products, action.payload),
      };

    case ADMIN_GET_ALL_PRODUCTS_FAIL:
    case ADMIN_CREATE_PRODUCT_FAIL:
    case ADMIN_DELETE_PRODUCT_FAIL:
    case ADMIN_UPDATE_PRODUCT_FAIL:
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

export const cusProductsReducer = (
  state = { product: {}, loading: false },
  action
) => {
  switch (action.type) {
    case GET_CUS_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CUS_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case GET_CUS_PRODUCT_BY_ID_FAIL:
      return {
        loading: false,
        ...state,
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

export const storePageReducer = (state = storeInitial, action) => {
  switch (action.type) {
    case GET_SHOP_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SHOP_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_SHOP_PRODUCT_FAIL:
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
