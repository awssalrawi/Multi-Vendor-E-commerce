import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSign from './GoogleSign';
// import FacebookSign from './FacebookSign';
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlineOutlined,
} from '@material-ui/icons';
import { toast } from 'react-toastify';
import {
  signUpWithEmailAndPassword,
  clearErrors,
} from '../../redux/actions/userAction';
// import { UilUser } from "@iconscout/react-unicons";
import './style/login.scss';
import { Link } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { message, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUpWithEmailAndPassword(name, email, password));
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
      <div className="auth">
        <div className="auth__container">
          <span className="auth__header">Register by email</span>
          <form action="#" className="auth__form" onSubmit={submitHandler}>
            <div className="auth__input">
              <input
                type="text"
                placeholder="Name"
                className="auth__input-field"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                min={3}
              />
              <PersonOutlineOutlined className="login-icons icon-p" />
              {/* <i className="uil uil-user icon-p"></i> */}
            </div>
            <div className="auth__input">
              <input
                type="email"
                placeholder="Email"
                className="auth__input-field"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailOutlined className="login-icons icon-left " />
              {/* <i className="uil uil-envelope icon-left"></i> */}
            </div>
            <div className="auth__input">
              <input
                required
                type="password"
                placeholder="Password"
                className="auth__input-field passwords"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LockOutlined className="login-icons icon-left" />
              {/* <i className="uil uil-lock icon-left"></i> */}
              <i
                className="uil uil-eye-slash login-icons icon-passShow"
                onClick={showHidePassword}
              ></i>
            </div>
            <div className="check-pass">
              <div className="check-container">
                <input type="checkbox" className="check" id="checkLog" />
                <label htmlFor="checkLog" className="check__text">
                  I have read and accepted all{' '}
                  <Link to="#" className="link">
                    conditions
                  </Link>
                </label>
              </div>
            </div>

            <div className="auth__btn">
              <button type="submit" className="auth__btn-login">
                Register Now
              </button>
            </div>
            <p className="text-align-center my-0">Or</p>
            {/* <div className="auth__btn">
              <input
                type="button"
                value="Sign with Google"
                className="auth__btn-google"
              />
            </div> */}
            <div className="google-facebook-login">
              <GoogleSign text=" Sign Up With Google" />
              {/* <FacebookSign text=" Sign Up With Facebook" /> */}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
