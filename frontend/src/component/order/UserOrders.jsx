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
import { Link } from '@material-ui/icons';
import { TurnedIn } from '@material-ui/icons';
import ButtonMat from '../../generalComponent/ButtonMat';
import { getReview } from '../../redux/actions/reviewAction';
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

  //*Review
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
                  <span className="order-status">
                    {findLastStatus(order.orderStatus)}
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
                        <span className="img-name-box__name">
                          {item.productId?.name &&
                            `${item.productId.name}.${
                              item.specific ? item.specific : ''
                            }`}
                        </span>
                      </div>
                      <span className="order-price">{`${item.purchasedQty} x ${item.payedPrice}`}</span>
                      <span className="order-seller">{item.shop}</span>
                      <span
                        className={`order-item-status ${
                          item.itemStatus === 'pending'
                            ? 'pending'
                            : item.itemStatus === 'shipped'
                            ? 'approved'
                            : 'declined'
                        }`}
                      >
                        {item.itemStatus}
                      </span>
                      <ReviewModel
                        // body={
                        //   <div className="md-review">
                        //     <span className="md-review__header">
                        //       set review and get extra point for discount
                        //     </span>
                        //     <div className="rev-product">
                        //       <img
                        //         src={
                        //           item.productId?.cardPicture &&
                        //           item.productId.cardPicture
                        //         }
                        //         alt="order"
                        //         className="rev-product__image"
                        //       />
                        //       <div className="prod-content">
                        //         <span className="prod-content__shop">
                        //           {item.shop}
                        //         </span>
                        //         <span className="prod-content__name">
                        //           {item.productId?.name && item.productId.name}
                        //         </span>
                        //         <div className="rating">
                        //           <Rating
                        //             name="simple-controlled"
                        //             value={value}
                        //             onChange={(event, newValue) => {
                        //               setValue(newValue);
                        //             }}
                        //             size="large"
                        //           />
                        //         </div>
                        //       </div>
                        //     </div>
                        //     <div className="comment">
                        //       <textarea
                        //         name="comment"
                        //         cols="30"
                        //         rows="4"
                        //         placeholder="Review"
                        //         value={comment}
                        //         onChange={(e) => setComment(e.target.value)}
                        //       ></textarea>
                        //     </div>
                        //   </div>
                        // }
                        // // body={successPost()}
                        // submit={
                        //   <div className="submit-review">
                        //     <ButtonMat
                        //       name="Submit"
                        //       icon={<TurnedIn />}
                        //       onClick={() => submitReview(item.productId._id)}
                        //     />
                        //   </div>
                        // }
                        item={item}
                      />
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

const successPost = () => (
  <div className="thanks-post">
    <span>Thankkkyyoouuu</span>
  </div>
);

export default UserOrders;
