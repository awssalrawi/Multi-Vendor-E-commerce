const catchAsync = require('../utilities/catchAsync');
const Shop = require('../models/shopModel');
//*create new Shop by seller itself /api/vi/seller/create-shop
exports.CreateShop = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  const shopImage = req.file.filename;

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
