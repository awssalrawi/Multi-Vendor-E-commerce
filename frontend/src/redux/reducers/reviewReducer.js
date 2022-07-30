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

const newReviewInitial = {
  loading: false,
  error: null,
  message: null,
  reviews: [],
};

const checkReview = (reviews, r) => {
  let arr = [];
  const isThere = reviews.find((review) => review._id === r._id);
  if (isThere) {
    const removedElArr = reviews.filter((review) => review !== isThere);
    arr = [...removedElArr, r];
    return arr;
  }

  return [...reviews, r];
};

export const reviewReducer = (state = newReviewInitial, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
    case GET_REVIEW_REQUEST:
      return { ...state, loading: true };
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: checkReview(state.reviews, action.payload),
        message: 'Review submitted successfully',
      };

    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };

    case NEW_REVIEW_FAIL:
    case GET_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };

    default:
      return state;
  }
};
