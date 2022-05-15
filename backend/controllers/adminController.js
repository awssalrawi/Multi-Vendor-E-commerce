const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');
const Category = require('./../models/categoryModel');

exports.initialData = catchAsync(async (req, res, next) => {
  const categories = await Category.find({});
  const products = await Product.find({})
    .select('category _id name price')
    .populate({
      path: 'category',
      select: '_id name',
    })
    .select('_id name category')
    .populate('category');

  res.status(200).json({
    products,
    categories,
  });
});
