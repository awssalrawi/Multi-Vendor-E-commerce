import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const OrderDetailProducts = ({ order }) => {
  const { t } = useTranslation();
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>{t("Product")}</th>
          <th style={{ width: "20%" }}>{t("Unit_Price")}</th>
          <th style={{ width: "20%" }}>{t("Quantity")}</th>
          <th style={{ width: "20%" }} className="text-end">
            {t("Total")}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Link className="itemside" to="#">
              <div className="left">
                <img
                  src={order.productId.cardPicture}
                  alt="product"
                  style={{ width: "40px", height: "40px" }}
                  className="img-xs"
                />
              </div>
              <div className="info">{order.productId.name}</div>
            </Link>
          </td>
          <td>{`${order.payedPrice} ${order.payedCurrency}`}</td>
          <td>{order.purchasedQty} </td>
          <td className="text-end">{`${order.payedPrice * order.purchasedQty} ${
            order.payedCurrency
          }`}</td>
        </tr>

        {/* <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>$3,556</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt> <dd>$56,907</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">$2,345</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  <span className="badge rounded-pill alert alert-success text-success">
                    Payment done
                  </span>
                </dd>
              </dl>
            </article>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
