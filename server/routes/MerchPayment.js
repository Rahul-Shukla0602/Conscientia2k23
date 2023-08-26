const express = require('express');
const router = express.Router();

const {
    initiateOrder,
    verifyOrder,
    upiorder
} = require('../controllers/MerchPayment')

router.post('/init',initiateOrder)
router.post('/verify',verifyOrder)
router.post('/upipayment',upiorder)

module.exports = router