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
import { realPrice, designPrice } from '../../assests/currencyControl';
import ButtonMat from '../../generalComponent/ButtonMat';
import WaitingDialog from '../utilis/WaitingDialog';
const dimi = [
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'dreams',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'dreams',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'marka',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'colins',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'dreams',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'WAQ',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
  {
    name: 'X box series x',
    _id: '6293720327512ce7d31f183e',
    shop: 'Aws',
    image: 'http://localhost:4000/public/izfYDk7HA-71NBQ2a52CL.jpg',
    price: 499.99,
    inStock: 15,
    cartQuant: 3,
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
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
    // (priceText.replace(/\D/g, '') * 1)
    // realPrice(selectedCurrency, currs, ePrice)
    return cartItems.reduce(
      (acc, item) =>
        acc +
        item.cartQuant *
          (realPrice(selectedCurrency, currs, item.price).replace(/\D/g, '') *
            1),
      0
    );
  };

  const catTotalDiscount = (cartItems) => {
    let totalItems;

    let point = 0.005;
    if (cartItems.length > 0) {
      totalItems =
        cartItems.reduce((acc, item) => acc + item.cartQuant * 1, 0) - 1;
    } else {
      totalItems = 0;
    }
    return totalItems * point * 100;
  };

  const calFinalPrice = (cartItems) => {
    return (
      calTotalPrice(cartItems) -
      (calTotalPrice(cartItems) * catTotalDiscount(cartItems)) / 100
    );
  };

  const navigateToCheckout = () => {
    navigate('/place-order');
  };
  return (
    <div className="cart-page">
      <WaitingDialog loading={processLoading} />

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
                                {`selected : ${item.specific}`}
                              </span>
                            )}
                            <span className="iin-delivered">
                              delivered at 5-20 day
                            </span>
                          </div>
                        </Link>
                        <div className="item-quant">
                          <IconButton
                            className="item-quant__btn"
                            onClick={() => decreaseQty(item)}
                          >
                            <RemoveRounded className="item-quant__btn-icon" />
                          </IconButton>

                          <span className="value">{item.cartQuant}</span>
                          <IconButton
                            className="item-quant__btn"
                            onClick={() => increaseQty(item)}
                          >
                            <Add className="item-quant__btn-icon" />
                          </IconButton>
                        </div>
                        <div className="item-price">
                          {realPrice(selectedCurrency, currs, item.price)}
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
                Click here to see Product 🤓🤓🤓
              </Link>
            </div>
          )}
        </div>
        <div className="summary-side">
          <span className="ss-header">Order Summary</span>

          <div className="summary-side__row">
            <span className="ss-item-txt">Total Items:</span>
            <span className="ss-item-val">
              {cartItems && calTotalItemsInCart(cartItems)}
            </span>
          </div>
          <div className="summary-side__row">
            <span className="ss-item-txt">Total Price:</span>
            <span className="ss-item-val">
              {cartItems &&
                `${calTotalPrice(cartItems).toLocaleString(
                  'us-US'
                )} ${selectedCurrency}`}
            </span>
          </div>
          <div className="summary-side__row">
            <span className="ss-item-txt">Discount </span>
            <span className="ss-item-val">
              {cartItems && `${catTotalDiscount(cartItems).toFixed(1)} %`}
            </span>
          </div>
          <hr />
          <div className="summary-side__row">
            <span className="ss-item-txt">Final Price </span>
            <span className="ss-item-val">
              {cartItems &&
                designPrice(selectedCurrency, calFinalPrice(cartItems))}
            </span>
          </div>
          <div className="summary-side__btn">
            <ButtonMat
              name="Place Order"
              icon={<OpenInNewOutlined fontSize="large" />}
              className="ss-mtui-btn"
              onClick={navigateToCheckout}
              disabled={cartItems?.length > 0 ? false : true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
