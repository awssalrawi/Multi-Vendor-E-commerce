const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const {
  createProduct,
  getAllProducts,
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
  upload.array('productPictures'),
  createProduct
);

router.get('/products/get-all', isAuthenticatedUser, getAllProducts);

module.exports = router;
