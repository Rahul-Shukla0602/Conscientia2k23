const {instance} = require('../config/razorpay');
const Event = require('../models/Event');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {eventEnrollmentEmail} = require('../mail/Template/eventEnrollmentEmail');
const { default: mongoose } = require('mongoose');
const { json } = require('express');

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req,res)=>{
    try{
        //get courseID and UserID
        const {event_id} = req.body;
        const userID = req.user.id;//from auth
        //validation
        if(!userID){
            return res.status(400).json({
                success:false,
                message:"user is not available",
            });
        }
        if(!event_id){
            return res.status(400).json({
                success:false,
                message:"Please provide courseID",
            });
        }
        let event;
        try{
             event = await Event.findById({event_id});
        if(!event){
            return res.status(400).json({
                success:false,
                message:"event is not available",
            });
        }
        //check user alreay pays for some course
        const uid = new mongoose.Types.ObjectId(userID);
        if(event.participantEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"User alreay entroll in event",
            });
        }
        } catch(error){
            console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
        }
        //order create
        const amount = event.price;
        const currency = 'INR';
        const options = {
            amount: amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                eventid : event_id,
                userID,
            }
        }
        try{
            //initiate payment
            const paymentResponse = await instance.orders.create(options);
            console.log('paymentResponse: ',paymentResponse);
            return res.status(200).json({
                success:true,
                eventName: event.eventName,
                eventDetail:event.eventDescription,
                thumbnail:event.thumbnail, 
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
                message:"order created successfully"
            })
        } catch(error){
            console.log(error);
            return res.status(500).json({
            success:false,
            message:"could not initiate order",
        });
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
// verify signature of razorpay and server
exports.verifySignature = async (req,res)=>{
    const webhookSecret = "1234567";
    const signature = req.header["x-razorpay-signature"];
    //TODO: about conversion of webhook
    const shasum = crypto.createHmac("sha56",webhookSecret);
    shasum.update(json.stringify(req.body));
    const digest = shasum.digest("hex");
    if(digest===signature){
        console.log("PAYMENT IS AUTHORIZED");
        const {userID,event_id} = req.body.payload.payment.entity.notes
        try{
            //fullfil the action
            //find event and entrolled 
            const entrolledEvent = await Event.findOneAndUpdate(
                {_id:event_id},
                {$push:{participantEnrolled:userID}},
                {new:true}
            );
            if(!entrolledEvent){
                return res.status(400).json({
                    success:true,
                    message:'Event not found'
                });
            }
            console.log("entrolledEvent",entrolledEvent);
            //find student and add course in his entroll event list
            const entrolledParticipant = await User.findByIdAndUpdate(
                {_id:userID},
                {$push:{event:event_id}},
                {new:true},
            )
            console.log("entrolledParticipant",entrolledParticipant);
            //mail send
            const emailResponse = await mailSender(
                                            entrolledParticipant.email,
                                            "congratulations from Conscientia",
                                            eventEnrollmentEmail(entrolledParticipant.firstName,entrolledEvent.eventName),

            );
            console.log("emailResponse: ",emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature verifiy and event added"
            });
        } catch(error){
            console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Signature is not verifiy"
        });
    }
}
