const Review = require('../models/reviewModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');

exports.adminGetAllReviews = catchAsync(async (req, res, next) => {});
exports.createReview = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = req.user._id;
  const product = req.body.product;
  let review;
  const isThereAlreadyReview = await Review.findOne({ product, user });
  if (isThereAlreadyReview) {
    review = isThereAlreadyReview;
    review.comment = req.body.comment;
    review.rating = req.body.rating;
    await review.save();
    res.status(200).json({ success: true, review });
  } else {
    review = await Review.create({ user: req.user._id, ...req.body });
    res.status(201).json({ success: true, review });
  }
});

exports.getReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({
    user: req.user._id,
  });

  res.status(200).json({ success: true, reviews });
});
