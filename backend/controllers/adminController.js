const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');
const Category = require('./../models/categoryModel');
const axios = require('axios');
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

exports.getCurrency = catchAsync(async (req, res, next) => {
  const { data } = await axios.get(
    `https://free.currconv.com/api/v7/convert?q=USD_IQD&compact=ultra&apiKey=201ab253b42cc8a1d101`
  );

  // console.log('iQToUS', iQToUS);
  res.status(200).json({
    message: 'he',
    data,
  });
});
