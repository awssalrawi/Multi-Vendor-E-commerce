import React, { Fragment } from "react";
import FeaturedInfo from "./FeaturedInfo";
import Chart from "./Chart";
import "./styles/dash-home.scss";
// import { userData } from '../../../assests/sampleChartData';
import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";
const DashHome = () => {
  return (
    <Fragment>
      <div className="dash-home">
        {/* <FeaturedInfo /> */}
        {/* <div className="home-chart-view">
          <Chart title="User analytics" data={userData} dataKey="Active User" />
        </div> */}
        <div className="home-widget">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </Fragment>
  );
};

export default DashHome;
