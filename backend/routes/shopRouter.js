const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const {
  restrictTo,
  isAuthenticatedUser,
  isAuthenticatedSeller,
} = require('../utilities/authMiddlewares');

const {
  CreateShop,
  getSellerProducts,
  sellerUpdateProduct,
  sellerDeleteProductById,
  getSellerInfo,
  getOrderAndTurnNotifications,
  sellerGetOrders,
  sellerUpdateOrderStatus,
  updateShop,
} = require('../controllers/shopController');
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
router.use(isAuthenticatedSeller, restrictTo('admin', 'seller'));
router.get('/notification-turnoff', getOrderAndTurnNotifications);
router.post('/create-shop', upload.single('shopImage'), CreateShop);

router.put('/update-shop', upload.single('shopImage'), updateShop);

router.get('/products', getSellerProducts);
router
  .route('/products/:productId')
  .put(
    upload.fields([
      { name: 'productPictures', maxCount: 8 },
      { name: 'detailsPictures', maxCount: 8 },
      { name: 'cardPicture', maxCount: 1 },
    ]),
    sellerUpdateProduct
  )
  .delete(sellerDeleteProductById);
router.get('/get-my-data', getSellerInfo);
router.get('/getorders', sellerGetOrders);
router
  .route('/getorder-details/:orderId')
  .get(getOrderAndTurnNotifications)
  .put(sellerUpdateOrderStatus);
module.exports = router;
