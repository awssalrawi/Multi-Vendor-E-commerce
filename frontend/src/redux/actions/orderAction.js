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
import axios from 'axios';
import { getMyCartItems } from './cartAction';
import { URL } from '../../Url';
export const userAddOrder = (order) => async (dispatch) => {
  try {
    console.log(order);
    dispatch({ type: USER_ADD_ORDER_REQUEST });
    //!bearer token

    const token = localStorage.getItem('authTokenReload')
      ? localStorage.getItem('authTokenReload')
      : '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    //await axios.post('/api/user/order/create', order);
    const response = await axios.post(
      `${URL}/api/v1/user/order/create`,
      {
        order,
      },
      config
    );
    if (response.status === 201) {
      dispatch(getMyCartItems());
    }

    dispatch({ type: USER_ADD_ORDER_SUCCESS, payload: response.data.order });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ADD_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userGetOrder = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDER_REQUEST });
    //!bearer token

    const token = localStorage.getItem('authTokenReload')
      ? localStorage.getItem('authTokenReload')
      : '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    //!bearer token

    const { data } = await axios.get(
      `${URL}/api/v1/user/order/getorders`,
      config
    );

    dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_USER_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
