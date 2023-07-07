const User = require('../models/User')
const OTP = require('../models/OTP')
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender')
const passwordUpdate = require('../mail/Templates/passwordUpdate')
exports.sendotp = async (req,res)=>{
    try{
        //fetch email from body
        const {email} = req.body;
        //check existence of email
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            });
        }
        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false 
        });
        console.log("OTP generated: " ,otp);
        //check otp uniqueness 
        //we will replace with some servies that generate always unique otp
        let result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false 
            });
        }
        const otpPayload = {email,otp};
        //entry in db of otp
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBody",otpBody);
        res.status(200).json({
            success:true,
            message:"OTP send successfully",
            otp,
        });
    } catch(error){
        console.log(error);
        res.status(401).json({
            success:false,
            message:"Error occurred while sending OTP"
        });
    }
}

//// Signup Controller for Registering USers
exports.signup = async (req,res)=>{
    try{
    //data fetch from req body // Destructure fields from the request body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp
    } = req.body;
    // Check if All Details are there or not
    if(!firstName || !lastName ||  !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All field are required"
        });
    }
    //// Check if password and confirm password match
    if(password !== confirmPassword){
        return res.status(403).json({
            success:false,
            message:"Password and confirmPassword does not match,please try again",
        });
    }
    // Check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is alreay registered",
        });
    }
     // Find the most recent OTP for the email
     const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("recentOtp: ",response);
    //validate OTP
    if(response.length===0){
        // OTP not found for the email
        return res.status(400).json({
            success:false,
            message:"OTP not Found",
        });
    }
    else if(otp !== response[0].otp){
        // Invalid OTP
        return res.status(400).json({
            success:false,
            message:"The OTP is not valid,matching issue",
        });
    }
    //Hash passwrod
    const hasdedPassword = await bcrypt.hash(password,10);
    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
        gender:null,
        dataOfBirth:null,
        about:null,
        contactNumber:null
    }); 
    const user = await  User.create({
        firstName,
        lastName,
        email,
        password:hasdedPassword,
        accountType:accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        otp
    })
    //return res
    return res.status(200).json({
        success:true,
        message:"User registered successfully",
        user
    });
    } catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"User can't be registered please try again",
        });

    }
}

//signin login
exports.login = async (req,res)=>{
    try{
         //get data from req body
         const {email,password} = req.body;
         //validattion
         if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field are required"
            });
        }
         //user existence
        const user = await User.findOne({email}).populate("additionalDetails");
         if(!user){
             return res.status(401).json({
                 success:false,
                 message:"User is not registered"
             });
        }
        //token generate jwt after matching password
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id:user._id,
                accountType:user.accountType
            };
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h',
            });
            user.token = user;
            user.password = undefined;
            //create cookie and send 
            const options = {
                expires : new Date(Date.now()+3*24*3600*1000),
                httpOnly:true,  
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged Successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect : try again" 
            })
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failed please try again"
        })
    }
}

//change password
exports.changePassword = async  (req,res)=>{
    try{
        // Get user data from req.user
        const userID = req.user.id;
        const userDetails = await User.findById({userID});
        // Get old password, new password, and confirm new password from req.body
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        // Validate old password
        const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password);
        if(!isPasswordMatch){
            // If old password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({
                success:false,
                message:"The password is incorrect",
            })
        }
        // Match new password and confirm new password
        if(newPassword!==confirmNewPassword){
            // If new password and confirm new password do not match, return a 400 (Bad Request) error
            return res.status(400).json({
                success:false,
                message:"The both password is not same",
            })
        }
        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate({_id:userID},
            {password:encryptedPassword},
            {new:true},
        )
        // Send notification email
        try{
            const emailResponse = await mailSender(
                                          updatedUserDetails.email,
                                          passwordUpdate(
                                          updatedUserDetails.email,
                                          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`)
                                          )
            console.log("Email sent successfully:", emailResponse.response); 

        } catch(error){
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }
		// Return success response
        return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
    }
    catch(error){
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}




