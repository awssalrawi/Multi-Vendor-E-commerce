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

export const userAddOrder = (order) => async (dispatch) => {
  try {
    console.log(order);
    dispatch({ type: USER_ADD_ORDER_REQUEST });

    //await axios.post('/api/user/order/create', order);
    const response = await axios.post('/api/v1/user/order/create', {
      order,
    });
    if (response.status === 201) {
      dispatch(getMyCartItems());
    }
    console.log('data', response);
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

    const { data } = await axios.get('/api/v1/user/order/getorders');

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
