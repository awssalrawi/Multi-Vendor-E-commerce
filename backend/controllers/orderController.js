const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');
const Order = require('../models/OrderModel');
const Cart = require('../models/cartModel');
exports.userAddOrder = catchAsync(async (req, res, next) => {
  console.log('Comming body : ', req.body.order);
  req.body.user = req.user._id;
  req.body.order.orderStatus = req.body.orderStatus = [
    {
      type: 'ordered',
      date: new Date(),
      isCompleted: true,
    },
    {
      type: 'packed',
      isCompleted: false,
    },
    {
      type: 'shipped',
      isCompleted: false,
    },
    {
      type: 'delivered',
      isCompleted: false,
    },
  ];
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
      '_id paymentStatus items orderStatus createdAt receivedAt receiver totalAmountText addressId'
    )
    .populate('items.productId', '_id name cardPicture')
    .populate('addressId', 'name');

  if (!order) {
    return next(new AppError('There is no order found', 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//*Important

// exports.getOrder = (req, res) => {
//   Order.findOne({ _id: req.body.orderId })
//     .populate("items.productId", "_id name productPictures")
//     .lean()
//     .exec((error, order) => {
//       if (error) return res.status(400).json({ error });
//       if (order) {
//         Address.findOne({
//           user: req.user._id,
//         }).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           order.address = address.address.find(
//             (adr) => adr._id.toString() == order.addressId.toString()
//           );
//           res.status(200).json({
//             order,
//           });
//         });
//       }
//     });
// };

//*Important
// exports.addOrder = (req, res) => {
//   Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
//     if (error) return res.status(400).json({ error });
//     if (result) {
//       req.body.user = req.user._id;
//       req.body.orderStatus = [
//         {
//           type: "ordered",
//           date: new Date(),
//           isCompleted: true,
//         },
//         {
//           type: "packed",
//           isCompleted: false,
//         },
//         {
//           type: "shipped",
//           isCompleted: false,
//         },
//         {
//           type: "delivered",
//           isCompleted: false,
//         },
//       ];
//       const order = new Order(req.body);
//       order.save((error, order) => {
//         if (error) return res.status(400).json({ error });
//         if (order) {
//           res.status(201).json({ order });
//         }
//       });
//     }
//   });
// };
//*Important

exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, 'orderStatus.type': req.body.type },
    {
      $set: {
        'orderStatus.$': [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

// exports.getCustomerOrders = async (req, res) => {
//   const orders = await Order.find({})
//     .populate("items.productId", "name")
//     .exec();
//   res.status(200).json({ orders });
// };

exports.adminUpdateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.updateOne(
    { _id: req.body.orderId, 'orderStatus.type': req.body.type },
    {
      $set: {
        'orderStatus.$': [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  );

  if (!order) return next(new AppError('there is no order with this id', 400));

  res.status(200).json({
    success: true,
    order,
  });
});
