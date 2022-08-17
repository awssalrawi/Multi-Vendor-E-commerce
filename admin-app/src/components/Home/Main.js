import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useTranslation } from "react-i18next";
import PageTitle from "../../dashboard/utilities/PageTitle";
import { useSelector } from "react-redux";
const Main = () => {
  const { shop } = useSelector((state) => state.shop);
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title="Dashboard" />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">{t("Dashboard")}</h2>
        </div>
        {/* Top Total */}
        <TopTotal />

        <div className="row">
          {/* STATICS */}
          {Object.keys(shop).length > 0 && (
            <>
              <SaleStatistics shop={shop} />

              <ProductsStatistics shop={shop} />
            </>
          )}
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder />
        </div>
      </section>
    </>
  );
};

export default Main;
