import React from 'react';
import { Outlet } from 'react-router-dom';
//import { isAuthenticated } from './helperCourse';
import { useSelector } from 'react-redux';
import Login from '../user/Login';

const IsSeller = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isAuth = isAuthenticated;
  const seller = user.role === 'seller' ? true : false;
  return isAuth && seller ? <Outlet /> : <Login />;
};

export default IsSeller;
