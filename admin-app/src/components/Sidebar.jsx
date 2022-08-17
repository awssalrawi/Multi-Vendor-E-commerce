import React from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonMat from "../utilities/button/ButtonMat";
import { ExitToApp } from "@material-ui/icons";

import { logout } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import "../responsive.css";
import { useTranslation } from "react-i18next";
const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div id="offcanvas_aside">
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink activeclassname="active" className="menu-link" to="/">
                <i className="icon fas fa-home"></i>
                <span className="text">{t("Dashboard")}</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/seller-products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">{t("Products")}</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/seller/create-prod"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">{t("Add_product")}</span>
              </NavLink>
            </li>
            {/* <li className="menu-item ">
              <NavLink activeClassName="active" className="menu-link" to="#">
                <i className="icon fas fa-list"></i>
                <span className="text">Categories</span>
              </NavLink>
            </li> */}
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/seller-orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">{t("Orders")}</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li> */}
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/seller-profile"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">{t("My_Shop")}</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="#"
                onClick={() => dispatch(logout())}
              >
                {/* <i className="icon fas fa-usd-circle"></i> */}
                <ExitToApp className="icon" />
                <span className="text">{t("Logout")}</span>
              </NavLink>
            </li>

            {/* <ButtonMat
              className="menu-item"
              name="LogOut"
              icon={<ExitToApp />}
              onClick={() => dispatch(logout())}
            /> */}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
