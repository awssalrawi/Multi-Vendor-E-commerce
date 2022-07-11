const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');

const {
  createProduct,
  getAllProducts,
  getProductsBySlug,
  deleteProductById,
  updateProductById,
  getProductDetailsById,
  getShopAndItsProduct,
} = require('../controllers/productController');
const {
  restrictTo,
  isAuthenticatedUser,
} = require('../utilities/authMiddlewares');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  '/products/create',
  isAuthenticatedUser,
  upload.fields([
    { name: 'productPictures', maxCount: 8 },
    { name: 'detailsPictures', maxCount: 8 },
    { name: 'cardPicture', maxCount: 1 },
  ]),
  createProduct
);

router.get('/products/get-all', getAllProducts);
router
  .route('/products/:productId')
  .delete(isAuthenticatedUser, deleteProductById)
  .put(
    isAuthenticatedUser,
    upload.fields([
      { name: 'productPictures', maxCount: 8 },
      { name: 'detailsPictures', maxCount: 8 },
      { name: 'cardPicture', maxCount: 1 },
    ]),
    updateProductById
  )
  .get(getProductDetailsById);
router.get('/products-cat/:slug', getProductsBySlug);
router.get('/products-stor/:slug', getShopAndItsProduct);
module.exports = router;
