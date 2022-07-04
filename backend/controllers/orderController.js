const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');
const Order = require('../models/OrderModel');
const Cart = require('../models/cartModel');
const Shop = require('../models/shopModel');
const SellerOrders = require('../models/sellerOrderModel');

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Shop.updateOne(condition, updateData)
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

function createSellerOrder(order) {
  return new Promise((resolve, reject) => {
    SellerOrders.create(order)
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.userAddOrder = catchAsync(async (req, res, next) => {
  // console.log('Comming body : ', req.body.order);
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

  console.log('Id that you asking for ', order._id);
  console.log('Array that you asking for ', order);
  let promiseArry = [];
  let createSellerOrders = [];
  order.items.forEach((item) => {
    console.log('item', item.purchasedQty);
    let selorder;

    (selorder = {
      productId: item.productId,
      payedPrice: item.payedPrice,
      purchasedQty: item.purchasedQty,
      payedCurrency: item.payedCurrency,
      shop: item.shop,
      specific: item.specific,
      payedPiceInDollar: item.payedPiceInDollar,
      _id: item._id,
      receiver: req.body.order.receiver,
      userOrdersId: order._id,
    }),
      // promiseArry.push(runUpdate(condition, update));
      createSellerOrders.push(createSellerOrder(selorder));
  });

  // await Promise.all(promiseArry);

  await Promise.all(createSellerOrders);

  res.status(201).json({
    success: true,
    order,
  });
});

exports.userGetOrder = catchAsync(async (req, res, next) => {
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
