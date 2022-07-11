import React from "react";
import "./styles/seller-home.scss";
// import Sidebar from "../component/sideBar/SideBarx";
import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const SellerDashboard = () => {
  return (
    <>
      <SideBar />
      <main className="main-wrap">
        <Header />
        <Outlet />
      </main>
    </>
  );
};

// const SellerDashboard = () => {
//   return (
//     <div className="dash-menu">
//       <div className="menu">
//         <Sidebar />
//       </div>
//       <div className="dash-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };
export default SellerDashboard;
