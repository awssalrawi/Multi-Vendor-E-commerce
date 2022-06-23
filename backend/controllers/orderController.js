const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');
const Order = require('../models/OrderModel');
const Cart = require('../models/cartModel');
exports.userAddOrder = catchAsync(async (req, res, next) => {
  console.log('Comming body : ', req.body.order);
  req.body.user = req.user._id;
  const orderData = {
    user: req.user._id,
    ...req.body.order,
  };
  const order = await Order.create(orderData);
  if (order) {
    await Cart.deleteOne({ user: req.user._id });
  }

  res.status(201).json({
    success: true,
    order,
  });
});

exports.userGetOrder = catchAsync(async (req, res, next) => {
  console.log('REQUSER', req.user);
  const order = await Order.find({ user: req.user._id })
    .select(
      '_id paymentStatus items orderStatus createdAt receivedAt receiver totalAmountText'
    )
    .populate('items.productId', '_id name cardPicture');

  if (!order) {
    return next(new AppError('There is no order found', 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
