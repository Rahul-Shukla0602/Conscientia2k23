const {ContactUs} = require('../controllers/ContactUs')
const express = require("express")
const router = express.Router()

router.post('/contact',ContactUs);

module.exports = router