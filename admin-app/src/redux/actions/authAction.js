import {
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAIL,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/authConstant";

import axios from "axios";

export const loginAsSeller = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/user/seller/signin",
      { email, password },
      config
    );

    if (data.success) {
      localStorage.setItem("SellerAuthTokenReload", data.token);
      localStorage.setItem("ltredaSeller", JSON.stringify(data.user));
      dispatch({ type: SELLER_LOGIN_SUCCESS, payload: data.user });
    }

    //  dispatch({ type: GET_TOKEN_FROM_COOKIE, payload: data.token });
  } catch (error) {
    console.log("Login action error", error);
    dispatch({ type: SELLER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const getMyProfileData = () => async (dispatch) => {
  if (localStorage.getItem("ltredaSeller")) {
    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: JSON.parse(localStorage.getItem("ltredaSeller")),
    });
  } else {
    try {
      dispatch({ type: LOAD_PROFILE_REQUEST });

      const { data } = await axios.get("/api/v1/user/me");
      if (data.success) {
        localStorage.setItem("ltredaSeller", JSON.stringify(data.user));

        dispatch({ type: LOAD_PROFILE_SUCCESS, payload: data.user });
      }
      //  console.log('ltetetetea', JSON.parse(localStorage.getItem('ltredaUser')));
    } catch (error) {
      console.log("Login action error", error);
      dispatch({ type: LOAD_PROFILE_FAIL });
      // dispatch({ type: LOAD_PROFILE_FAIL, payload: error.response.data.message });
    }
  }

  //***** */
  // try {
  //   dispatch({ type: LOAD_PROFILE_REQUEST });

  //   const { data } = await axios.get("/api/v1/user/me");

  //   dispatch({ type: LOAD_PROFILE_SUCCESS, payload: data.user });
  // } catch (error) {
  //   console.log("Login action error", error);
  //   dispatch({ type: LOAD_PROFILE_FAIL });
  //   // dispatch({ type: LOAD_PROFILE_FAIL, payload: error.response.data.message });
  // }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/user/logout");
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem("SellerAuthTokenReload");
    localStorage.removeItem("ltredaSeller");
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.message });
  }
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
