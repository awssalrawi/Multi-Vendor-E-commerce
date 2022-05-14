import React from 'react';

import { signWithFacebook, clearErrors } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './style/global-styles.scss';
import { ReactComponent as FacebookIcons } from '../../assests/facebook-logo.svg';

const FacebookSign = ({ text }) => {
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
    console.log(response);
    dispatch(signWithFacebook(response));
  };

  const responseFailure = () => {
    dispatch(clearErrors());
  };

  return (
    <FacebookLogin
      appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
      autoLoad={false}
      callback={responseFacebook}
      onFailure={responseFailure}
      render={(renderProps) => (
        <button className="generalBtn faceBtn" onClick={renderProps.onClick}>
          <FacebookIcons className="faceIcon" />
          {text}
        </button>
      )}
    />
  );
};

export default FacebookSign;
