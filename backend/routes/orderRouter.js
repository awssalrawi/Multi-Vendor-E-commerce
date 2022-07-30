const express = require('express');
const router = express.Router();
const {
  userAddOrder,
  userGetOrder,
  handleNotification,
} = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');
router.post('/subscribe', handleNotification);

router.get('/user/order/getorders', isAuthenticatedUser, userGetOrder);
router.post('/user/order/create', isAuthenticatedUser, userAddOrder);

module.exports = router;
