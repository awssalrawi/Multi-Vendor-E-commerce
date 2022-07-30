import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  DECREASE_QTY,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_CART_ITEMS_DB_REQUEST,
  GET_CART_ITEMS_DB_SUCCESS,
  GET_CART_ITEMS_DB_FAIL,
  GET_CART_ITEMS_LOCAL,
  REMOVE_ITEM_DB_REQUEST,
  REMOVE_ITEM_DB_SUCCESS,
  REMOVE_ITEM_DB_FAIL,
  DECREASE_QTY_DB,
  CURR_SUCCESS,
  CURR_FAIL,
  CLEAR_ERRORS,
  DECREASE_QTY_DB_REQUEST,
} from '../constants/cartConstant';
import axios from 'axios';

//!working on action
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
  let newArray = [];
  newArray = cartItems.filter((cartItem) => cartItem !== removedItem);

  return newArray;
};

const decreaseQuantity = (cartItems, item) => {
  return cartItems.map((cartItem) =>
    cartItem === item
      ? { ...cartItem, cartQuant: cartItem.cartQuant - 1 }
      : cartItem
  );
};
//!working on action

export const addItemToCart = (item) => async (dispatch, getState) => {
  const isAuthenticated = getState().auth.isAuthenticated;
  const { cartItems } = getState().cart;
  if (!isAuthenticated) {
    dispatch({
      type: ADD_TO_CART,
      payload: addItemToCartConditions(cartItems, item),
    });
    localStorage.setItem(
      'ltredaCartItem',
      JSON.stringify(getState().cart.cartItems)
    );
  } else {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });
      let itemSendToDb = {};

      if (cartItems.length > 0) {
        let ItemAlreadyAdded;
        const hasSpecific = item.specific ? true : false;
        if (hasSpecific) {
          ItemAlreadyAdded = cartItems.find(
            (i) => i._id === item._id && i.specific === item.specific
          );
        } else {
          ItemAlreadyAdded = cartItems.find((i) => i._id === item._id);
        }

        if (ItemAlreadyAdded) {
          if (ItemAlreadyAdded.cartQuant >= ItemAlreadyAdded.inStock) return;

          itemSendToDb = {
            cartItems: [
              {
                product: ItemAlreadyAdded._id,
                cartQuant: ItemAlreadyAdded.cartQuant * 1 + 1,
                specific: ItemAlreadyAdded.specific || undefined,
              },
            ],
          };
        } else {
          itemSendToDb = {
            cartItems: [
              {
                product: item._id,
                specific: item.specific || undefined,
              },
            ],
          };
        }
      } else {
        itemSendToDb = {
          cartItems: [
            {
              product: item._id,
              specific: item.specific || undefined,
            },
          ],
        };
      }

      const { data } = await axios.post('/api/v1/user/cart/test', itemSendToDb);

      dispatch(getMyCartItems());

      dispatch({ type: ADD_TO_CART_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};

export const removeItemToCart = (item) => async (dispatch, getState) => {
  const isAuthenticated = getState().auth.isAuthenticated;
  const { cartItems } = getState().cart;

  if (isAuthenticated) {
    const removeItem = {
      product: item._id,
      cartQuant: item.cartQuant,
      specific: item.specific || undefined,
    };

    try {
      dispatch({ type: REMOVE_ITEM_DB_REQUEST });
      const res = await axios.put('/api/v1/user/cart/delete-one', removeItem);
      if (res.data.success) {
        dispatch(getMyCartItems());
        // dispatch({ type: REMOVE_ITEM_DB_SUCCESS });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch({
      type: REMOVE_ITEM_CART,
      payload: removeItemFromCart(cartItems, item),
    });

    localStorage.setItem(
      'ltredaCartItem',
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const decreaseQtyFormCart = (item) => async (dispatch, getState) => {
  const isAuthenticated = getState().auth.isAuthenticated;
  const { cartItems } = getState().cart;

  if (isAuthenticated) {
    const decItem = {
      cartItems: [
        {
          product: item._id,
          cartQuant: item.cartQuant * 1 - 1,
          specific: item.specific || undefined,
        },
      ],
    };

    try {
      dispatch({ type: DECREASE_QTY_DB_REQUEST });

      const res = await axios.post('/api/v1/user/cart/test', decItem);

      if (res.status === 200) {
        dispatch(getMyCartItems());
        dispatch({ type: DECREASE_QTY_DB });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch({
      type: DECREASE_QTY,
      payload: decreaseQuantity(cartItems, item),
    });

    localStorage.setItem(
      'ltredaCartItem',
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const getMyCartItems = () => async (dispatch, getState) => {
  const { isAuthenticated } = getState().auth;
  if (!isAuthenticated) return;

  try {
    dispatch({ type: GET_CART_ITEMS_DB_REQUEST });
    const { data } = await axios.get('/api/v1/user/cart/getcartitem');
    dispatch({ type: GET_CART_ITEMS_DB_SUCCESS, payload: data.cartItems });
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: GET_CART_ITEMS_DB_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCart = () => async (dispatch, getState) => {
  let cartItems = localStorage.getItem('ltredaCartItem')
    ? JSON.parse(localStorage.getItem('ltredaCartItem'))
    : [];

  const isAuthenticated = getState().auth.isAuthenticated;

  if (isAuthenticated) {
    localStorage.removeItem('ltredaCartItem');
    try {
      if (cartItems.length > 0) {
        const itemSendToDb = {
          cartItems: cartItems.map((item) => ({
            product: item._id,
            cartQuant: item.cartQuant,
            specific: item.specific || undefined,
          })),
        };
        const res = await axios.post('/api/v1/user/cart/test', itemSendToDb);
      }

      dispatch(getMyCartItems());
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch({ type: GET_CART_ITEMS_LOCAL, payload: cartItems });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
