import React, { useState } from "react";
import "./side-bar.css";
import Logo from "../../assest/imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../assest/Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import ButtonMat from "../../utilities/button/ButtonMat";
import { ExitToApp } from "@material-ui/icons";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const { shop, loading, orders } = useSelector((state) => state.shop);
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  //console.log(window.innerWidth);

  const getNotifications = (orders) => {
    let count = 0;
    orders.forEach((order) => {
      if (order.notification) {
        count++;
      }
    });
    return count;
  };
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          {/* <img src={Logo} alt="logo" /> */}
          {/* <span>
            Sh<span>o</span>ps
          </span> */}
          <span>Ltreda</span>
        </div>

        <div className="menu">
          <NavLink className="menuItem" to="/">
            Dashboard
          </NavLink>
          <NavLink className="menuItem" to="/seller-orders">
            Orders
            {orders?.length > 0 && (
              <span className="new-order-not">
                {orders?.length > 0 && getNotifications(orders)}
              </span>
            )}
          </NavLink>
          <NavLink className="menuItem" to="/seller-products">
            Products
          </NavLink>
          <NavLink className="menuItem" to="/seller-profile">
            Page Profile
          </NavLink>

          <ButtonMat
            name="LogOut"
            icon={<ExitToApp />}
            onClick={() => dispatch(logout())}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
