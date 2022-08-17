const mongoose = require('mongoose');
// const slugify = require('slugify');
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, //* 4.6666*10 = 46.666 > 47 /10 >4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'product must have a price'],
    },
    currency: {
      type: String,
      required: true,
    },
    inStockCount: {
      type: Number,
      required: [true, 'product must have a quantity'],
      min: 0,
    },
    description: {
      type: String,
      required: [true, 'product must have a description'],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    productPictures: [
      {
        _id: false,
        img: {
          type: String,
          required: [true, 'product must have images'],
        },
      },
    ],
    detailsPictures: [
      {
        _id: false,
        img: {
          type: String,
        },
      },
    ],
    cardPicture: String,

    specification: [
      {
        _id: false,
        specific: String,
      },
    ],

    shippingPriceInDollar: { type: Number, default: 5 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

    shop: { type: mongoose.Schema.Types.String, ref: 'Shop' },
    location: String,
    updatedAt: Date,

    subProducts: {
      subName: String,
      model: [
        {
          name: String,
          subNumInStock: String,
          subPrice: Number,
        },
      ],
    },
    foundInTurkey: Boolean,
    foundInIraq: Boolean,
    taxes: Number,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  // { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//*Vertual populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product', //*in Review model we have product field,
  localField: '_id',
});
// productSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
module.exports = mongoose.model('Product', productSchema);
