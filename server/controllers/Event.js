const Event = require('../models/Event')
const User = require('../models/User')

const Category = require('../models/Category');
const {imageUploadCloudinary} = require('../utils/imageUpload');
exports.createEvent = async (req,res)=>{
    try{
        let {eventName,eventDescription,price,fee,category,instructions, WhatYouWillLearn,eventType, maxParticipant,
            status,startDate,endDate,BrochureLink,PosterLink} = req.body;
        const thumbnail = req.files.thumbnail;
        if (!thumbnail || !thumbnail.tempFilePath) {
            return res.status(400).json({
              success: false,
              message: "Thumbnail file missing",
            });
          } 
          if(!eventDescription || !eventName || !startDate || !endDate || !fee || ! WhatYouWillLearn ||
            !price || !category || !thumbnail || !instructions || !BrochureLink || !PosterLink){
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
                message:"Organizer not found",
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
        console.log("thumbnailImage",thumbnailImage);
        console.log("BEFORE2NEW$: ",status,eventName,eventDescription, WhatYouWillLearn,price,
        fee,organizerDetail._id,instructions,startDate,endDate,thumbnailImage.secure_url,"category",categoryDetail._id
        ,"max: ",maxParticipant, "Type: ",eventType,
        )
        const newEvent = await Event.create({
            eventName,
            eventDescription,
            organizer:organizerDetail._id,
            WhatYouWillLearn,
            price,
            fee,
            eventType,
            maxParticipant,
            instructions,
            status:status,
            startDate,
            endDate,
            thumbnail:thumbnailImage.secure_url,
            category:categoryDetail._id,
            BrochureLink,
            PosterLink
        })
        console.log("BEFORE2NEW1")
        console.log("Event hello mitro",newEvent);
        console.log("BEFORE2NEW2")
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
                    event:newEvent._id
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
            fee:true,
            BrochureLink:true,
            PosterLink:true,
            WhatYouWillLearn:true,
            eventType:true,
            maxParticipant:true,
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
        const {eventId} = req.body;
        if(!eventId){
            return res.status(404).json({
                success:false,
                message:"Event id is not available",
            });
        }
        const eventDetail = await Event.findById({_id:eventId}).populate(
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
                message:`eventDetail of ${eventId} not found`,
            });
        }
        console.log("eventIN: ",eventDetail)
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

exports.editEvent = async (req, res) => {
    try {
      const { eventId } = req.body
      const updates = req.body
      const event = await Event.findById(eventId)
  
      if (!event) {
        return res.status(404).json({ error: "Event not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnail
        const thumbnailImage = await imageUploadCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        event.thumbnail = thumbnail.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            event[key] = JSON.parse(updates[key])
          } else {
            event[key] = updates[key]
          }
        }
      }
  
      await event.save()
  
      const updatedEvent = await Event.findOne({
        _id: eventId,
      })
        .populate({
          path: "organizer",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate({
          path: "eventContent",
        })
        .exec()
  
      res.json({
        success: true,
        message: "Event updated successfully",
        data: updatedEvent,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


  exports.getOrganizerEvents = async (req,res)=>{
    try{
        const organizerId = req.user.id
        const organizerEvents = await Event.find({
            organizer: organizerId,
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: organizerEvents,
          })
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to retrieve organizerEvents courses",
            error: error.message,
        })
    }
}
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body

    // Find the event
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

       const studentEnrolled = event.participantEnrolled
       console.log(studentEnrolled)
       for (const studentId of studentEnrolled){
         await User.findByIdAndUpdate(studentId,{
           $pull: { events: eventId },
         })}
  
    
       // Delete the course
       await Event.findByIdAndDelete(eventId)
       return res.status(200).json({
         success: true,
         message: "Event deleted successfully",
       })  
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
