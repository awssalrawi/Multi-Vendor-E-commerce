const catchAsync = require('../utilities/catchAsync');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Shop = require('../models/shopModel');

//* create new product   /api/v1/products/create
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, price, description, category, quantity } = req.body;

  let productPictures = [];
  let detailsPictures = [];
  let cardPicture;
  if (req.files.productPictures.length > 0) {
    productPictures = req.files.productPictures.map((file) => {
      return {
        img: file.filename,
      };
    });
  }

  if (req.files.detailsPictures.length > 0) {
    detailsPictures = req.files.detailsPictures.map((file) => {
      return {
        img: file.filename,
      };
    });
  }
  cardPicture = req.files.cardPicture[0].filename;
  const shop = await Shop.findOne({ owner: req.user._id });
  console.log(shop);
  const newProduct = await Product.create({
    name,
    price,
    description,
    cardPicture,
    productPictures,
    detailsPictures,
    category,
    quantity,

    shop: shop._id,
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
