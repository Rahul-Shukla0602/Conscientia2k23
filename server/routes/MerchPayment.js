const express = require('express');
const router = express.Router();

const {
    merchPayment
} = require('../controllers/MerchPayment')

router.get('/',merchPayment)

module.exports = router