// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment  ,sendPaymentSuccessEmail} = require("../controllers/Payment")
const { auth, isOrganizer, isParticipant, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth,capturePayment);
router.post("/verifySignature",auth,verifyPayment);
router.post("/sendPaymentSuccessEmail", auth,sendPaymentSuccessEmail);

module.exports = router