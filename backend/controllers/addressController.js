const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');
const UserAddress = require('../models/addressModel');

exports.addAddress = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { data } = req.body;
  if (!data.address)
    return next(
      new AppError('Please add the requirement fields of address', 400)
    );
  let newAddress;

  if (data.address._id) {
    newAddress = await UserAddress.findOneAndUpdate(
      {
        user: req.user._id,
        'address._id': data.address._id,
      },
      {
        $set: {
          'address.$': data.address,
        },
      }
    );
  } else {
    newAddress = await UserAddress.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          address: data.address,
        },
      },
      { new: true, upsert: true }
    );
  }
  // if user not exist upsert:true will allow to create new document.
  if (!newAddress) return next(new AppError('User Not Found', 401));

  res.status(201).json({
    success: true,
    newAddress,
  });
});

exports.getAddress = catchAsync(async (req, res, next) => {
  const userAddress = await UserAddress.findOne({ user: req.user._id });

  //  if (!userAddress) return next(new AppError('No Address found', 401));

  res.status(200).json({
    userAddress: userAddress ? userAddress : 'no address found',
  });
});

exports.removeAddress = catchAsync(async (req, res, next) => {
  const item = req.body;

  const deletedAddress = await UserAddress.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        address: item,
      },
    },
    { new: true }
  );
  if (!deletedAddress) return next(new AppError('There is no address', 400));
  res.status(200).json({
    success: true,
  });
});
