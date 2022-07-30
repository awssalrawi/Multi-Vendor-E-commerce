import React, { Fragment } from 'react';
//! not need
// import GoogleLogin from 'react-google-login';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { SignWithGoogle, clearErrors } from '../../redux/actions/userAction';
import './style/global-styles.scss';
import { ReactComponent as GoogleIcons } from '../../assests/google-plus.svg';
import jwt_decode from 'jwt-decode';
const GoogleSign = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    console.log('response', response);
    dispatch(SignWithGoogle(jwt_decode(response.credential)));
  };
  const responseGoogleFailure = () => {
    dispatch(clearErrors());
  };

  return (
    <GoogleOAuthProvider clientId="618592498649-bb95matoc7cp797mac74tpkp2epuf52f.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={responseGoogleFailure}
        auto_select={false}
        size="medium"
        width="220px"
        text="continue_with"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSign;
