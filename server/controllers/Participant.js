// const User = require('../models/User')
const Event = require('../models/Event')
const Participant = require('../models/Participant')


exports.registerEvent = async (req,res)=>{
    try{
        const {eventId, name,college,collegeId,teamName,teamMembers,phone,email,aadhar} = req.body;
        if(!eventId || !name || !college || !collegeId || !teamName || !teamMembers || !phone
            || !aadhar || !email){
                console.log(phone);
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const ParticipantDetail = await Participant.create({
            name,
            college,
            collegeId,
            teamName,
            teamMembers,
            phone,
            email,
            aadhar,
        })
        console.log("PARTICIPANT INPUT: ",Participant)

        const UpdateEvent = await Event.findByIdAndUpdate(
            {_id:eventId},
            {
                $push:{
                    TeamDetails:ParticipantDetail._id
                }
            },
            {new:true}
        )
        console.log("Upadted event: ",UpdateEvent);
        return res.json({
            success:true,
            message:'Register Created Successfully',
            data: Participant
        })

    } catch(error){
            console.log("problem in Registering event")
            return res.status(500).json({
            success:false,
            message:"Failed to create Event",
        });
    }
}


// {
//     "eventId" : "64bf91c97ff45a6ba6de33b5"
//     "name": "John Doe",
//     "college": "ABC College",
//     "collegeId": "12345",
//     "teamName": "Awesome Team",
//     "teamMembers": [
//       {
//         "name": "Jane Smith",
//         "phone": "9876543210",
//         "email": "jane@example.com",
//         "aadhar": "1234 5678 9012"
//       },
//       {
//         "name": "Bob Johnson",
//         "phone": "8765432109",
//         "email": "bob@example.com",
//         "aadhar": "9876 5432 1098"
//       }
//     ],
//     "phone": "1234567890",
//     "email": "john@example.com",
//     "aadhar": "0123 4567 8901"
//   }
  