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
  },
  { timestamps: true }
);
ShopSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model('Shop', ShopSchema);
