import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  DECREASE_QTY,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
} from '../constants/cartConstant';
import axios from 'axios';
export const addItemToCart = (item) => async (dispatch, getState) => {
  const authenticated = getState().auth.isAuthenticated;
  const { cartItems } = getState().cart;
  if (!authenticated) {
    console.log('inside add to cart action and it is not auth');
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
    localStorage.setItem(
      'ltredaCartItem',
      JSON.stringify(getState().cart.cartItems)
    );
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } else {
    try {
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

          console.log('iiii', ItemAlreadyAdded);
        }

        if (ItemAlreadyAdded) {
          if (ItemAlreadyAdded.cartQuant >= ItemAlreadyAdded.inStock) return;

          console.log('I came hereeeeeeeeeee');
          itemSendToDb = {
            cartItems: [
              {
                product: ItemAlreadyAdded._id,
                cartQuant: ItemAlreadyAdded.cartQuant * 1 + 1,
                specific: ItemAlreadyAdded.specific || undefined,
              },
            ],
          };
          console.log(itemSendToDb);
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
};

export const removeItemToCart = (item) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: item,
  });

  localStorage.setItem(
    'ltredaCartItem',
    JSON.stringify(getState().cart.cartItems)
  );
};

export const decreaseQtyFormCart = (item) => (dispatch, getState) => {
  dispatch({
    type: DECREASE_QTY,
    payload: item,
  });

  localStorage.setItem(
    'ltredaCartItem',
    JSON.stringify(getState().cart.cartItems)
  );
};
export const addItemToCartInDb = (item) => (dispatch, getState) => {
  if (getState().authTokenReload) {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });
    } catch (error) {}
  }
};

//* for getCartItems from database
// const { cartItems } = getState().cart;
// console.log('he is auth and cart items is', cartItems);
// if (cartItems?.length > 0) {
//   try {
//     const itemsForDB = cartItems.map((item) => ({
//       productId: item._id,
//       cartQuant: item.cartQuant,
//       specific: item.specific || undefined,
//     }));

//     const { data } = await axios.post('/api/v1/user/cart/test', itemsForDB);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
