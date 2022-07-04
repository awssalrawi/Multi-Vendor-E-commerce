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
  createBillPdf,
  // getBillPdf,
} = require('../controllers/adminController');

router.get('/initialdata', initialData);

module.exports = router;

router.get('/currency', getCurrency);
router.post('/currency/create', setCurrency);
router.post('/order/update', isAuthenticatedUser, adminUpdateOrderStatus);

router.use(isAuthenticatedSeller, restrictTo('admin'));
router.get('/admin/get-product', adminGetAllProducts);
router.get('/admin/get-orders', adminGetAllOrders);
router.get('/admin/get-orders/:orderId', adminGetOrderDetails);

router.post('/order/create-pdf', createBillPdf);
// router.get('/order/get-pdf', getBillPdf);
router.get('/order/get-pdf', (req, res) => {
  res.sendFile(`${__dirname}/bill.pdf`);
});
//*Post route PDF-generations

//*get - send pdf to client
