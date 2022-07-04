import React from "react";
import "./styles/loadingSpinner.scss";
const LoaderSpinner = ({ text }) => {
  return (
    <div className="load-center">
      <div className="load-ring"></div>
      <span className="load-span">{text ? text : "Loading"}...</span>
    </div>
  );
};

export default LoaderSpinner;
