import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
//import { isAuthenticated } from './helperCourse';
import { useSelector, useDispatch } from "react-redux";

const IsAdmin = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [admin, setAdmin] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log("USER d", user.role);
  //     if (user.role === "admin") {
  //       setAdmin(true);

  //       console.log("I entered here mother fucker");
  //     } else {
  //       setAdmin(false);
  //     }
  //     console.log("I rendered inside is admin ");
  //   }
  // }, []);

  // console.log("user", user);
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("admin", admin);

  return user && user.role === "admin" && isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default IsAdmin;
