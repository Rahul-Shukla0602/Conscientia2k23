const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender')
const {otpTemplate} = require('../mail/Templates/emailVerificationTemplate')
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 36000,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    }
});

// a function for sending email for varification
async function sendVarificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Varification Email from Consientia",otpTemplate(otp));
        console.log("Email send successfully: ",mailResponse.response);
    } catch(error){
        console.log("Error while sending email: ",error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    console.log("New document saved to database");
    if (this.isNew) {
		await sendVarificationEmail(this.email,this.otp);
	}
    next();
})

module.exports = mongoose.model("OTP",otpSchema);