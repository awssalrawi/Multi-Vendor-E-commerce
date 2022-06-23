import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  DECREASE_QTY,
  GET_CART_ITEMS_DB_REQUEST,
  GET_CART_ITEMS_DB_SUCCESS,
  GET_CART_ITEMS_DB_FAIL,
  GET_CART_ITEMS_LOCAL,
  CLEAR_ERRORS,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_ITEM_DB_REQUEST,
  DECREASE_QTY_DB_REQUEST,
} from '../constants/cartConstant';

// let initialState = {
//   cartItems: localStorage.getItem('ltredaCartItem')
//     ? JSON.parse(localStorage.getItem('ltredaCartItem'))
//     : [],
// };
let initialState = {
  cartItems: [],
  error: null,
  message: null,
  loading: false,
};

// const addItemToCartConditions = (cartItems, cartItemToAdd) => {
//   let existingCartItem;
//   const newItemCheckSpecific = cartItemToAdd?.specific ? true : false;
//   if (newItemCheckSpecific) {
//     existingCartItem = cartItems.find(
//       (cartItem) =>
//         cartItem._id === cartItemToAdd._id &&
//         cartItem.specific === cartItemToAdd.specific
//     );

//     if (existingCartItem) {
//       return cartItems.map((cartItem) =>
//         cartItem._id === cartItemToAdd._id &&
//         cartItem.specific === cartItemToAdd.specific &&
//         cartItem.cartQuant < cartItem.inStock
//           ? { ...cartItem, cartQuant: cartItem.cartQuant + 1 }
//           : cartItem
//       );
//     }
//     return [...cartItems, { ...cartItemToAdd, cartQuant: 1 }];
//   } else {
//     existingCartItem = cartItems.find(
//       (cartItem) => cartItem._id === cartItemToAdd._id
//     );
//     if (existingCartItem) {
//       console.log('exist', existingCartItem);
//       return cartItems.map((cartItem) =>
//         cartItem._id === cartItemToAdd._id &&
//         cartItem.cartQuant < cartItem.inStock
//           ? { ...cartItem, cartQuant: cartItem.cartQuant + 1 }
//           : cartItem
//       );
//     }

//     return [...cartItems, { ...cartItemToAdd, cartQuant: 1 }];
//   }
// };

// const removeItemFromCart = (cartItems, removedItem) => {
//   // const hasSpecific = removedItem.specific ? true : false;
//   let newArray = [];
//   newArray = cartItems.filter((cartItem) => cartItem !== removedItem);
//   console.log('filter', newArray);
//   return newArray;
// };

// const decreaseQuantity = (cartItems, item) => {
//   return cartItems.map((cartItem) =>
//     cartItem === item
//       ? { ...cartItem, cartQuant: cartItem.cartQuant - 1 }
//       : cartItem
//   );
// };
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case DECREASE_QTY:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ADD_TO_CART_REQUEST:
    case REMOVE_ITEM_DB_REQUEST:
    case DECREASE_QTY_DB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CART_ITEMS_DB_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CART_ITEMS_DB_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
    case GET_CART_ITEMS_DB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CART_ITEMS_LOCAL:
      return {
        ...state,
        cartItems: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
