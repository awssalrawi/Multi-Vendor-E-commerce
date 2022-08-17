import React, { Fragment } from 'react';
import './style/activate-accountMs.scss';
import { Link } from 'react-router-dom';

const ActivateAccountMs = () => {
  return (
    <Fragment>
      <div className="activate">
        <h1 className="activate-text">اهلا بك في عائلة لتريدا </h1>
        <Link to="/" className="activate-content">
          اضغط هنا للذهاب الى القائمة الرئيسية
        </Link>
      </div>
    </Fragment>
  );
};

export default ActivateAccountMs;
