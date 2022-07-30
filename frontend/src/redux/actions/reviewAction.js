import axios from 'axios';
import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
} from '../constants/reviewConstant';

export const userAddReview = (obj) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/v1/review', obj, config);
    console.log('data', data);
    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.review });
  } catch (error) {
    console.log(error);
    // dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const getReview = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST });
    const { data } = await axios.get('/api/v1/review');
    dispatch({ type: GET_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
