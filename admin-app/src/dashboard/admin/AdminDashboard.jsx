import React, { useState, useEffect, Fragment } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
//import { isAuthenticated } from './helperCourse';
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "./pages/Sidebar";

//import DashHome from './pages/DashHome';
import "./admin-dashboard.scss";

const AdminDashboard = () => {
  return (
    <Fragment>
      <div className="board-container">
        <Sidebar />
        {/* <DashHome /> */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
