import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles/phoneHeaderHome.scss';
const PhoneHeaderHome = () => {
  return (
    <Fragment>
      <div className="headerPhone-component">
        <Link to="/" className="text-decoration-none">
          <img src="/logo.png" alt="logo" className="headerPhone-logo" />
        </Link>
        <form action="#" className="headerPhone-form">
          <input
            type="text"
            className="headerPhone-form__input"
            placeholder="Search product"
          />
          <button className="headerPhone-form__button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default PhoneHeaderHome;
