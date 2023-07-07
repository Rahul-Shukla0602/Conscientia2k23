// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../controllers/Payments")
const { auth, isOrganizer, isParticipant, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth,isParticipant , capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router