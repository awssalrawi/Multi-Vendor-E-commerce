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

//*new google auth
const passport = require('passport');
//*new google auth
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
//*new google auth
// router.get('/login/failed', (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: 'login failure',
//   });
// });

// router.get('/login/success', (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       user: req.user,
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: 'login failure',
//     });
//   }
// });
// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: '/login/failed',
//   })
// );
//*new google auth
router.post('/google-login', googleLogin);

router.post('/facebook-login', facebookLogin);

router.route('/:id').get(getUserById);
// router.get('/:id', getUserById);

module.exports = router;
