const express = require('express');
const router = express.Router();
const { addItemToCart } = require('../controllers/cartController');
//const { requireSignIn } = require('../controllers/authController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');

router.post('/user/cart/additem', isAuthenticatedUser, addItemToCart);

module.exports = router;
