const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt');
const crypto = require("crypto");

//reset Password Token send mail
exports.resetPasswordToken = async (req,res)=>{
    try{
        //get email from req body
        const {email} = req.body;
        //check user existence
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your email is not registered"
            });
        }
        // create or generate token
        const token = crypto.randomBytes(20).toString("hex");
        console.log("token: ",token);
        //user udated by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email},{
            token:token,
            resetPasswordExpires: Date.now()+3600000,
            new :true
        });
        console.log("updatedDetails",updatedDetails);
        //create url
        const url = `http://localhost:3000/update-password/${token}`;
        //send email containing url
        await mailSender(email,"PASSWORD reset link",`PASSWORD RESET LINK: ${url}`);
        //return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully,please check email and change password",
            token ,
            url
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Somting went wrong while reset password"
        })
    }
}
//reset password change in db
exports.resetPassword = async (req,res)=>{
    try{
        // data fetch
        const {token,password,confirmPassword} = req.body;
        // validation
        if(password!==confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Password and confirmPassword does not match,please try again",
            });
        }
        // get user details from db using token
        const userDetails = await User.findOne({token:token});
        // if no entry --> invalid token
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Your token is invalid"
            });
        }
        // token time check 
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expires,Please generate new Your token",
            });
        }
        // hash password 
        const hashedPassword = await bcrypt.hash(password,10);
        // update password in db
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );
        // return respone
        return res.status(200).json({
            success:true,
            message:"Password Successful"
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Somting went wrong while reset password"
        })
    }
}