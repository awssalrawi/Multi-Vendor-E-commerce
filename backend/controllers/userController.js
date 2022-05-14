const catchAsync = require('../utilities/catchAsync');
const User = require('../models/userModel');
const AppError = require('./../utilities/appError');
//* admin route for fetching all users /api/v1/user/get-all-users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  console.log('req.user', req.auth);
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});
//* get My registration information /api/v1/user/me
exports.getMyProfileData = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new AppError('You Have to login first'));

  res.status(200).json({
    success: true,
    user,
  });
});

//*Update user Profile
//*delete user profile
//*update my profile
//* seller role
/**
 *
 *
 *
 *
 * */
