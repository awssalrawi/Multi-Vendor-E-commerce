import React, { useState, useEffect } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "./Chart";
import { useTranslation } from "react-i18next";
const ProductsStatistics = ({ shop }) => {
  const { t } = useTranslation();
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">{t("Products_statistics")}</h5>

          <Chart
            filter={shop}
            width="100%"
            height="350px"
            chartId="62f04981-e553-461b-8e92-acb8f40f655e"
          />
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
