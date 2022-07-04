import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import { Link } from "react-router-dom";
const MainDash = () => {
  return (
    <div className="MainDash">
      <Link to="/admin">Admin</Link>
      <h1>Dashboard</h1>
      {/* <Cards /> */}
      <Table />
    </div>
  );
};

export default MainDash;
