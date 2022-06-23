import {
  CURR_SUCCESS,
  CURR_FAIL,
  CLEAR_ERRORS,
  SELECTED_CURRENCY,
} from '../constants/currencyConstant';

export const currencyReducer = (
  state = { currs: [], error: null, selectedCurrency: 'IQD' },
  action
) => {
  switch (action.type) {
    case CURR_SUCCESS:
      return {
        ...state,
        currs: action.payload,
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
