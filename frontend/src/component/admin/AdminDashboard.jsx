import React, { Fragment } from 'react';

import Sidebar from './pages/Sidebar';

//import DashHome from './pages/DashHome';
import './admin-dashboard.scss';
import { Outlet } from 'react-router-dom';

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
