// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Product = require('../models/productModel');

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Review can not be empty'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    CreatedAt: {
      type: Date,
      default: Date.now(),
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name picture',
  });
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // });

  next();
});

reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  //console.log(stats);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  //!this points to current review

  this.constructor.calcAverageRating(this.product);
  //! Review.calcAverageRating(this.tour); the problem here is that Review not defined at this point so we need to use this.constructor
});

//! these two function which created at lecture 168 is very important to watch it again
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r);

  next();
});

reviewSchema.pre(/^findOneAnd/, async function () {
  //!this.findOne(); does not work here because the query has already executed
  await this.r.constructor.calcAverageRating(this.r.product);
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
