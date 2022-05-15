const express = require('express');
const router = express.Router();
const { initialData } = require('../controllers/adminController');

router.get('/initialdata', initialData);

module.exports = router;
