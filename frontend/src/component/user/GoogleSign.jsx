import React, { Fragment } from 'react';

import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { SignWithGoogle, clearErrors } from '../../redux/actions/userAction';
import './style/global-styles.scss';
import { ReactComponent as GoogleIcons } from '../../assests/google-plus.svg';
const GoogleSign = ({ text }) => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    dispatch(SignWithGoogle(response));
  };
  const responseGoogleFailure = () => {
    dispatch(clearErrors());
  };
  return (
    <div className="pb-3 w-100">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        render={(renderProps) => (
          <Fragment>
            <button
              className="generalBtn googleBtn"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <GoogleIcons className="googleIcon" />
              {text}
            </button>
          </Fragment>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleSign;
