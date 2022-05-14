import React, { Fragment } from "react";
import "./styles/homeFeatures.scss";

import HomeCategory from "../homeFeatures/HomeCategory";
import HomeAds from "./HomeAds";
import HomeStores from "./HomeStores";
const HomeFeatures = () => {
  return (
    <Fragment>
      <div className="feature">
        <HomeCategory />
        <HomeAds />
        <HomeStores />
      </div>
    </Fragment>
  );
};

export default HomeFeatures;
