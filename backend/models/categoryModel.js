const mongoose = require('mongoose');
const slugify = require('slugify');
const categorySchema = new mongoose.Schema(
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
    showType: { type: String },
    parentId: { type: String },
    categoryImage: { type: String },
  },

  { timestamps: true }
);

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});
// categorySchema.pre('update', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   console.log('hhhhwwqqq', this.slug);
//   next();
// });
module.exports = mongoose.model('Category', categorySchema);
