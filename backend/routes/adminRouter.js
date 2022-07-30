const express = require('express');
const router = express.Router();

const {
  updateOrder,
  adminUpdateOrderStatus,
} = require('../controllers/orderController');
const {
  isAuthenticatedUser,
  isAuthenticatedSeller,
  restrictTo,
} = require('../utilities/authMiddlewares');
const {
  initialData,
  getCurrency,
  setCurrency,
  adminGetAllProducts,
  adminGetAllOrders,
  adminGetOrderDetails,
} = require('../controllers/adminController');

router.get('/initialdata', initialData);

router.get('/currency', getCurrency);
router.post('/currency/create', setCurrency);
router.post('/order/update', isAuthenticatedUser, adminUpdateOrderStatus);

// router.use(isAuthenticatedSeller, restrictTo('admin'));
router.get('/admin/get-product', isAuthenticatedSeller, adminGetAllProducts);
router.get('/admin/get-orders', isAuthenticatedSeller, adminGetAllOrders);
router.get(
  '/admin/get-orders/:orderId',
  isAuthenticatedSeller,
  adminGetOrderDetails
);

module.exports = router;
