const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');

//* create new product   /api/v1/products/create
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, price, description, category, quantity } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return {
        img: file.filename,
      };
    });
  }

  const newProduct = await Product.create({
    name,
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id,
  });
  res.status(200).json({
    success: true,
    data: newProduct,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: 'Yes I am there', data: req.user });
});
