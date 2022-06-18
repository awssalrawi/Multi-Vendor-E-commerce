const express = require('express');
const router = express.Router();
const { initialData, getCurrency } = require('../controllers/adminController');

router.get('/initialdata', initialData);

module.exports = router;

router.get('/currency', getCurrency);
