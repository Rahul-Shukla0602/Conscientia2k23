const Event = require('../models/Event')
const User = require('../models/User')

const Category = require('../models/Category');
const {imageUploadCloudinary} = require('../utils/imageUpload');
exports.createEvent = async (req,res)=>{
    try{
        let {eventName,eventDescription,eventContent,price,tag,category,instructions,
            status,startDate,endDate,location} = req.body;
        console.log(req.body);
        const thumbnail = req.files.thumbnail;
        if (!thumbnail || !thumbnail.tempFilePath) {
            return res.status(400).json({
              success: false,
              message: "Thumbnail file missing",
            });
          }
        console.log("thumbnail: ",thumbnail)  
          if( !eventContent|| !eventDescription || !eventName || !startDate || !endDate ||
            !location || !price || !category || !thumbnail){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            });
        }
        const userId = req.user.id;
        const organizerDetail = await User.findById(userId,{accountType:"Organizer"})  
        console.log("user: ", organizerDetail);
        if(!organizerDetail){
            return res.status(404).json({
                success:false,
                message:"Instructor not found",
            });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        const categoryDetail = await Category.findById(category);
        if(!categoryDetail){
            return res.status(404).json({
                success:false,
                message:"category not found",
            });
        }
        console.log("cate: ",categoryDetail);
        const thumbnailImage = await imageUploadCloudinary(thumbnail,process.env.FOLDER_NAME);
        if (!thumbnailImage) {
            return res.status(500).json({
              success: false,
              message: "Failed to upload thumbnail image",
            });
        }
        console.log(thumbnailImage);
        console.log("thumbnailImage",thumbnailImage);
        const newEvent = await Event.create({
            eventName,
            eventDescription,
            organizer:organizerDetail._id,
            eventContent,
            price,
            tag:tag,
            instructions,
            status:status,
            startDate,
            endDate,
            location,
            thumbnail:thumbnailImage.secure_url,
            category:categoryDetail._id,
        })
        console.log("Event ",newEvent);
        await User.findByIdAndUpdate(
            {_id:organizerDetail._id},
            {
                $push:{
                    Event:newEvent._id,
                }
            },
            {new:true}
        );
        await Category.findByIdAndUpdate(
            {_id:categoryDetail._id},
            {
                $push:{
                    Event:newEvent._id
                }
            },
            {
                new:true
            }
        )
        return res.json({
            success:true,
            message:'Event Created Successfully',
            data:newEvent
        })
    } catch(error){
        // console.log("problem in creating event")
        return res.status(500).json({
            success:false,
            message:"Failed to create Event",
        });
    }
}

exports.getAllEvents = async (req,res)=>{
    try{
        const allEvent = await Event.find({},
            {
            eventName:true,
            eventDescription:true,
            Organizer:true,
            eventContent:true,
            price:true,
            tag:true,
            category:true,
            participantEnrolled:true,
            instructions:true,
            status:true,
            startDate:true,
            endDate:true,
            location:true,
            views:true,
            category:true,
            }).populate('organizer').exec();
            return res.json({
                success:true,
                message:'we get all events Successfully',
                allEvent
            })
    } catch(error){
        console.log("problem in getting all events")
        return res.status(500).json({
            success:false,
            message:"Failed to get all Events",
        });
    }
}
exports.getEventByID = async (req,res)=>{
    try{
        const {Event_id} = req.body;
        if(!Event_id){
            return res.status(404).json({
                success:false,
                message:"Event id is not available",
            });
        }
        const eventDetail = await Event.findById({_id:Event_id}).populate(
            {
                path:'organizer',
                populate:{
                    path:'additionalDetails'
                }
            }
        ).populate(
            "category"
        ).populate(
            'participantEnrolled'
        ).exec();
        if(!eventDetail){
            return res.status(404).json({
                success:false,
                message:`eventDetail of ${Event_id} not found`,
            });
        }
        return res.json({
            success: true,
            message: "Successfully fetched event",
            data: eventDetail,
          });
    } catch(error){
        console.log("problem in getting event")
        return res.status(500).json({
            success:false,
            message:"Failed to get Event",
        });
    }
}