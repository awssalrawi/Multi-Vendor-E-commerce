import React, { Fragment } from 'react';
import { EmailOutlined } from '@material-ui/icons';
import './style/login.scss';
const ForgotPassword = () => {
  return (
    <Fragment>
      <div className="auth">
        <div className="auth__container">
          <span className="auth__header">Forgot Password</span>
          <form action="#" className="auth__form">
            <div className="auth__input">
              <input
                type="email"
                placeholder="Email"
                className="auth__input-field"
              />
              <EmailOutlined
                className="login-icons icon-left"
                fontSize="medium"
              />
            </div>

            <div className="auth__btn mt-5">
              <input
                type="button"
                value="Send Email"
                className="auth__btn-login"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
