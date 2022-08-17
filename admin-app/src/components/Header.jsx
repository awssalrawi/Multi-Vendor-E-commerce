import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getCurrencyConst,
  selectedCurrency,
} from "../redux/actions/currencyAction";
import { logout } from "../redux/actions/authAction";
const Header = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // const [selectCurrency, setSelectCurrency] = useState("IQD");

  // useEffect(() => {
  //   dispatch(selectedCurrency(selectCurrency));
  //   console.log("I called inside appjs currency effect");
  // }, [selectCurrency]);
  // useEffect(() => {
  //   dispatch(getCurrencyConst());
  //   $("[data-trigger]").on("click", function (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     var offcanvas_id = $(this).attr("data-trigger");
  //     $(offcanvas_id).toggleClass("show");
  //   });

  //   $(".btn-aside-minimize").on("click", function () {
  //     if (window.innerWidth < 768) {
  //       $("body").removeClass("aside-mini");
  //       $(".navbar-aside").removeClass("show");
  //     } else {
  //       // minimize sidebar on desktop
  //       $("body").toggleClass("aside-mini");
  //     }
  //   });
  // }, []);
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);
  return (
    <header className="main-header navbar">
      {/* <div className="topHeader">
        <div className="currency-select-container">
          <select
            name="currency"
            id="currency"
            onChange={(e) => setSelectCurrency(e.target.value)}
          >
            <option value="IQD">IQD</option>
            <option value="USD">USD</option>
            <option value="TRY">TRY</option>
          </select>
        </div>
        <div className="language-selector">
          <button className="langBtn" onClick={() => i18n.changeLanguage("tr")}>
            Türkçe
          </button>
          <button className="langBtn" onClick={() => i18n.changeLanguage("ar")}>
            عربي
          </button>
          <button className="langBtn" onClick={() => i18n.changeLanguage("en")}>
            English{" "}
          </button>
        </div>
        <span className="langBtn">{t("hello")}</span>
      </div> */}
      <div className="col-search">
        {/* <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form> */}
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <div className="language-selector">
              <button
                className="btn  mx-2  p-0"
                onClick={() => i18n.changeLanguage("tr")}
                style={{ fontSize: "10px" }}
              >
                Türkçe
              </button>
              <button
                className="btn  mx-2 p-0"
                onClick={() => i18n.changeLanguage("ar")}
                style={{ fontSize: "10px" }}
              >
                عربي
              </button>
              <button
                className="btn  mx-2 p-0"
                onClick={() => i18n.changeLanguage("en")}
                style={{ fontSize: "10px" }}
              >
                English{" "}
              </button>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
            {/* <select
              name="currency"
              id="currency"
              onChange={(e) => setSelectCurrency(e.target.value)}
              className="btn p-0 mx-2"
              style={{ fontSize: "10px" }}
            >
              <option value="IQD">IQD</option>
              <option value="USD">USD</option>
              <option value="TRY">TRY</option>
            </select> */}
            {/* <Link className="nav-link" to="#">
              English
            </Link> */}
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/favicon.ico"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/seller-profile">
                My profile
              </Link>
              {/* <Link className="dropdown-item" to="#"></Link> */}
              <button
                className="dropdown-item text-danger"
                onClick={() => dispatch(logout())}
              >
                Exit
              </button>
              {user && user.role === "admin" && (
                <Link to="/admin" className="dropdown-item">
                  Admin
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
