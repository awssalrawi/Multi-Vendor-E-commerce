import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './styles/phone-footer-nav.scss';
import {
  HomeOutlined,
  PersonOutlineOutlined,
  ShoppingBasketOutlined,
  StorefrontOutlined,
} from '@material-ui/icons';
const PhoneFooterNav = ({ user }) => {
  return (
    <nav className="phone-footer-nav" id="phone-footer-nav">
      <Link to="/" className="phone-footer-nav__icon-box">
        <HomeOutlined className="phone-footer-nav__icon" />
      </Link>
      <Link to="#" className="phone-footer-nav__icon-box">
        <StorefrontOutlined className="phone-footer-nav__icon" />
      </Link>
      <Link to="#" className="phone-footer-nav__icon-box item-number">
        <ShoppingBasketOutlined className="phone-footer-nav__icon" />
        <span className="item-number__style">14</span>
      </Link>

      {user ? (
        <Fragment>
          <Link to="/me" className="phone-footer-nav__icon-box">
            <PersonOutlineOutlined className="phone-footer-nav__icon" />
          </Link>
          <Link to="/logout" className="phone-footer-nav__link">
            logout
          </Link>
        </Fragment>
      ) : (
        <Link to="/login" className="phone-footer-nav__link">
          login
        </Link>
      )}

      {/* 
      <div className="phone-footer-nav__scrol">
        <ScoreIcon className="phone-footer-nav__scrol__icon" />
        <span className="phone-footer-nav__scrol__level">15</span>
      </div> */}
    </nav>
  );
};

export default PhoneFooterNav;
