// import React from 'react';

// import { signWithFacebook, clearErrors } from '../../redux/actions/userAction';
// import { useDispatch } from 'react-redux';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import './style/global-styles.scss';
// import { ReactComponent as FacebookIcons } from '../../assests/facebook-logo.svg';

// const FacebookSign = ({ text }) => {
//   const dispatch = useDispatch();
//   const responseFacebook = (response) => {
//     console.log(response);
//     dispatch(signWithFacebook(response));
//   };

//   const responseFailure = () => {
//     dispatch(clearErrors());
//   };

//   return (
//     <FacebookLogin
//       appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
//       autoLoad={false}
//       callback={responseFacebook}
//       onFailure={responseFailure}
//       render={(renderProps) => (
//         <button className="generalBtn faceBtn" onClick={renderProps.onClick}>
//           <FacebookIcons className="faceIcon" />
//           {text}
//         </button>
//       )}
//     />
//   );
// };

// export default FacebookSign;
//*new FacebookSign
// import React from 'react';
// import OAuth2Login from 'react-simple-oauth2-login';
// import { signWithFacebook, clearErrors } from '../../redux/actions/userAction';
// import { useDispatch } from 'react-redux';

// const FacebookSign = () => {
//   const dispatch = useDispatch();
//   const onSuccess = (response) => {
//     console.log(response);

//     dispatch(signWithFacebook(response));
//   };
//   const onFailure = (response) => {
//     console.error(response);
//     dispatch(clearErrors());
//   };
//   return (
//     <div>
//       <OAuth2Login
//         // buttonText={
//         //   <div style={{ color: 'red', fontSize: '14px' }}>
//         //     sign with Facebook
//         //   </div>
//         // }

//         authorizationUrl="https://www.facebook.com/v14.0/dialog/oauth"
//         responseType="token"
//         clientId="3228144190782473"
//         redirectUri="http://localhost:3000"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//       />
//     </div>
//   );
// };

// export default FacebookSign;

import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import ButtonMat from '../../generalComponent/ButtonMat';
import { signWithFacebook, clearErrors } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';
// default
import { Facebook } from '@material-ui/icons';
const FacebookSign = () => {
  const dispatch = useDispatch();
  const onSuccess = (response) => {
    console.log('Awss', response);
    dispatch(signWithFacebook(response));
  };
  return (
    <div>
      <FacebookLogin
        appId="3228144190782473"
        // onSuccess={(response) => {
        //   console.log('Login Success!', response);
        // }}
        onFail={(error) => {
          dispatch(clearErrors());
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={onSuccess}
        // style={{
        //   backgroundColor: '#4267b2',
        //   color: '#fff',
        //   fontSize: '16px',
        //   padding: '12px 24px',
        //   border: 'none',
        //   borderRadius: '4px',
        // }}

        render={(renderProps) => (
          <ButtonMat
            name="Continue with Facebook"
            icon={<Facebook />}
            onClick={renderProps.onClick}
            style={{
              backgroundColor: '#4267b2',
              height: '32px',
              fontSize: '14px',
              width: '220px',
              textTransform: 'none',
              fontWeight: '400',
            }}
          />
        )}
      />
    </div>
  );
};

export default FacebookSign;
