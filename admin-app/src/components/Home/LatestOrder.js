import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const LatestOrder = () => {
  const { loading, orders } = useSelector((state) => state.shop);
  const { t } = useTranslation();
  const showDate = (date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Fragment>
      {loading ? (
        <span>Wait</span>
      ) : (
        <div className="card-body">
          <h5 className="card-title">{t("Latest_orders")}</h5>
          <div className="table-responsive">
            <table className="table">
              <tbody>
                {orders.length > 0 &&
                  orders.map((order, index) => (
                    <Fragment key={index}>
                      {index <= 5 && (
                        <tr>
                          <td>
                            <b>{t("Customer")}</b>
                          </td>
                          <td>{order.address.receiver}</td>
                          <td>{`${order.purchasedQty}x${order.payedPrice} ${order.payedCurrency}`}</td>
                          <td>
                            <span className="badge rounded-pill alert-success">
                              {showDate(order.createdAt)}
                            </span>
                          </td>

                          <td className="d-flex justify-content-end align-item-center">
                            <Link
                              to={`/seller-orders/${order._id}`}
                              className="text-success"
                            >
                              <i className="fas fa-eye"></i>
                            </Link>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}

                {/* Not Paid */}
                {/* <tr>
                  <td>
                    <b>User</b>
                  </td>
                  <td>user@example.com</td>
                  <td>$345</td>
                  <td>
                    <span className="badge rounded-pill alert-danger">
                      Created At Today at 10:13 AM
                    </span>
                  </td>
                  <td>Today at 10:13 AM</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LatestOrder;
