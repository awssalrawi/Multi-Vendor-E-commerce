import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useTranslation } from "react-i18next";
import PageTitle from "../../dashboard/utilities/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/authAction";

const Main = () => {
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shop);
  const { error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [error, dispatch]);
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
