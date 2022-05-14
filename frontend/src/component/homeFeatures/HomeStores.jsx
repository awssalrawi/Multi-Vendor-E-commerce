import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./styles/homeStores.scss";
const HomeStores = () => {
  return (
    <Fragment>
      <div className="stocks-show" id="stocks-show">
        <div className="stock__header">
          <i className="fa-solid fa-shop stock__header__logo"></i>
          <h3 className="stock__header__name">Stores</h3>
        </div>
        <div className="d-flex flex-column  mb-1 ps-5">
          <Link to="#" className="store__hvr">
            <i className="fa-solid fa-store store__icon"></i>
            <span className="store__text">Aws store</span>
          </Link>
          <Link to="#" className="store__hvr">
            <i className="fa-solid fa-store store__icon"></i>
            <span className="store__text">Aws store</span>
          </Link>
          <Link to="#" className="store__hvr">
            <i className="fa-solid fa-store store__icon"></i>
            <span className="store__text">Aws store</span>
          </Link>
          <Link to="#" className="store__hvr">
            <i className="fa-solid fa-store store__icon"></i>
            <span className="store__text">Aws store</span>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeStores;
