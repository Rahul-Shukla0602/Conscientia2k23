const {instance} = require('../config/razorpay');
const Event = require('../models/Event');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {eventEnrollmentEmail} = require('../mail/Templates/eventEnrollmentEmail');
const {paymentSuccessEmail } =  require('../mail/Templates/paymentSuccessEmail');
const { default: mongoose } = require('mongoose');
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req,res)=>{
    
    const {events} = req.body;
    const {teamId} = req.body;
    const {number} = req.body
    // const userId = req.user.id;

    if(events.length === 0) {
        return res.json({success:false, message:"Please provide EVENT Id"});
    }
    let totalAmount = 0;
    for(const event_id of events) {
        let event;
        try{
            event = await Event.findById(event_id);
            if(!event) {
                return res.status(200).json({success:false, message:"Could not find the event"});
            }
            const uid  = new mongoose.Types.ObjectId(teamId);
            if(event.EnrolledTeams.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            if (event_id === '64c4ebcfb3e4407fb610c3b4') {
                totalAmount += event.fee + (number - 1)*1000;
            } else {
                totalAmount += event.fee;
            }
            
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }
    console.log("Payment options:", options);
    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
        console.log("Payment Response:", paymentResponse); // Add this line to log the payment response
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }
       
};
// verify signature of razorpay and server
exports.verifyPayment  = async (req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const userId = req.user.id;
    const {events} = req.body;
    const {teamId} = req.body;
    console.log('Received data:');
    console.log('razorpay_order_id:', razorpay_order_id);
    console.log('razorpay_payment_id:', razorpay_payment_id);
    console.log('razorpay_signature:', razorpay_signature);
    console.log('userId:', userId);
    console.log('events:', events);
    console.log('teamId:', teamId);
    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !events || !userId ||
        !teamId
        ) {
            console.log("SOMETHING MISSING")
            return res.status(200).json({success:false, message:"Payment Failed"});
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("BODY: ",body)
    console.log("SECERT: ",process.env.RAZORPAY_SECRET)
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
    console.log("exS: ",expectedSignature);
    console.log("razS: ",razorpay_signature);
    console.log("h3")    
        if(expectedSignature === razorpay_signature) {
            console.log("h1")
            const team = await enrollTeam(events,teamId, userId,res);
            console.log("team: ",team)
            console.log("res: ",res)
            console.log("h2")
            return res.status(200).json({success:true, message:"Payment Verified"});  
        }
        console.log("H%")
        return res.status(200).json({success:"false", message:"Payment Failed"});
}
const enrollTeam = async(events,teamId, userId, res) => {

    if(!events || !userId || !teamId) {
        console.log("B1")
        return res.status(400).json({success:false,message:"Please Provide data for Event or teamId or UserId",});
    }

    for(const eventId of events) {
        console.log("B2")
        try{
            console.log("B3")
        const enrolledEvent = await Event.findOneAndUpdate(
            {_id:eventId},
            {$push:{EnrolledTeams:teamId}},
            {new:true},
        )
        console.log("B4")

        if(!enrolledEvent) {
            console.log("B5")
            return res.status(500).json({success:false,message:"Event not Found"});
        }

        //find the student and add the course to their list of enrolledCOurses
        const enrolledTeam = await User.findByIdAndUpdate(userId,
            {$push:{
                events: eventId,
            }},{new:true})
        console.log("B6")    
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrolledTeam.email,
            `Successfully Enrolled into ${enrolledTeam.eventName}`,
            eventEnrollmentEmail(enrolledEvent.eventName, `${enrolledTeam.firstName}`)
        )   
        console.log("B7") 
        console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log("B89") 
            console.log(error);
            console.log("B90") 
            return res.status(500).json({success:false, message:error.message});
        }
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledTeam = await User.findById(userId);
        await mailSender(
            enrolledTeam.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledTeam.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}