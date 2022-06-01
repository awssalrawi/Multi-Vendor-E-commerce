const mongoose = require('mongoose');
// const slugify = require('slugify');
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: Number,
    price: {
      type: Number,
      required: [true, 'product must have a price'],
    },
    quantity: {
      type: Number,
      required: [true, 'product must have a quantity'],
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

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        review: String,
      },
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

    shop: { type: mongoose.Schema.Types.String, ref: 'Shop' },
    updatedAt: Date,

    availableSpecific: [
      {
        _id: false,
        option: String,
        inStockCount: Number,
      },
    ],
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
  },

  { timestamps: true }
);

// productSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
module.exports = mongoose.model('Product', productSchema);
