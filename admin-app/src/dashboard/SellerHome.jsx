import React from "react";
import "./styles/seller-home.scss";
import Sidebar from "../component/sideBar/SideBar";
import MainDash from "../component/MainDash/MainDash";
import RightSide from "../component/RigtSide/RightSide";
const SellerHome = () => {
  return (
    <div className="dash-home">
      <MainDash />
    </div>
  );
};

export default SellerHome;
