const express = require('express');
const router = express.Router();
const {
  testComingCart,
  getMyCartItems,
  removeItemFromCart,
  decreaseQty,
} = require('../controllers/cartController');
//const { requireSignIn } = require('../controllers/authController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');

//router.post('/user/cart/additem', isAuthenticatedUser, addItemToCart);
router.get('/user/cart/getcartitem', isAuthenticatedUser, getMyCartItems);
router.post('/user/cart/test', isAuthenticatedUser, testComingCart);
router.put('/user/cart/delete-one', isAuthenticatedUser, removeItemFromCart);
router.put('/user/cart/decrease', isAuthenticatedUser, decreaseQty);

module.exports = router;
