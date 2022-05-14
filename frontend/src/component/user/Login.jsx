import React, { Fragment, useState, useEffect } from 'react';
import './style/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../redux/actions/userAction';
import { toast } from 'react-toastify';
import PageTitle from '../utilis/PageTitle';
import LoaderSpinner from '../utilis/LoaderSpinner';
import GoogleSign from './GoogleSign';
import FacebookSign from './FacebookSign';
import { EmailOutlined, LockOutlined } from '@material-ui/icons';

//import { clear } from "google-auth-library/build/src/auth/envDetect";

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

  const submitHandler = (e) => {
    console.log(typeof email);
    e.preventDefault();
    dispatch(login(email, password));
  };

  //* show and hide password functions
  function showHidePassword() {
    const passwordShowHide = document.querySelector('.icon-passShow');
    const passwordFields = document.querySelectorAll('.passwords');

    passwordFields.forEach((field) => {
      if (field.type === 'password') {
        field.type = 'text';
        passwordShowHide.classList.replace('uil-eye-slash', 'uil-eye');
      } else {
        field.type = 'password';
        passwordShowHide.classList.replace('uil-eye', 'uil-eye-slash');
      }
    });
  }
  return (
    <Fragment>
      <PageTitle title="Login" />
      {loading ? (
        <LoaderSpinner />
      ) : (
        <Fragment>
          <div className="auth">
            <div className="auth__container">
              <span className="auth__header"> Login </span>
              <form action="#" className="auth__form" onSubmit={submitHandler}>
                <div className="auth__input">
                  <input
                    type="email"
                    placeholder="Email"
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
                    placeholder="Password"
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
                  <i
                    className="login-icons uil uil-eye-slash icon-passShow"
                    onClick={showHidePassword}
                  ></i>
                </div>
                <div className="check-pass">
                  <Link to="/forgotpassword" className="check__forgot">
                    Forgot password?
                  </Link>
                </div>

                <div className="auth__btn">
                  <button
                    className="auth__btn-login"
                    type="submit"
                    id="login_button"
                  >
                    Sign in
                  </button>
                </div>
                <div className="auth__signup">
                  <span className="signup-text">
                    Not a member?
                    <Link to="/signup" className="signup-link">
                      Signup Now
                    </Link>
                  </span>
                  <span className="class-for-or">Or</span>
                </div>
              </form>

              <div className="google-facebook-login design-same">
                <GoogleSign text="Sign in with Google" />
                <FacebookSign text="Sign in with Facebook" />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
