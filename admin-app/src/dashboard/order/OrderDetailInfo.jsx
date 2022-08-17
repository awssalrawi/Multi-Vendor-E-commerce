import React from "react";
import { useTranslation } from "react-i18next";
const OrderDetailInfo = ({ order }) => {
  const { t } = useTranslation();
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">{t("Customer")}</h6>
            <p className="mb-1">
              {order.address.receiver} <br />
              {/* <a href={`mailto:user@example.com`}>user@example.com</a> */}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">{t("Order_info")}</h6>
            <p className="mb-1 fs-6">
              {t(order.itemStatus)} <br />{" "}
              {`${t("Pay_method")}:${t("On_door")}`}
              {/* Tanzania <br /> Pay method: PayPal */}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">{t("Deliver_to")}</h6>
            <p className="mb-1">{order.address.addressDetail}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
