import React, { Fragment, useState, useEffect } from 'react';
import './styles/cart-page.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
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
  priceConvert,
  iqdDesign,
  priceShow,
} from '../../assests/currencyControl';
import ButtonMat from '../../generalComponent/ButtonMat';
import WaitingDialog from '../utilis/WaitingDialog';
import NameOfPage from '../utilis/NameOfPage';
import Footer from '../layout/Footer';
import PageTitle from '../utilis/PageTitle';
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
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
  const [userPoint, setUserPoint] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      setUserPoint(user?.point || 1);
    } else {
      setUserPoint(1);
    }
  }, [isAuthenticated]);

  const increaseQty = (item) => {
    if (item.cartQuant >= item.inStock) return;

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

    return shopItems;
  };

  const calTotalItemsInCart = (cartItems) => {
    const items = cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0);

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
  // const priceShow = (price, currency) => {
  //   return `${priceConvert(
  //     selectedCurrency,
  //     currency,
  //     price,
  //     currs
  //   ).toLocaleString('en-US')} ${selectedCurrency}`;
  // };
  const stringPrice = (price, currency) => {
    let designedP = price.toLocaleString('en-US');

    return `${price.toLocaleString('en-US')} ${currency}`;
  };
  //*new Price model function
  return (
    <div className="cart-page">
      <PageTitle title="My Cart" />
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
                          {
                            currs.length > 0 &&
                              priceShow(
                                selectedCurrency,
                                item.currency,
                                item.price,
                                currs
                              )
                            // stringPrice(item.price, item.currency)
                          }
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
                لا يوجد اي عناصر في سلتك !
              </span>
              <Link className="no-item-show__link" to="/">
                اضغط هنا لروية منتجات قد تعجبك
              </Link>
            </div>
          )}
        </div>
        {currs.length > 0 && (
          <div className="summary-side">
            <span className="ss-header">{'خلاصة الطلب'}</span>

            <div className="summary-side__row">
              <span className="ss-item-val">
                {cartItems.length > 0 && calTotalItemsInCart(cartItems)}
              </span>
              <span className="ss-item-txt">{' : ألعدد الكلي'}</span>
            </div>
            <div className="summary-side__row">
              <span className="ss-item-val">
                {cartItems.length > 0 &&
                  currs.length > 0 &&
                  stringPrice(calTotalPrice(cartItems), selectedCurrency)}
              </span>
              <span className="ss-item-txt">{' : السعر الكلي'}</span>
            </div>
            <div className="summary-side__row">
              <span className="ss-item-val">{userPoint}</span>
              <span className="ss-item-txt">{' : المستوى'}</span>
            </div>
            <div className="summary-side__row">
              <span className="ss-item-val">
                {cartItems?.length > 0 &&
                  stringPrice(
                    calShippingPrice(cartItems, selectedCurrency),
                    selectedCurrency
                  )}
              </span>
              <span className="ss-item-txt">{' : سعر الشحن'}</span>
            </div>
            <div className="summary-side__row">
              <span className="ss-item-val">
                {cartItems?.length > 0 &&
                  currs.length > 0 &&
                  stringPrice(
                    catTotalDiscount(cartItems, userPoint),
                    selectedCurrency
                  )}
              </span>
              <span className="ss-item-txt">{' : الخصم'}</span>
            </div>
            <hr />
            <div className="summary-side__row">
              <span className="ss-item-val">
                {cartItems?.length > 0 &&
                  currs.length &&
                  stringPrice(
                    calFinalPrice(cartItems, selectedCurrency, userPoint),
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
