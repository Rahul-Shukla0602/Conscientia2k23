const express = require('express');
const router = express.Router();

const {
    initiateOrder,
    verifyOrder
} = require('../controllers/MerchPayment')

router.post('/init',initiateOrder)
router.post('/verify',verifyOrder)

module.exports = router