const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Shop = require('../models/shopModel');
const AppError = require('./../utilities/appError');

const {
  deleteImagesFromStorage,
  deleteSingleImageFromStorage,
  takeUrlFormImageFiles,
} = require('../utilities/assestFunctions');

const APIFeatures = require('../utilities/apiFeatures');
//* create new product   /api/v1/products/create
exports.createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    price,
    description,
    category,
    inStockCount,
    currency,
    foundInTurkey,
    foundInIraq,
  } = req.body;
  let subProducts = {};
  let productPictures = [];
  let detailsPictures = [];
  let cardPicture;
  let specification = [];
  let availableSpecific = [];

  if (req.body.specification) {
    specification = JSON.parse(req.body.specification);
  }

  if (req.body.availableSpecific) {
    const splitToArray = req.body.availableSpecific.split(',');
    availableSpecific = splitToArray.map((c) => ({
      option: c.split('-')[0].trim(),
      inStockCount: parseInt(c.split('-')[1].trim()),
    }));
  }

  if (req.files.productPictures?.length > 0) {
    productPictures = takeUrlFormImageFiles(req.files.productPictures);
  }

  if (req.files.detailsPictures?.length > 0) {
    detailsPictures = takeUrlFormImageFiles(req.files.detailsPictures);
  }
  if (req.body.subProducts) {
    subProducts = JSON.parse(req.body.subProducts);
    subProducts.model.forEach((item) => {
      if (!item.name || !item.subNumInStock || !item.subPrice)
        return next(
          new AppError('Enter Sub Product Correctly or delete it', 400)
        );
    });
  }

  cardPicture = `${process.env.SERVER_API}/public/${req.files.cardPicture[0].filename}`;
  const shop = await Shop.findOne({ owner: req.user._id });

  const newProduct = await Product.create({
    name,
    price,
    description,
    cardPicture,
    currency,
    foundInIraq,
    foundInTurkey,
    specification,
    availableSpecific,
    productPictures,
    detailsPictures,
    category,
    inStockCount,
    subProducts,
    shop: shop.slug,
  });

  res.status(201).json({
    success: true,
    data: newProduct,
  });
});

//*                /products/get-all
exports.getAllProducts = catchAsync(async (req, res, next) => {
  // const prod = await Product.find();
  // const page = 3;
  const features = new APIFeatures(Product.find(), req.query)
    .search()

    .filter()
    .sort()
    .limitFields()
    .pagination();

  const products = await features.query;
  res.status(200).json({
    success: true,
    result: products.length,
    products,
  });
});

//*To Get products by category Name we need slug in category
exports.getProductsBySlug = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({
    slug: req.params.slug,
  }).select('name');

  const products = await Product.find({ category: category._id });

  res.status(200).json({
    products,
    productsByPrice: {
      under5k: products.filter((product) => product.price <= 5000),
      under10k: products.filter(
        (product) => product.price > 5000 && product.price <= 10000
      ),
    },
  });
});

//*Get Store page with its own product
exports.getShopAndItsProduct = catchAsync(async (req, res, next) => {
  console.log('params', req.params);
  const shop = await Shop.findOne({ slug: req.params.slug }).select(
    '_id shopImage'
  );
  const products = await Product.find({ shop: req.params.slug });

  res.status(200).json({
    success: true,
    info: {
      shop,
      products,
    },
  });
});
//*delete product by id /api/v1/products/id
exports.deleteProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

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

exports.updateProductById = catchAsync(async (req, res, next) => {
  const updateObj = { ...req.body };
  if (updateObj.specification) {
    updateObj.specification = JSON.parse(req.body.specification);
  }

  if (updateObj.subProducts) {
    updateObj.subProducts = JSON.parse(req.body.subProducts);
  }
  if (req.files) {
    const productBeforeUpdate = await Product.findById(req.params.productId);
    console.log(productBeforeUpdate);
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

exports.getProductDetailsById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate(
    'reviews'
  );

  if (!product)
    return next(new AppError('there is no product with this id', 404));

  res.status(200).json({
    success: true,
    product,
  });
});
