const express = require('express');
const router = express.Router();
const { createReview, getReview } = require('../controllers/reviewController');
const { isAuthenticatedUser } = require('../utilities/authMiddlewares');
router
  .route('/review')
  .post(isAuthenticatedUser, createReview)
  .get(isAuthenticatedUser, getReview);
module.exports = router;
