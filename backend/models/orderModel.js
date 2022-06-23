const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please sign in first'],
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserAddress',
      required: true,
    },
    totalAmountInDollar: {
      type: Number,
      required: true,
    },
    receiver: { type: String, required: true },
    totalAmountText: { type: String, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        payedPrice: { type: String, required: true },
        purchasedQty: { type: Number, required: true },
        payedCurrency: { type: String, required: true },
        shop: { type: mongoose.Schema.Types.String, ref: 'Shop' },
        specific: String,
        payedPiceInDollar: Number,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['Not Paid yet', 'Paid', 'Cancelled', 'Refund'],
      default: 'Not Paid yet',
    },
    orderStatus: {
      type: String,
      default: 'pending',
      enum: ['pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
    receivedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
