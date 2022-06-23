import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGetOrder, clearErrors } from '../../redux/actions/orderAction';
import './styles/user-order.scss';
import LoaderSpinner from '../utilis/LoaderSpinner';
import { toast } from 'react-toastify';
const UserOrders = () => {
  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.userOrder);
  useEffect(() => {
    dispatch(userGetOrder());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, []);
  const showDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const showTotalQtyOfOrder = (orders) => {
    return orders.items.reduce((acc, item) => acc + item.purchasedQty, 0);
  };
  return (
    <div className="user-order">
      {loading ? (
        <LoaderSpinner text="Getting Orders" />
      ) : (
        <div className="orders-container">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div className="order-package" key={order._id}>
                <div className="order-package__info">
                  <div className="order-header-box">
                    <span className="order-header-box-title">Data</span>
                    <span className="order-header-box-data">
                      {showDate(order.createdAt)}
                    </span>
                  </div>
                  <div className="order-header-box">
                    <span className="order-header-box-title">Name</span>
                    <span className="order-header-box-data">
                      {order.receiver}
                    </span>
                  </div>
                  <div className="order-header-box">
                    <span className="order-header-box-title">Quantity</span>
                    <span className="order-header-box-data">
                      {showTotalQtyOfOrder(order)}
                    </span>
                  </div>
                  <div className="order-header-box">
                    <span className="order-header-box-title">Total Price</span>
                    <span className="order-header-box-data">
                      {order.totalAmountText}
                    </span>
                  </div>
                  <span className="order-status">{order.orderStatus}</span>
                </div>
                {order.items.length > 0 &&
                  order.items.map((item, index) => (
                    <div className="order-package__content" key={index}>
                      <div className="img-name-box">
                        <img
                          src={item.productId.cardPicture}
                          alt="order"
                          className="img-name-box__image"
                        />
                        <span className="img-name-box__name">
                          {`${item.productId.name}.${
                            item.specific ? item.specific : ''
                          }`}
                        </span>
                      </div>
                      <span className="order-price">{`${item.purchasedQty} x ${item.payedPrice}`}</span>
                      <span className="order-seller">{item.shop}</span>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <span className="show-no-order">There is No Order</span>
          )}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
