import React, { Fragment, useState, useEffect } from 'react';
import './style/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  SignWithGoogle,
  clearErrors,
  login,
} from '../../redux/actions/userAction';
import { toast } from 'react-toastify';
import LoaderSpinner from '../utilis/LoaderSpinner';
import { EmailOutlined, LockOutlined } from '@material-ui/icons';
import FacebookSign from './FacebookSign';
import jwt_decode from 'jwt-decode';
import GoogleSign from './GoogleSign';
//*facebook try

//*facebook try
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, error, isAuthenticated]);
  //*try new google
  // function handleCallbackResponse(response) {
  //   console.log('NewwXresponse', response.credential);

  //   // const dat = jwt_decode(response.credential);
  //   dispatch(SignWithGoogle(jwt_decode(response.credential)));
  //   //console.log('dat', dat);
  // }
  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       '618592498649-bb95matoc7cp797mac74tpkp2epuf52f.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //     auto_select: true,
  //   });
  // }, []);
  // //google.accounts.id.prompt();

  // google.accounts.id.renderButton(
  //   document.getElementById('signGoogleDiv'),

  //   {
  //     theme: 'outline',
  //     text: 'continue_with',
  //     // theme: 'outline',
  //     type: 'standard',
  //     // type: 'icon',
  //     size: 'medium',
  //     width: '220px',
  //   }
  // );
  // //*try new google
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {/* <PageTitle title="Login" /> */}
      {loading ? (
        <LoaderSpinner />
      ) : (
        <Fragment>
          <div className="auth">
            <div className="auth__container">
              <span className="auth__header"> تسجيل دخول </span>
              <p style={{ fontSize: '10px' }}>
                {' '}
                email=lili@example.com ,password=a123456{' '}
              </p>
              <p style={{ fontSize: '10px' }}>
                {' '}
                email=moro@example.com ,password=a123456{' '}
              </p>
              <form action="#" className="auth__form" onSubmit={submitHandler}>
                <div className="auth__input">
                  <input
                    type="email"
                    placeholder="البريد الالكتوني"
                    className="auth__input-field"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <EmailOutlined
                    className="login-icons icon-left"
                    fontSize="medium"
                  />
                  {/* <i className="uil uil-envelope icon-left"></i> */}
                </div>
                <div className="auth__input">
                  <input
                    required
                    type="password"
                    placeholder="كلمة السر"
                    className="auth__input-field passwords"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    min="6"
                    max="15"
                  />
                  {/* <i className="uil uil-lock icon-left"></i> */}
                  <LockOutlined
                    className="login-icons icon-left"
                    fontSize="medium"
                  />
                </div>
                <div className="check-pass">
                  <Link to="/forgotpassword" className="check__forgot">
                    نسيت كلمة السر
                  </Link>
                </div>

                <div className="auth__btn">
                  <button
                    className="auth__btn-login"
                    type="submit"
                    id="login_button"
                  >
                    دخول
                  </button>
                </div>
                <div className="auth__signup">
                  <span className="signup-text">
                    {' لست مسجل من قبل'}
                    <br />
                    <Link
                      to="/signup"
                      className="signup-link"
                      style={{ margin: '0 5px' }}
                    >
                      انشاء حساب
                    </Link>
                  </span>
                  <span className="class-for-or">او</span>
                </div>
              </form>

              <div className="google-facebook-login">
                <div className="goog-box">
                  {/* <div id="signGoogleDiv"></div> */}
                  <GoogleSign />
                </div>
                <div className="goog-box">
                  <FacebookSign />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
