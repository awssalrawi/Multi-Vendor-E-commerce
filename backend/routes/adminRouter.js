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
  adminGetAllUsers,
  adminUpdateUser,
  initialDate,
  getInitialLogAds,
} = require('../controllers/adminController');

const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    //  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// router.get('/initialdata', initialData);

router.get('/currency', getCurrency);
router.post('/currency/create', setCurrency);
router.post('/order/update', isAuthenticatedUser, adminUpdateOrderStatus);

// router.use(isAuthenticatedSeller, restrictTo('admin'));
router.get('/admin/get-product', isAuthenticatedSeller, adminGetAllProducts);
router.get('/admin/get-orders', isAuthenticatedSeller, adminGetAllOrders);
router.get(
  '/admin/get-users',
  isAuthenticatedSeller,
  restrictTo('admin'),
  adminGetAllUsers
);
router.get(
  '/admin/get-orders/:orderId',
  isAuthenticatedSeller,
  adminGetOrderDetails
);
router.put(
  '/admin/update-user/:userId',
  isAuthenticatedSeller,
  restrictTo('admin'),
  adminUpdateUser
);
router.get(
  '/admin/getadslogo',
  isAuthenticatedSeller,
  restrictTo('admin'),
  getInitialLogAds
);
router.put(
  '/admin/initial-imgs',
  isAuthenticatedSeller,
  restrictTo('admin'),
  upload.fields([
    { name: 'appLogo', maxCount: 1 },
    { name: 'adsPic', maxCount: 8 },
  ]),
  initialDate
);
module.exports = router;
