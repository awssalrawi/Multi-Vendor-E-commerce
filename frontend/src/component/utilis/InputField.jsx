import React, { Fragment } from "react";
import "./styles/inputField.scss";

const InputField = ({ type, placeholder, name, children, ...otherProps }) => {
  return (
    <Fragment>
      <div className="field__container">
        <input
          type={type}
          placeholder={placeholder}
          className="field-style"
          name={name}
          {...otherProps}
        />
        {type !== "password" && (
          <label htmlFor={name} className="field__label">
            {placeholder}
          </label>
        )}

        {children}
      </div>
    </Fragment>
  );
};

export default InputField;
