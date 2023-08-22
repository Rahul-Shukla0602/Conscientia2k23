const {saveAccomodation, initPayment, verifyPayment} = require('../controllers/Accomodation')
const express = require('express')
const router = express.Router()

router.post('/saveaccomodation',saveAccomodation)
router.post('/initpayment', initPayment)
router.post('/verify', verifyPayment)

module.exports = router