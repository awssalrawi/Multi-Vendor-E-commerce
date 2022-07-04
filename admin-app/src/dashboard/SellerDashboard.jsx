import React from "react";
import "./styles/seller-home.scss";
import Sidebar from "../component/sideBar/SideBar";
import { Outlet } from "react-router-dom";
const SellerDashboard = () => {
  return (
    <div className="dash-menu">
      <div className="menu">
        <Sidebar />
      </div>
      <div className="dash-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboard;
