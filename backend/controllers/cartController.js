const catchAsync = require('../utilities/catchAsync');
const Cart = require('../models/cartModel');

exports.addItemToCart = catchAsync(async (req, res, next) => {
  console.log('req', req.body.cartItems.product.toString());
  // const isItemExists = await Cart.findOne({cartItems.product===req.cartItems.product})
  let addedItems;
  const isCartExists = await Cart.findOne({ user: req.user._id });
  if (isCartExists) {
    const isItemAlreadyAdded = isCartExists.cartItems.find(
      (cartItem) =>
        cartItem.product.toString() === req.body.cartItems.product.toString()
    );

    if (isItemAlreadyAdded) {
      console.log('inside second if');
      addedItems = await Cart.findOneAndUpdate(
        {
          user: req.user._id,
          'cartItems.product': req.body.cartItems.product,
        },
        {
          $set: {
            'cartItems.$': {
              ...req.body.cartItems,
              quantity:
                isItemAlreadyAdded.quantity * 1 + req.body.cartItems.quantity,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      addedItems = await Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            cartItems: req.body.cartItems,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  } else {
    const cartItems = [req.body.cartItems];
    addedItems = await Cart.create({ user: req.user._id, cartItems });
    console.log('Iam inside else');
  }

  res.status(201).json({
    message: 'card',
    data: addedItems,
    // data: addedItems,
  });
});
