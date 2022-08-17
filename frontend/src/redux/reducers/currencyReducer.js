import {
  CURR_SUCCESS,
  CURR_FAIL,
  CLEAR_ERRORS,
  SELECTED_CURRENCY,
} from '../constants/currencyConstant';

const currInitialState = {
  currs: [],
  error: null,
  selectedCurrency: localStorage.getItem('currency')
    ? localStorage.getItem('currency')
    : 'IQD',
  loading: false,

  appImgs: [],
};

export const currencyReducer = (state = currInitialState, action) => {
  switch (action.type) {
    case CURR_SUCCESS:
      return {
        ...state,
        currs: action.payload.cur,
        appImgs: action.payload.appData,
      };

    case CURR_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SELECTED_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload,
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
