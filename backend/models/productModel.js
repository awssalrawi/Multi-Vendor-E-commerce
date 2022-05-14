const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
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
    offer: {
      type: Number,
    },
    productPictures: [
      {
        img: {
          type: String,
        },
      },
    ],

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        review: String,
      },
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: String,
    updatedAt: Date,
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model('Product', productSchema);
