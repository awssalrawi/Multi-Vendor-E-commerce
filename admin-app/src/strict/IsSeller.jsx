import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
//import { isAuthenticated } from './helperCourse';
import { useSelector } from "react-redux";
import Login from "../components/auth/Login";

const IsSeller = () => {
  const [seller, setSeller] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      if (user.role === "seller" || user.role === "admin") {
        setSeller(true);
      } else {
        setSeller(false);
      }
      console.log("I rendered inside is seller ", user.role);
    }
  }, [isAuthenticated]);

  return user && isAuthenticated && seller ? <Outlet /> : <Login />;
};

export default IsSeller;
