const mongoose = require('mongoose');
const slugify = require('slugify');
const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Your Shop Must have name!'],
    },
    slug: {
      type: String,
      unique: [true, 'This name already used. Please choose a different name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    shopImage: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orders: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      },
    ],
  },
  { timestamps: true }
);
ShopSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model('Shop', ShopSchema);
