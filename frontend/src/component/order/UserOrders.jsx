import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGetOrder, clearErrors } from '../../redux/actions/orderAction';
import './styles/user-order.scss';
import LoaderSpinner from '../utilis/LoaderSpinner';
import { toast } from 'react-toastify';
import ReviewModel from '../utilis/ReviewModel';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TurnedIn } from '@material-ui/icons';
import ButtonMat from '../../generalComponent/ButtonMat';
import { getReview } from '../../redux/actions/reviewAction';
import NameOfPage from '../utilis/NameOfPage';
import Footer from '../layout/Footer';
import PageTitle from '../utilis/PageTitle';
const UserOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const { loading, orders, error } = useSelector((state) => state.userOrder);
  useEffect(() => {
    dispatch(userGetOrder());
    dispatch(getReview());
  }, []);

  // useEffect(() => {

  // }, []);

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

  const findLastStatus = (status) => {
    let last;
    status.forEach((state) => {
      if (state.isCompleted) {
        last = state.type;
      }
    });
    return last;
  };

  const showTotalQtyOfOrder = (orders) => {
    return orders.items.reduce((acc, item) => acc + item.purchasedQty, 0);
  };

  //*Review
  const translateAdminStatus = (status) => {
    let str = 'معلق';
    if (status === 'packed') {
      str = 'تم التعبئة';
    } else if (status === 'shipped') {
      str = 'تم الشحن';
    } else if (status === 'delivered') {
      str = 'تم التوصيل';
    }
    return str;
  };
  const translateSellerStatus = (status) => {
    let str = 'معلق';
    if (status === 'shipped') {
      str = 'تم الشحن';
    } else if (status === 'cancelled') {
      str = 'الغاء';
    } else if (status === 'refund') {
      str = 'اعاده';
    }
    return str;
  };
  //*Review
  return (
    <div className="user-order">
      <PageTitle title="My Orders" />
      <NameOfPage text="ألطلبات الخاصة بي" />
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="orders-container">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div className="order-package" key={order._id}>
                <div className="order-package__info">
                  <div className="order-header-box">
                    <span className="order-header-box-title">{'التاريخ'}</span>
                    <span className="order-header-box-data">
                      {showDate(order.createdAt)}
                    </span>
                  </div>
                  <div className="order-header-box">
                    <span className="order-header-box-title">{'ألاسم'}</span>
                    <span className="order-header-box-data">
                      {order.receiver}
                    </span>
                  </div>
                  <div className="order-header-box">
                    <span className="order-header-box-title">{'العدد'}</span>
                    <span className="order-header-box-data">
                      {showTotalQtyOfOrder(order)}
                    </span>
                  </div>
                  <div className="order-header-box">
                    <span className="order-header-box-title">
                      {'السعر الكلي'}
                    </span>
                    <span className="order-header-box-data">
                      {order.totalAmountText}
                    </span>
                  </div>
                  <span className="order-status">
                    {translateAdminStatus(findLastStatus(order.orderStatus))}
                  </span>
                </div>
                {order.items.length > 0 &&
                  order.items.map((item, index) => (
                    <div className="order-package__content" key={index}>
                      <div className="img-name-box">
                        <img
                          src={
                            item.productId?.cardPicture &&
                            item.productId.cardPicture
                          }
                          alt="order"
                          className="img-name-box__image"
                        />
                        <Link
                          className="img-name-box__name"
                          to={`/product/${item.productId._id}`}
                        >
                          {item.productId?.name &&
                            `${item.productId.name}.${
                              item.specific ? item.specific : ''
                            }`}
                        </Link>
                      </div>
                      <span className="order-price">{`${item.purchasedQty} x ${item.payedPrice} ${item.payedCurrency}`}</span>
                      <Link className="order-seller" to={`/store/${item.shop}`}>
                        {item.shop}
                      </Link>
                      <span
                        className={`order-item-status ${
                          item.itemStatus === 'pending'
                            ? 'pending'
                            : item.itemStatus === 'shipped'
                            ? 'approved'
                            : 'declined'
                        }`}
                      >
                        {translateSellerStatus(item.itemStatus)}
                      </span>
                      {findLastStatus(order.orderStatus) === 'delivered' && (
                        <ReviewModel item={item} />
                      )}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <span className="show-no-order">
              {'لا يوجد اي طلبات في حسابك '}
            </span>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserOrders;
