const express = require('express');
const router = express.Router();
const {
  updateOrder,
  adminUpdateOrderStatus,
} = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');
const {
  initialData,
  getCurrency,
  setCurrency,
} = require('../controllers/adminController');

router.get('/initialdata', initialData);

module.exports = router;

router.get('/currency', getCurrency);
router.post('/currency/create', setCurrency);
router.post('/order/update', isAuthenticatedUser, adminUpdateOrderStatus);
