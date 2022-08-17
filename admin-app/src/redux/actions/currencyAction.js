// import {
//   CURR_SUCCESS,
//   CURR_FAIL,
//   CLEAR_ERRORS,
//   SELECTED_CURRENCY,
//   CURR_REQUEST,
// } from '../constants/currencyConstant';

// import axios from 'axios';

// export const getCurrencyConst = () => async (dispatch) => {
//   try {
//     dispatch({ type: CURR_REQUEST });
//     const { data } = await axios.get('/api/v1/currency');
//     dispatch({ type: CURR_SUCCESS, payload: data.cur });
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: CURR_FAIL, payload: error.response.data.message });
//   }
// };

// export const selectedCurrency = (cur) => (dispatch) => {
//   dispatch({ type: SELECTED_CURRENCY, payload: cur });
// };
// export const clearErrors = () => (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };
