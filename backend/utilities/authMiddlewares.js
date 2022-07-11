const User = require('./../models/userModel');
const catchAsync = require('./catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./appError');
const Shop = require('../models/shopModel');
//*Checks id user is authenticated or not authenticated

exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError('Please sign in first ', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

exports.isAuthenticatedSeller = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError('Please sign in first ', 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (user.role !== 'seller')
    return next(
      new AppError('You do not have permission to do this action', 401)
    );
  let shop = {};

  let myShop = await Shop.findOne({ owner: user._id });
  if (!myShop) {
    myShop = await Shop.create({
      name: 'noName',
      description: 'No description',
      owner: user._id,
    });
  }

  if (myShop) {
    shop._id = myShop._id;
    shop.slug = myShop.slug;
  }

  req.user = user;
  req.shop = shop;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array

    console.log('roles', roles);
    console.log('req.user', req.user);
    if (!roles.includes(req.user.role)) {
      console.log('İnsşde nexxtttttttttttttttttt');
      return next(
        new AppError('You do not have permission to perform this action', 403)
      ); //403:forbidden
    }
    next();
  };
};

exports.isAuthenticatedSeller = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError('Please sign in first ', 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (user.role !== 'seller' && user.role !== 'admin')
    return next(
      new AppError('You do not have permission to do this action', 401)
    );
  let shop = {};

  let myShop = await Shop.findOne({ owner: user._id });
  if (!myShop) {
    myShop = await Shop.create({
      name: 'noName',
      description: 'No description',
      owner: user._id,
    });
  }

  if (myShop) {
    shop._id = myShop._id;
    shop.slug = myShop.slug;
  }

  req.user = user;
  req.shop = shop;
  next();
});
// exports.mustBeSignedIn = catchAsync(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) {
//     return next(new AppError('Not authorized to access this route', 401));
//   }

//   const decoded = jwt.decode(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);
//   if (!user) return new AppError('No user found. Please Login !', 404);

//   req.user = user;
//   next();
// });
