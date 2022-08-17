import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const TopTotal = () => {
  const { orders } = useSelector((state) => state.shop);
  const { products } = useSelector((state) => state.sellerProduct);
  const { t } = useTranslation();

  const totalSales = (orders) => {
    let totSale = 0;
    orders.forEach((order) => {
      if (order.itemStatus === "shipped") {
        totSale = totSale + order.purchasedQty * order.payedPiceInDollar;
      }
    });
    return totSale.toFixed(2);
  };
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">{t("Total_Sales")}</h6>{" "}
              <span>${orders.length > 0 ? totalSales(orders) : "__"}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">{t("Total_Orders")}</h6>
              <span>{orders?.length}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">{t("Total_Products")}</h6>
              <span>{products.length > 0 ? products.length : "__"}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
