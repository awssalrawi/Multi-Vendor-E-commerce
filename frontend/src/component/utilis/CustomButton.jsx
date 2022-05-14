import React, { Fragment } from "react";
import "./styles/customButton.scss";

const CustomButton = ({ color, children, ...otherProps }) => {
  return (
    <Fragment>
      <button className={`custom-button ${color}-color`} {...otherProps}>
        {children}
      </button>
    </Fragment>
  );
};

export default CustomButton;
