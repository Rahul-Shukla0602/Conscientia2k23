// const User = require('../models/User')
const Event = require('../models/Event')
const Participant = require('../models/Participant')


exports.registerEvent = async (req,res)=>{
    try{
        const {name,college,collegeId,teamName,phone,email,aadhar} = req.body;
        const eventId = req.body.eventId
        // const teamMembers = req.body.teamMembers ? JSON.parse(req.body.teamMembers) : [] ;
        // const teamMembers = JSON.parse(req.body.teamMembers)|| req.body.teamMembers;
        const teamMembers = req.body.teamMembers;
        if(!eventId || !name || !college || !collegeId || !phone
            || !aadhar || !email){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }
        const validatedTeamMembers = 
        teamMembers.map(member => {
            const {
                name,
                phone,
                email,
                aadhar
            } = member;
            return {
                name: name ? name.trim() : '',
                phone: phone ? phone.trim() : '',
                email: email ? email.trim() : '',
                aadhar: aadhar ? aadhar.trim() : ''
            };
        });
        const ParticipantData = {
            name: name.trim(),
            college: college.trim(),
            collegeId: collegeId.trim(),
            teamName: teamName ? teamName.trim() : '',
            teamMembers: validatedTeamMembers || [],
            paymentStatus: "NonPaid",
            phone: phone.trim(),
            email: email.trim(),
            aadhar: aadhar.trim(),
            paymentID: ''
        }
        console.log("data dekhte hai",ParticipantData)
        const ParticipantDetail = await Participant.create(ParticipantData)

        await Event.findByIdAndUpdate(
            {_id:eventId},
            {
                $push:{
                    TeamDetails:ParticipantDetail._id
                }
            },
            {new:true}
        ).populate({path:"TeamDetails"})
        return res.json({
            success:true,
            message:'Register Created Successfully',
            data:ParticipantDetail
        })

    } catch(error){
            console.log("problem in Registering event",error)
            return res.status(500).json({
            success:false,
            message:"Failed to add participants in the Event",
        });
    }
}

exports.editTeamDetails = async (req,res)=>{
    try{
        const {TeamId,teamMembers,...updates} = req.body;
        console.log("DD: ",req.body)
        const parsedTeamMembers = JSON.parse(teamMembers || "[]");
        if (!TeamId || !updates) {
            return res.status(404).json({
                success:false,
                message: "TeamId and updates object are required"
        })}
        const Team = await Participant.findById(TeamId);
        Team.teamMembers = parsedTeamMembers
        if (!Team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }
        Team.paymentID = req.body.paymentID;
        await Team.save();
        const allowedFields = ["name", "college", "collegeId", "teamName", "teamMembers","paymentID",
        "paymentStatus", "phone", "email", "aadhar"];
        for (const key in updates) {
            if (updates.hasOwnProperty(key) && allowedFields.includes(key)) {
                Team[key] = updates[key]
            }
        }

        const updatedTeam = await Team.save();  
        console.log("u:::",updatedTeam);
        res.json({
        success: true,
        message: "Team updated successfully",
        data: updatedTeam,
        })
    } catch(error){
        console.error("Error updating team:", error.message);
        res.status(500).json({
            success: false,
            message: "NOT UPDATED",
            // error: error.message,
        })
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
  