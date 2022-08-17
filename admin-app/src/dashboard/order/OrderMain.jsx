import React, { Fragment, useEffect, useState } from "react";
import Orders from "./Orders";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import {
  sellerOrders,
  clearMessage,
  clearErrors,
} from "../../redux/actions/orderAction";
import LoaderSpinner from "../../utilities/LoaderSpinner/LoaderSpinner";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PageTitle from "../utilities/PageTitle";
const OrderMain = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { loading, orders, error, message } = useSelector(
    (state) => state.shop
  );
  const showDate = (date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  useEffect(() => {
    dispatch(sellerOrders());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch]);

  const [myOrders, setMyOrders] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  useEffect(() => {
    if (orders.length > 0) {
      setMyOrders(orders);
    }
  }, [orders]);

  const handleSearchFilter = (e) => {
    setSearchStr(e.target.value);
  };
  const filteredOrders = myOrders.filter((or) => or._id.includes(searchStr));
  return (
    <section className="content-main">
      <PageTitle title="Orders" />
      <div className="content-header">
        <h2 className="content-title">{t("Orders")}</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder={`${t("Search")}...`}
                className="form-control p-2"
                onChange={(e) => handleSearchFilter(e)}
              />
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div> */}
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {/* <Orders /> */}
            <Fragment>
              {loading ? (
                <LoaderSpinner />
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">{t("Quantity")}</th>
                      <th scope="col">{t("Single_Price")}</th>
                      <th scope="col">{t("Date")}</th>

                      <th>{t("Status")}</th>
                      <th scope="col" className="text-end">
                        {t("Action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.length > 0 &&
                      filteredOrders.map((order, index) => (
                        <tr
                          key={index}
                          className={order.notification ? "notify-order" : ""}
                        >
                          <td>{order._id}</td>
                          <td>{order.purchasedQty}</td>
                          <td>{order.payedPrice}</td>
                          <td>
                            <span className="badge rounded-pill alert-success">
                              {showDate(order.createdAt)}
                            </span>
                          </td>

                          <td>
                            <span className="badge btn-success">
                              {t(order.itemStatus)}
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
                      ))}
                  </tbody>
                </table>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
