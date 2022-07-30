import React, { Fragment, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import {
  SignWithGoogle,
  clearErrors,
  login,
} from '../../redux/actions/userAction';
import jwt_decode from 'jwt-decode';
const NewGoogleSign = () => {
  const dispatch = useDispatch();
  function handleCallbackResponse(response) {
    console.log('NewwXresponse', response.credential);

    // const dat = jwt_decode(response.credential);
    dispatch(SignWithGoogle(jwt_decode(response.credential)));
    //console.log('dat', dat);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '618592498649-bb95matoc7cp797mac74tpkp2epuf52f.apps.googleusercontent.com',
      callback: handleCallbackResponse,
      auto_select: true,
    });
  }, []);
  //google.accounts.id.prompt();

  google.accounts.id.renderButton(
    document.getElementById('signGoogleDiv'),

    {
      theme: 'outline',
      text: 'continue_with',
      size: 'medium',
      // width: '220px',
    }
  );
  return <div id="signGoogleDiv"></div>;
};

export default NewGoogleSign;
