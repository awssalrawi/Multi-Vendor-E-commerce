const express = require('express');
const router = express.Router();
const {
  userAddOrder,
  userGetOrder,
} = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');

router.get('/user/order/getorders', isAuthenticatedUser, userGetOrder);
router.post('/user/order/create', isAuthenticatedUser, userAddOrder);

module.exports = router;
