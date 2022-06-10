const catchAsync = require('../utilities/catchAsync');
const Cart = require('../models/cartModel');
const AppError = require('./../utilities/appError');
function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}
exports.addItemToCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    let promiseArry = [];
    req.body.cartItem.forEach((cartItem) => {
      const product = cartItem.product;
      const item = cart.cartItems.find((c) => c.product === product);
      let condition, update;
      if (item) {
        condition = { user: req.user._id, 'cartItems.product': product };

        update = {
          $set: {
            'cartItems.$': cartItem,
          },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: cartItem,
          },
        };
      }

      promiseArry.push(runUpdate(condition, update));
    });

    Promise.all(promiseArry)
      .then((response) => res.status(200).json({ response }))
      .catch((err) => res.status(400).json({ err }));
  } else {
    const cartItems = req.body.cartItems;
    addedItems = await Cart.create({ user: req.user._id, cartItems });
    console.log('Iam inside else');
    res.status(201).json({
      message: 'card',
      data: addedItems,
      // data: addedItems,
    });
  }
});

exports.getCartItems = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'cartItems.product',
    '_id,name,price,cardPicture'
  );
  if (!cart)
    return next(
      new AppError('something went wrong when getting your cart items', 401)
    );

  console.log('cart', cart);
  res.status(200).json({
    success: true,
  });
});

exports.testComingCart = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log('data', data);
  const existCart = await Cart.findOne({ user: req.user._id });
  // if (existCart) {
  //   console.log('there is cart');
  // } else {
  //   console.log('no cart');
  //   const cartItems = req.body.cartItems;
  //   addedItems = await Cart.create({ user: req.user._id, cartItems });
  // }

  if (existCart) {
    let promiseArry = [];
    req.body.cartItems.forEach((cartItem) => {
      let item = null;
      const product = cartItem.product;
      const hasSpecific = cartItem.specific ? true : false;
      if (hasSpecific) {
        item = existCart.cartItems.find(
          (c) => c.product === product && c.specific === cartItem.specific
        );
      } else {
        item = existCart.cartItems.find((c) => c.product === product);
      }
      console.log('the null item now is', item);
      let condition, update;
      if (item) {
        condition = { user: req.user._id, 'cartItems.product': product };

        update = {
          $set: {
            'cartItems.$': cartItem,
          },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: cartItem,
          },
        };
      }

      promiseArry.push(runUpdate(condition, update));
    });

    Promise.all(promiseArry)
      .then((response) => res.status(200).json({ response }))
      .catch((err) => res.status(400).json({ err }));
  } else {
    const cartItems = req.body.cartItems;
    addedItems = await Cart.create({ user: req.user._id, cartItems });
    console.log('Iam inside else');
    res.status(201).json({
      message: 'card',
      data: addedItems,
      // data: addedItems,
    });
  }
  // res.status(200).json({
  //   success: true,
  // });
});

// const addItemToCartConditions = (cartItems, cartItemToAdd) => {
//   let existingCartItem;
//   const newItemCheckSpecific = cartItemToAdd?.specific ? true : false;
//   if (newItemCheckSpecific) {
//     existingCartItem = cartItems.find(
//       (cartItem) => cartItem.specific === cartItemToAdd.specific
//     );

//     if (existingCartItem) {
//       return cartItems.map((cartItem) =>
//         cartItem._id === cartItemToAdd._id &&
//         cartItem.specific === cartItemToAdd.specific &&
//         cartItem.cartQuant < cartItem.inStock
//           ? { ...cartItem, cartQuant: cartItem.cartQuant + 1 }
//           : cartItem
//       );
//     }
//     return [...cartItems, { ...cartItemToAdd, cartQuant: 1 }];
//   } else {
//     existingCartItem = cartItems.find(
//       (cartItem) => cartItem._id === cartItemToAdd._id
//     );
//     if (existingCartItem) {
//       console.log('exist', existingCartItem);
//       return cartItems.map((cartItem) =>
//         cartItem._id === cartItemToAdd._id &&
//         cartItem.cartQuant < cartItem.inStock
//           ? { ...cartItem, cartQuant: cartItem.cartQuant + 1 }
//           : cartItem
//       );
//     }

//     return [...cartItems, { ...cartItemToAdd, cartQuant: 1 }];
//   }
// };
//?before frontend

// exports.addItemToCart = catchAsync(async (req, res, next) => {
//   // const isItemExists = await Cart.findOne({cartItems.product===req.cartItems.product})
//   let addedItems;
//   const isCartExists = await Cart.findOne({ user: req.user._id });
//   if (isCartExists) {
//     const isItemAlreadyAdded = isCartExists.cartItems.find(
//       (cartItem) =>
//         cartItem.product.toString() === req.body.cartItems.product.toString()
//     );
//     // const isItemExistsAndHasSubProductAndSameSpecific=

//     if (isItemAlreadyAdded) {
//       console.log('inside second if');

//       addedItems = await Cart.findOneAndUpdate(
//         {
//           user: req.user._id,
//           'cartItems.product': req.body.cartItems.product,
//         },
//         {
//           $set: {
//             'cartItems.$': {
//               ...req.body.cartItems,
//               quantity:
//                 isItemAlreadyAdded.quantity * 1 + req.body.cartItems.quantity,
//             },
//           },
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     } else {
//       addedItems = await Cart.findOneAndUpdate(
//         { user: req.user._id },
//         {
//           $push: {
//             cartItems: req.body.cartItems,
//           },
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     }
//   } else {
//     const cartItems = [req.body.cartItems];
//     addedItems = await Cart.create({ user: req.user._id, cartItems });
//     console.log('Iam inside else');
//   }

//   res.status(201).json({
//     message: 'card',
//     data: addedItems,
//     // data: addedItems,
//   });
// });
