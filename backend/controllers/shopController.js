const catchAsync = require('../utilities/catchAsync');
const Shop = require('../models/shopModel');
const Product = require('../models/productModel');
const SellerOrders = require('../models/sellerOrderModel');
const Order = require('../models/OrderModel');
const AppError = require('./../utilities/appError');
//*create new Shop by seller itself /api/vi/seller/create-shop

const {
  deleteSingleImageFromStorage,
} = require('../utilities/assestFunctions');
exports.CreateShop = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  shopImage = `${process.env.SERVER_API}/public/${req.file.filename}`;

  const shop = await Shop.create({
    name,
    description,
    shopImage,
    owner: req.user._id,
  });

  res.status(201).json({
    success: true,
    shop,
  });
});

exports.getSellerProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ shop: req.shop.slug });
  res.status(200).json({
    success: true,
    products,
  });
});

exports.sellerUpdateProduct = catchAsync(async (req, res, next) => {
  const productBeforeUpdate = await Product.findById(req.params.productId);

  if (productBeforeUpdate.shop !== req.shop.slug)
    return next(
      new AppError('You Cannot edit product that does not belong to you', 401)
    );
  const updateObj = { ...req.body };
  if (updateObj.specification) {
    updateObj.specification = JSON.parse(req.body.specification);
  }

  if (updateObj.subProducts) {
    updateObj.subProducts = JSON.parse(req.body.subProducts);
  }
  if (req.files) {
    if (req.files.productPictures?.length > 0) {
      deleteImagesFromStorage(productBeforeUpdate.productPictures);
      updateObj.productPictures = takeUrlFormImageFiles(
        req.files.productPictures
      );
    }
    if (req.files.detailsPictures?.length > 0) {
      if (productBeforeUpdate.detailsPictures?.length > 0) {
        deleteImagesFromStorage(productBeforeUpdate.detailsPictures);
      }
      updateObj.detailsPictures = takeUrlFormImageFiles(
        req.files.detailsPictures
      );
    }

    if (req.files.cardPicture) {
      deleteSingleImageFromStorage(productBeforeUpdate.cardPicture);
      updateObj.cardPicture = `${process.env.SERVER_API}/public/${req.files.cardPicture[0].filename}`;
    }
  }

  // console.log('updateObj', updateObj);
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    { $set: updateObj },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: updatedProduct,
  });
});

exports.sellerDeleteProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  if (product.shop !== req.shop.slug)
    return next(
      new AppError('You Cannot delete product that does not belong to you', 401)
    );
  if (!product) return next(new AppError('Product not found', 404));

  if (product.detailsPictures?.length > 0) {
    deleteImagesFromStorage(product.detailsPictures);
  }

  if (product.productPictures?.length > 0) {
    deleteImagesFromStorage(product.productPictures);
  }
  if (product.cardPicture) {
    deleteSingleImageFromStorage(product.cardPicture);
  }

  res.status(204).json({
    success: true,
  });
});

exports.getSellerInfo = catchAsync(async (req, res, next) => {
  let shop;
  if (!req.shop) {
    shop = await Shop.create({
      name: 'NoName',
      description: 'No description',
      owner: req.user._id,
    });
  } else {
    shop = await Shop.findById(req.shop._id).populate('owner', 'name email');
  }

  res.status(200).json({
    success: true,
    shop,
  });
});

exports.sellerGetOrders = catchAsync(async (req, res, next) => {
  const orders = await SellerOrders.find({ shop: req.shop.slug }).sort({
    _id: -1,
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getOrderAndTurnNotifications = catchAsync(async (req, res, next) => {
  const order = await SellerOrders.findById(req.params.orderId).populate(
    'productId',
    'name cardPicture'
  );
  if (!order || order.shop !== req.shop.slug)
    return next(
      new AppError('There is no Order with That Id belong to you', 400)
    );

  if (order.notification) {
    order.notification = false;
    await order.save();
  }
  res.status(200).json({
    success: true,
    order,
  });
});

exports.sellerUpdateOrderStatus = catchAsync(async (req, res, next) => {
  const sellerOrder = await SellerOrders.findByIdAndUpdate(
    req.params.orderId,
    req.body
  );

  const updateOrder = await Order.updateOne(
    { _id: sellerOrder.userOrdersId },
    {
      $set: {
        'items.$[elemX].itemStatus': req.body.itemStatus,
      },
    },
    {
      arrayFilters: [
        {
          'elemX._id': req.params.orderId,
        },
      ],
    }
  );

  const product = await Product.findById(sellerOrder.productId);
  console.log('found Prod', product);
  product.quantity = product.quantity - sellerOrder.purchasedQty;

  if (product.subProducts.model.length > 0) {
    const specific = sellerOrder.specific;

    product.subProducts.model.forEach((sub) => {
      if (sub.name === specific) {
        sub.subNumInStock = sub.subNumInStock - sellerOrder.purchasedQty;
        console.log('inside second IF', sub.name);
      }
    });
  }

  await product.save().catch((err) => console.log(err));

  console.log('after update', product);
  res.status(200).json({
    success: true,
    sellerOrder,
    updateOrder,
    product,
  });
});

exports.updateShop = catchAsync(async (req, res, next) => {
  let update = {};

  console.log('req', req);
  if (req.file) {
    console.log('req', req.file);
    const shopBeforeUpdate = await Shop.findById(req.shop._id);
    deleteSingleImageFromStorage(shopBeforeUpdate.shopImage);
    update.shopImage = `${process.env.SERVER_API}/public/${req.file.filename}`;
  }
  if (req.body.description) {
    update.description = req.body.description;
  }
  if (req.body.name) {
    update.name = req.body.name;
    update.slug = req.body.name.toLowerCase();
  }
  const shop = await Shop.findByIdAndUpdate(
    req.shop._id,
    { $set: update },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    shop,
  });
});
