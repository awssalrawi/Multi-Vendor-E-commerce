const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  name: { type: String, required: true, trim: true, min: 3, max: 18 },
  phoneNumber: { type: String, trim: true, required: true, max: 15 },
  pinCode: { type: String, trim: true, default: '+964' },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  street: { type: String },
  addressType: { type: String, enum: ['Home', 'Work'], default: 'Home' },
  addressDetail: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },

  postalCode: { type: String },
  // isPrimary: { type: Boolean },
});

const UserAddressSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: [AddressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserAddress', UserAddressSchema);
