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

//* create new product   /api/v1/products/create
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, price, description, category, quantity } = req.body;

  let productPictures = [];
  let detailsPictures = [];
  let cardPicture;
  let specification = [];
  let availableSpecific = [];

  if (req.body.specification) {
    if (req.body.specification.split(',')) {
      const spreatedArr = req.body.specification.split(',');

      specification = spreatedArr.map((item) => {
        return { specific: item.trim() };
      });
    } else {
      specification.push({
        specific: req.body.specification,
      });
    }
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

  cardPicture = `${process.env.SERVER_API}/public/${req.files.cardPicture[0].filename}`;
  const shop = await Shop.findOne({ owner: req.user._id });

  const newProduct = await Product.create({
    name,
    price,
    description,
    cardPicture,
    specification,
    availableSpecific,
    productPictures,
    detailsPictures,
    category,
    quantity,
    shop: shop.slug,
  });

  res.status(201).json({
    success: true,
    data: newProduct,
  });
});

///*                /products/get-all
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//*To Get products by category Name we need slug in category
exports.getProductsBySlug = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug }).select(
    '_id'
  );
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
  const product = await Product.findById(req.params.productId);

  if (!product)
    return next(new AppError('there is no product with this id', 404));

  res.status(200).json({
    success: true,
    product,
  });
});
