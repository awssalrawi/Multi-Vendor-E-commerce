import React, { Fragment, useState, useEffect } from 'react';
import './styles/cart-page.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
import {
  Add,
  DeleteOutline,
  OpenInNewOutlined,
  RemoveRounded,
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItemToCart,
  addItemToCart,
  decreaseQtyFormCart,
  getMyCartItems,
} from '../../redux/actions/cartAction';
import {
  designPrice,
  priceConvert,
  iqdDesign,
} from '../../assests/currencyControl';
import ButtonMat from '../../generalComponent/ButtonMat';
import WaitingDialog from '../utilis/WaitingDialog';
import SummaryCart from './SummaryCart';
import NameOfPage from '../utilis/NameOfPage';
import Footer from '../layout/Footer';
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {
    isAuthenticated,
    user: { point },
  } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const { currs, selectedCurrency } = useSelector((state) => state.currency);

  const [processLoading, setProcessLoading] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyCartItems());
    }
  }, [isAuthenticated]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    setProcessLoading(cart.loading);
  }, [cart.loading]);
  const removeItem = (item) => {
    dispatch(removeItemToCart(item));
  };

  const increaseQty = (item) => {
    if (item.cartQuant >= item.inStock) return;
    console.log('items', item.cartQuant > item.inStock);
    dispatch(addItemToCart(item));
  };

  const decreaseQty = (item) => {
    if (item.cartQuant <= 1) return;
    dispatch(decreaseQtyFormCart(item));
  };

  const createSpreadShop = (cartItems) => {
    let shopItems = [];
    cartItems.forEach((item) => {
      !shopItems.includes(item.shop) && (shopItems = [...shopItems, item.shop]);
    });
    console.log('shopItems', shopItems);
    return shopItems;
  };

  const calTotalItemsInCart = (cartItems) => {
    const items = cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0);
    console.log('items', items);
    return items;
  };

  const calTotalPrice = (cartItems) => {
    if (cartItems.length > 0) {
      return cartItems.reduce(
        (acc, item) =>
          acc +
          item.cartQuant *
            priceConvert(selectedCurrency, item.currency, item.price, currs),
        0
      );
    }
    return 0;
  };

  const catTotalDiscount = (cartItems, point) => {
    let totalItems;

    // let point = 0.005;
    if (cartItems.length > 0) {
      totalItems = cartItems.reduce(
        (acc, item) =>
          acc +
          (item.cartQuant *
            priceConvert(selectedCurrency, item.currency, item.price, currs) *
            point) /
            500,
        0
      );
    } else {
      totalItems = 0;
    }
    if (selectedCurrency === 'IQD') {
      return iqdDesign(totalItems);
    }

    return totalItems;
  };
  const calShippingPrice = (cartItems, curSelect) => {
    let shippingPrice = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item, i) => {
        let qty = 1;
        if (item.cartQuant > 1) {
          qty = item.cartQuant / 2;
        }
        shippingPrice =
          shippingPrice +
          (priceConvert(
            selectedCurrency,
            'USD',
            item.shippingPriceInDollar,
            currs
          ) *
            qty) /
            (i + 2);
      });
    } else {
      shippingPrice = priceConvert(selectedCurrency, 'USD', 5, currs);
    }
    if (shippingPrice < priceConvert(selectedCurrency, 'USD', 5, currs))
      shippingPrice = priceConvert(selectedCurrency, 'USD', 5, currs);

    if (curSelect === 'IQD') {
      let mod;
      if (shippingPrice % 250 < 125) {
        mod = 0;
      } else mod = 250;

      return shippingPrice - (shippingPrice % 250) + mod;
    }

    return shippingPrice;
  };
  const calFinalPrice = (cartItems, selCur, point) => {
    return (
      calTotalPrice(cartItems) +
      calShippingPrice(cartItems, selCur) -
      catTotalDiscount(cartItems, point).toFixed(1)
    );
  };

  //*new Price model function
  const priceShow = (price, currency) => {
    return `${priceConvert(
      selectedCurrency,
      currency,
      price,
      currs
    ).toLocaleString('en-US')} ${selectedCurrency}`;
  };
  //*new Price model function
  return (
    <div className="cart-page">
      <WaitingDialog loading={processLoading} />
      {/* <span className="ltpuhead">My Cart Details</span> */}
      <NameOfPage text="عربة التسوق" />
      <div className="cartInfo">
        <div className="items-side">
          {cartItems?.length > 0 ? (
            createSpreadShop(cartItems).map((shop, i) => (
              <div className="cg-shop-container" key={i}>
                <div className="cg-seller-info">
                  <span className="cg-seller-info__text">{shop}</span>
                </div>
                {cartItems.map((item, index) => (
                  <Fragment key={index}>
                    {item.shop === shop && (
                      <div className="cg-item-container">
                        <Link to={`/product/${item._id}`} className="item-info">
                          <figure className="item-info__shape">
                            <img
                              src={item.image}
                              alt="Product"
                              className="item-info__shape-img"
                            />
                          </figure>

                          <div className="item-info__text-container">
                            <span className="iin-name">{item.name}</span>

                            {item.specific && (
                              <span className="iin-specific">
                                {` ${item.specific} : ألاختيار `}
                                {/* {`selected : ${item.specific}`} */}
                              </span>
                            )}
                            <span className="iin-delivered">
                              {item.foundInIraq
                                ? 'مدة الوصول (1-5) يوم'
                                : 'مدة الوصول (5-20) يوم'}
                            </span>
                          </div>
                        </Link>
                        <div className="item-quant">
                          <IconButton
                            className="item-quant__btn"
                            onClick={() => decreaseQty(item)}
                            size="small"
                          >
                            <RemoveRounded className="item-quant__btn-icon" />
                          </IconButton>

                          <span className="value">{item.cartQuant}</span>
                          <IconButton
                            className="item-quant__btn"
                            onClick={() => increaseQty(item)}
                            size="small"
                          >
                            <Add className="item-quant__btn-icon" />
                          </IconButton>
                        </div>
                        <div className="item-price">
                          {currs.length > 0 &&
                            priceShow(item.price, item.currency)}
                        </div>
                        <IconButton
                          className="item-remove"
                          onClick={() => removeItem(item)}
                        >
                          <DeleteOutline className="item-remove-icon" />
                        </IconButton>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            ))
          ) : (
            <div className="no-item-show">
              <span className="no-item-show__text">
                There is no item in your card!!
              </span>
              <Link className="no-item-show__link" to="/">
                Click here to see Product
              </Link>
            </div>
          )}
        </div>
        <div className="summary-side">
          <span className="ss-header">{'خلاصة الطلب'}</span>

          <div className="summary-side__row">
            <span className="ss-item-val">
              {cartItems && calTotalItemsInCart(cartItems)}
            </span>
            <span className="ss-item-txt">{' : ألعدد الكلي'}</span>
          </div>
          <div className="summary-side__row">
            <span className="ss-item-val">
              {cartItems &&
                currs.length > 0 &&
                priceShow(calTotalPrice(cartItems), selectedCurrency)}
            </span>
            <span className="ss-item-txt">{' : السعر الكلي'}</span>
          </div>
          <div className="summary-side__row">
            <span className="ss-item-val">{point}</span>
            <span className="ss-item-txt">{' : المستوى'}</span>
          </div>
          <div className="summary-side__row">
            <span className="ss-item-val">
              {cartItems?.length > 0 &&
                priceShow(
                  calShippingPrice(cartItems, selectedCurrency),
                  selectedCurrency
                )}
            </span>
            <span className="ss-item-txt">{' : سعر الشحن'}</span>
          </div>
          <div className="summary-side__row">
            <span className="ss-item-val">
              {cartItems?.length > 0 &&
                priceShow(catTotalDiscount(cartItems, point), selectedCurrency)}
            </span>
            <span className="ss-item-txt">{' : الخصم'}</span>
          </div>
          <hr />
          <div className="summary-side__row">
            <span className="ss-item-val">
              {cartItems?.length > 0 &&
                priceShow(
                  calFinalPrice(cartItems, selectedCurrency, point),
                  selectedCurrency
                )}
            </span>
            <span className="ss-item-txt">{' : السعر النهائي'}</span>
          </div>
          <div className="summary-side__btn">
            <ButtonMat
              name="اطلب الان"
              icon={<OpenInNewOutlined fontSize="large" />}
              className="ss-mtui-btn"
              onClick={() => navigate('/place-order')}
              disabled={cartItems?.length > 0 ? false : true}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
