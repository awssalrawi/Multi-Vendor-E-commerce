const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');
const Category = require('./../models/categoryModel');
const axios = require('axios');
const CronJob = require('node-cron');
const Currency = require('../models/currenModel');
const Order = require('../models/OrderModel');
const User = require('../models/userModel');
const APIFeatures = require('../utilities/apiFeatures');
const AppData = require('../models/appDataModel');
// exports.initialData = catchAsync(async (req, res, next) => {
//   const categories = await Category.find({});
//   const products = await Product.find({})
//     .select('category _id name price')
//     .populate({
//       path: 'category',
//       select: '_id name',
//     })
//     .select('_id name category')
//     .populate('category');

//   res.status(200).json({
//     products,
//     categories,
//   });
// });
const {
  deleteImagesFromStorage,
  deleteSingleImageFromStorage,
  takeUrlFormImageFiles,
} = require('../utilities/assestFunctions');

exports.setCurrency = catchAsync(async (req, res, next) => {
  await Currency.create(req.body);

  res.status(201).json({
    message: 'Currency created successfully',
  });
});

exports.getCurrency = catchAsync(async (req, res, next) => {
  const cur = await Currency.find({});
  const appData = await AppData.find({});
  res.status(200).json({
    success: true,
    cur,
    appData,
  });
});

//0 0 * * * every night at midnight
// */5 * * * * evry 5m
// 0 9 * * * every morning
exports.autoUpdateCurrency = () => {
  CronJob.schedule('0 * * * *', async () => {
    try {
      const cur = await Currency.find({});

      cur.forEach(async (item) => {
        const { data } = await axios.get(
          `https://free.currconv.com/api/v7/convert?q=${item.currency}&compact=ultra&apiKey=201ab253b42cc8a1d101`
        );
        const newCur = await Currency.findByIdAndUpdate(
          item._id,
          {
            $set: { value: Object.values(data)[0] },
          },
          { new: true }
        );

        // console.log('item.value', item.value);
        // console.log('Object.values(data)[0]', Object.values(data)[0]);
        // console.log('yes Updated', data);

        // console.log(newCur);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

exports.adminGetAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

exports.adminGetAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .sort({ _id: -1 })
    .populate('user', 'name email');

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.adminGetOrderDetails = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
    .select('-__v')
    .populate('user', 'name email')
    .populate('items.productId', 'name cardPicture');

  res.status(200).json({
    success: true,
    order,
  });
});

exports.adminGetAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});
exports.adminUpdateUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.findByIdAndUpdate(req.params.userId, req.body);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getInitialLogAds = catchAsync(async (req, res, next) => {
  const data = await AppData.findById('62f4140b55aff123f419bdd6');

  res.status(200).json({
    success: true,
    data,
  });
});

exports.initialDate = catchAsync(async (req, res, next) => {
  const data = await AppData.findById('62f4140b55aff123f419bdd6');

  if (req.files.adsPic?.length > 0) {
    if (data.adsPic?.length > 0) {
      deleteImagesFromStorage(data.adsPic);

      console.log('Inter for delete many');
    }

    console.log('finish from delete many');
    data.adsPic = takeUrlFormImageFiles(req.files.adsPic);
  }

  if (req.files.appLogo) {
    deleteSingleImageFromStorage(data.appLogo);
    data.appLogo = `${process.env.SERVER_API}/public/${req.files.appLogo[0].filename}`;
  }

  console.log('complete befroe save');

  await data.save();

  res.status(200).json({
    success: true,
    data,
  });
});
