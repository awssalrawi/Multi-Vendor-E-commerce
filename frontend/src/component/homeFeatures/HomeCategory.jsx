import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles/homeCategory.scss';
const HomeCategory = () => {
  return (
    <Fragment>
      <div className="category" id="category">
        <div className="category__header">
          <i className="fa-solid fa-bars category__icon"></i>
          <span className="category__name">Categories</span>
        </div>

        <nav className="category__list">
          <ul className="side-nav">
            <li className="side-nav__item">
              <Link to="/test" className="side-nav__link">
                <i className="fa-solid fa-gem"></i>
                <span className="item-name">Accessories</span>
              </Link>
            </li>
            <li className="side-nav__item">
              <Link to="#" className="side-nav__link">
                <i className="fa-solid fa-mars"></i>
                <span className="item-name">Men's fashion</span>
              </Link>
            </li>
            <li className="side-nav__item">
              <Link to="#" className="side-nav__link">
                <i className="fa-solid fa-venus"></i>
                <span className="item-name">Women's fashion</span>
              </Link>
            </li>
            <li className="side-nav__item">
              <Link to="#" className="side-nav__link">
                <i className="fa-solid fa-bag-shopping"></i>
                <span className="item-name">Bags and Shoes</span>
              </Link>
            </li>
            <li className="side-nav__item">
              <Link to="#" className="side-nav__link">
                <i className="fa-solid fa-house-circle-check"></i>
                <span className="item-name">Home stuffs</span>
              </Link>
            </li>
            <li className="side-nav__item">
              <Link to="#" className="side-nav__link">
                <i className="fa-solid fa-bolt"></i>
                <span className="item-name">Electronics</span>
              </Link>
            </li>
            <li className="side-nav__item">
              <Link to="/categories" className="side-nav__link">
                Show all Categories...
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default HomeCategory;
