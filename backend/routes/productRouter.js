const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const {
  createProduct,
  getAllProducts,
  getProductsBySlug,
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
    //  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  '/products/create',
  isAuthenticatedUser,
  upload.fields([
    { name: 'productPictures', maxCount: 5 },
    { name: 'detailsPictures', maxCount: 5 },
    { name: 'cardPicture', maxCount: 1 },
  ]),
  createProduct
);

router.get('/products/get-all', isAuthenticatedUser, getAllProducts);
router.get('/products/:slug', getProductsBySlug);

module.exports = router;
