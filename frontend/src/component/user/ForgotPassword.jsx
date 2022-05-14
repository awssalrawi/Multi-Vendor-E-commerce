import React, { Fragment } from "react";

import "./style/login.scss";
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
              <i className="uil uil-envelope icon-left"></i>
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
