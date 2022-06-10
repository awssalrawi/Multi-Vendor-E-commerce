import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  DECREASE_QTY,
} from '../constants/cartConstant';

let initialState = {
  cartItems: localStorage.getItem('ltredaCartItem')
    ? JSON.parse(localStorage.getItem('ltredaCartItem'))
    : [],
};

const addItemToCartConditions = (cartItems, cartItemToAdd) => {
  let existingCartItem;
  const newItemCheckSpecific = cartItemToAdd?.specific ? true : false;
  if (newItemCheckSpecific) {
    existingCartItem = cartItems.find(
      (cartItem) =>
        cartItem._id === cartItemToAdd._id &&
        cartItem.specific === cartItemToAdd.specific
    );

    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem._id === cartItemToAdd._id &&
        cartItem.specific === cartItemToAdd.specific &&
        cartItem.cartQuant < cartItem.inStock
          ? { ...cartItem, cartQuant: cartItem.cartQuant + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...cartItemToAdd, cartQuant: 1 }];
  } else {
    existingCartItem = cartItems.find(
      (cartItem) => cartItem._id === cartItemToAdd._id
    );
    if (existingCartItem) {
      console.log('exist', existingCartItem);
      return cartItems.map((cartItem) =>
        cartItem._id === cartItemToAdd._id &&
        cartItem.cartQuant < cartItem.inStock
          ? { ...cartItem, cartQuant: cartItem.cartQuant + 1 }
          : cartItem
      );
    }

    return [...cartItems, { ...cartItemToAdd, cartQuant: 1 }];
  }
};

const removeItemFromCart = (cartItems, removedItem) => {
  // const hasSpecific = removedItem.specific ? true : false;
  let newArray = [];
  newArray = cartItems.filter((cartItem) => cartItem !== removedItem);
  console.log('filter', newArray);
  return newArray;
};

const decreaseQuantity = (cartItems, item) => {
  return cartItems.map((cartItem) =>
    cartItem === item
      ? { ...cartItem, cartQuant: cartItem.cartQuant - 1 }
      : cartItem
  );
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: addItemToCartConditions(state.cartItems, action.payload),
      };
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case DECREASE_QTY:
      return {
        ...state,
        cartItems: decreaseQuantity(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};
