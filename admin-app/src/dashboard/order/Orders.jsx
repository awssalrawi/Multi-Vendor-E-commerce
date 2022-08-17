import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { sellerOrders } from "../../redux/actions/orderAction";
import LoaderSpinner from "../../utilities/LoaderSpinner/LoaderSpinner";
import { useSelector, useDispatch } from "react-redux";
const Orders = () => {
  const dispatch = useDispatch();

  const { loading, orders } = useSelector((state) => state.shop);
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
  return (
    <Fragment>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Paid</th>

              <th>Status</th>
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.receiver}</td>
                  <td>{order.purchasedQty}</td>
                  <td>{order.payedPrice}</td>
                  <td>
                    <span className="badge rounded-pill alert-success">
                      {showDate(order.createdAt)}
                    </span>
                  </td>

                  <td>
                    <span className="badge btn-success">
                      {order.itemStatus}
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
  );
};

export default Orders;
