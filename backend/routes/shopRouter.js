const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const {
  restrictTo,
  isAuthenticatedUser,
} = require('../utilities/authMiddlewares');

const { CreateShop } = require('../controllers/shopController');
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
router.use(isAuthenticatedUser, restrictTo('admin', 'seller'));

router.post('/create-shop', upload.single('shopImage'), CreateShop);

module.exports = router;
