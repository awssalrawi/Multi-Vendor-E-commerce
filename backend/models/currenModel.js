const mongoose = require('mongoose');
const slugify = require('slugify');
const currencySchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      required: [true, 'Please Enter Currency Name'],
    },
    value: {
      type: Number,
      required: [true, 'Please Enter Currency Value'],
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

currencySchema.pre('save', function (next) {
  this.slug = slugify(this.currency, { lower: true });

  next();
});

module.exports = mongoose.model('Currency', currencySchema);
