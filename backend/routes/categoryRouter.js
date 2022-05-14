const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
} = require('./../controllers/categoryController');
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

router.post(
  '/categories/create',
  upload.single('categoryImage'),
  createCategory
);
router.get('/categories/getall', getAllCategories);
router.get('/categories/:categoryId', getCategoryById);

module.exports = router;
