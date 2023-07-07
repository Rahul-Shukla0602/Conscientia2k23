const User = require('../models/User');
const Profile = require('../models/Profile');
// const cron = require("node-cron");
const {imageUploadCloudinary} = require('../utils/imageUpload');
exports.updateProfile = async (req,res)=>{
    try{
        //get Data
        const {gender,dataOfBirth,about,contactNumber} = req.body;
        //get userID
        const userID = req.user.id;

        //find profile and updated profile
        const userDetail = await User.findById(userID);
        const profileID = userDetail.additionalDetails;
        const profileDetail = await Profile.findById(profileID);
        profileDetail.dataOfBirth = dataOfBirth;
        profileDetail.about = about;
        profileDetail.gender = gender;
        profileDetail.contactNumber = contactNumber;
        await profileDetail.save();
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetail,
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"issues in Profile update,try again",
            error:error.message,
        });
    }
}
//TODO: we have to sechudle this deleteProfile task
exports.deleteAccount = async (req,res)=>{
    try{
        const userID = req.user.id;
        console.log("Printing ID: ", req.user.id);
        const userDetail = await User.findById(userID);
        if(!userDetail){
            return res.status(400).json({
                success:false,
                message:"user is not found",
            });
        }
        console.log("userDetail: ",userDetail);
        await Profile.findByIdAndDelete({_id:userDetail.additionalDetails});
        //delete user
        //TODO : to eleminate unentrolled user from entrolled user
        //TODO : sechudle or set a time to execute this job ex: we have to after 3 days
        //TODO : cronjob task in handler
        await User.findByIdAndDelete({_id:userID});
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
            message:error.message,
        });
    }
}
// Schedule task to run every 3 days
// cron.schedule('0 0 */3 * *', async () => {
//     try {
//         // Call the deleteProfile function here
//         await deleteProfile();
//         console.log('User deleted successfully');
//     } catch (error) {
//         console.error('Error deleting user:', error);
//     }
// });
exports.getAllUserDetails = async (req,res)=>{
    try { 
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails);
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            data: userDetails,
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.updateDisplayPicture = async (req,res)=>{
    try{
        const displayPicture = req.files.displayPicture
        console.log("displayPicture: ",displayPicture);
        const userID = req.user.id;
        const image = await imageUploadCloudinary(displayPicture, process.env.FOLDER_NAME,1000,1000);
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userID },
            { image: image.secure_url },
            { new: true }
          )
          res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

exports.getEnrolledEvent = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("events")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.events,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};