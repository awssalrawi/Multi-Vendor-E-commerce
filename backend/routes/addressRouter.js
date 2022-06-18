const express = require('express');
const router = express.Router();
const {
  addAddress,
  getAddress,
  removeAddress,
} = require('../controllers/addressController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');

router.post('/user/address/create', isAuthenticatedUser, addAddress);
router.put('/user/address/delete', isAuthenticatedUser, removeAddress);
router.get('/user/address/get', isAuthenticatedUser, getAddress);
module.exports = router;
