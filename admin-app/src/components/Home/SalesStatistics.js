import React from "react";
import { useTranslation } from "react-i18next";
import Chart from "./Chart";
const SaleStatistics = ({ shop }) => {
  const { t } = useTranslation();
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">{t("Sale_statistics")}</h5>
          {/* <img
            style={{ width: "100%", height: "350px", objectFit: "contain" }}
            src="/images/static.png"
          /> */}
          <Chart
            filter={shop}
            width="100%"
            height="350px"
            chartId="62f03051-7e96-4686-8fbd-4cfb6b8264bd"
          />
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
