const express = require('express');
const router = express.Router();
const {
  addItemToCart,
  getCartItems,
  testComingCart,
} = require('../controllers/cartController');
//const { requireSignIn } = require('../controllers/authController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');

router.post('/user/cart/additem', isAuthenticatedUser, addItemToCart);
router.post('/user/cart/getcartitem', isAuthenticatedUser, getCartItems);
router.post('/user/cart/test', isAuthenticatedUser, testComingCart);
module.exports = router;
