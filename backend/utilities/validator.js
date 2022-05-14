const { check, validationResult } = require('express-validator');
//const { checkout } = require('../app');

exports.userSignUpValidator = [
  check('name').not().isEmpty().withMessage('Name is Required'),
  check('email').isEmail().withMessage('Please inter a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
exports.userSignInValidator = [
  check('email').isEmail().withMessage('Please inter a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};
