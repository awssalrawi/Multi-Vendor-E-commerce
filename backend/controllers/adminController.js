const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');
const Category = require('./../models/categoryModel');
const axios = require('axios');
const CronJob = require('node-cron');
const Currency = require('../models/currenModel');
const Order = require('../models/OrderModel');
const UserAddress = require('../models/addressModel');
const { billHtmlTemplate } = require('../utilities/assestFunctions');
const pdf = require('html-pdf');
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
// exports.autoUpdateCurrency = catchAsync(async (req, res, next) => {
//   const scheduledUpdate = CronJob.schedule('*/5 * * * *', async () => {
//     const cur = await Currency.find({});
//     cur.forEach(async (item) => {
//       const { data } = await axios.get(
//         `https://free.currconv.com/api/v7/convert?q=${item.currency}&compact=ultra&apiKey=201ab253b42cc8a1d101`
//       );
//       const newCur = await Currency.findOneAndUpdate(
//         { _id: item._id },
//         { $set: { 'item.value': Object.values(data)[0] } }
//       );
//       console.log('yes Updated', data);

//       console.log(newCur);
//     });
//   });
// });

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

exports.createBillPdf = catchAsync(async (req, res, next) => {
  pdf.create(billHtmlTemplate()).toFile('bill.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

// exports.getBillPdf = catchAsync(async (req, res, next) => {
//   res.sendFile(`${__dirname}/bill.pdf`);
// });
