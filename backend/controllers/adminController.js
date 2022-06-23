const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');
const Category = require('./../models/categoryModel');
const axios = require('axios');
const CronJob = require('node-cron');
const Currency = require('../models/currenModel');
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
exports.setCurrency = catchAsync(async (req, res, next) => {
  await Currency.create(req.body);

  res.status(201).json({
    message: 'Currency created successfully',
  });
});

exports.getCurrency = catchAsync(async (req, res, next) => {
  const cur = await Currency.find({});
  // console.log('iQToUS', iQToUS);
  res.status(200).json({
    message: 'he',
    cur,
  });
});

//0 0 * * * every night at midnight
exports.autoUpdateCurrency = catchAsync(async (req, res, next) => {
  const scheduledUpdate = CronJob.schedule('0 * * * *', async () => {
    const cur = await Currency.find({});
    cur.forEach(async (item) => {
      const { data } = await axios.get(
        `https://free.currconv.com/api/v7/convert?q=${item.currency}&compact=ultra&apiKey=201ab253b42cc8a1d101`
      );
      await Currency.findByIdAndUpdate(item._id, data);
      console.log('yes Updated', data);
    });
  });
});
