import React from 'react';
import { Outlet } from 'react-router-dom';
//import { isAuthenticated } from './helperCourse';
import { useSelector } from 'react-redux';
import Login from '../user/Login';

const IfLoggedIn = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isAuth = isAuthenticated;
  // const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Login />;
};

export default IfLoggedIn;
