const express = require('express');
const router = express.Router();
// const res = require('express/lib/response');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');
const {
  signupWithEmailAndPassword,
  activateAccountByEmailLink,
  signInWithEmailAndPassword,
  getUserById,
  LogoutUser,
  googleLogin,
  facebookLogin,
  signInSeller,
} = require('../controllers/authController');
const {
  userSignUpValidator,
  userSignInValidator,
  runValidator,
} = require('../utilities/validator');
const {
  getAllUsers,
  getMyProfileData,
} = require('../controllers/userController');
//*Sign up using email and password
router.post(
  '/signup',
  userSignUpValidator,
  runValidator,
  signupWithEmailAndPassword
);

router.post('/active-account', activateAccountByEmailLink);
//*Sign in using email and password
router.post('/signin', signInWithEmailAndPassword);
router.post('/seller/signin', signInSeller);
router.route('/logout').get(LogoutUser);
router.get('/me', isAuthenticatedUser, getMyProfileData);

router.route('/get-all-users').get(isAuthenticatedUser, getAllUsers);

//! google and facebook routes
router.post('/google-login', googleLogin);

router.post('/facebook-login', facebookLogin);

router.route('/:id').get(getUserById);
// router.get('/:id', getUserById);

module.exports = router;
