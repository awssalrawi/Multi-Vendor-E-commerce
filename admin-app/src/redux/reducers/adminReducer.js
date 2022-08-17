import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_LOGO_ADS_REQUEST,
  UPDATE_LOGO_ADS_SUCCESS,
  UPDATE_LOGO_ADS_FAIL,
  GET_LOGO_ADS_REQUEST,
  GET_LOGO_ADS_SUCCESS,
  GET_LOGO_ADS_FAIL,
} from "../constants/adminConstant";

const initialState = {
  error: null,
  loading: false,
  message: null,
  users: [],
};

const afterUpdateUser = (users, newUser) => {
  users.forEach((user, index) => {
    if (user._id === newUser._id) {
      users[index] = newUser;
    }
  });
  return users;
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        // users: [...afterUpdateUser(state.users, action.payload)],
      };

    case GET_ALL_USERS_FAIL:
    case UPDATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };
    case CLEAR_MESSAGE:
      return { ...state, message: null };

    default:
      return state;
  }
};

const loAdInitial = {
  loading: false,
  error: null,
  data: {},
};
export const logoAdsReducer = (state = loAdInitial, action) => {
  switch (action.type) {
    case UPDATE_LOGO_ADS_REQUEST:
    case GET_LOGO_ADS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_LOGO_ADS_SUCCESS:
    case GET_LOGO_ADS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case UPDATE_LOGO_ADS_FAIL:
    case GET_LOGO_ADS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
