import React, { Fragment } from 'react';
import './styles/order-success.scss';
import { ReactComponent as SuccessIcon } from './../../assests/check-success.svg';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
const OrderSuccess = () => {
  return (
    <Fragment>
      <div className="order-success">
        <div className="order-success__container">
          <div className="success-png">
            <SuccessIcon />
          </div>
          <div className="success-text">
            <p className="success-text__content">
              {
                'شكرا لاختيارك لنا. لقد تم اخذ طلبك بنجاح . بامكانك رؤية حالة طلبك بلضغط على ايقونه حسابك واختيار طلباتي او '
              }
              {/* Thank you for choosing Ltreda.Your Order has been successfully
            received,You Can,You Get Information about your order By{' '}
            <strong>My Pofile ▶ My Order</strong> Or{' '} */}

              <Link to="/my-orders">اضغط هنا</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default OrderSuccess;
