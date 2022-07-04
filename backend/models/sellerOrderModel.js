const mongoose = require('mongoose');
const sellerOrdersSchema = new mongoose.Schema(
  {
    _id: false,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    payedPrice: { type: String, required: true },
    purchasedQty: { type: Number, required: true },
    payedCurrency: { type: String, required: true },
    shop: { type: mongoose.Schema.Types.String, ref: 'Shop' },
    specific: String,
    payedPiceInDollar: Number,
    notification: { type: Boolean, default: true },
    receiver: { type: String, required: true },
    itemStatus: {
      type: String,
      default: 'pending',
      enum: ['pending', 'shipped', 'Cancelled', 'Refund'],
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order.items',
      required: true,
    },
    userOrdersId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    //selectedAddress:{type:mongoose.Schema.Types.ObjectId}
  },
  { timestamps: true }
);

module.exports = mongoose.model('SellerOrders', sellerOrdersSchema);
