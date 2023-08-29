const Accomodations = require('../models/Accomodation')
const AccomodationPayments = require('../models/AccomodationPayments')
var hmac = require('crypto-js/hmac-sha256')
const { instance } = require('../config/razorpay');
const mailSender = require('../utils/mailSender')
const { accomodationSuccessEmail } = require('../mail/Templates/accomodationSuccessEmail')
const { accomodationPaymentSuccess } = require('../mail/Templates/accomodationPaymentSuccess')

exports.saveAccomodation = async (req, res) => {
    if (req.method === 'POST') {
        let body = req.body;
        let newdetails = body.data.details;
        // console.log(data)
        const saveaccomod = await Accomodations.create({
            totalperson: body.data.totalperson,
            totalcost: body.data.totalcost,
            men: body.data.men,
            women: body.data.women,
            minor: body.data.minor,
            isminorgirl: body.data.isminorgirl,
            guardian: body.data.guardian,
            checkIn: body.data.checkin,
            checkOut: body.data.checkout,
            days: body.data.days,
            details: newdetails,
            user: body.user,
            eventfree: body.eventfree,
            paymentID: body.paymentID,
            paymentStatus: body.paymentStatus,
            paymentMethod: (body.eventfree)?'freebyevent':'upi'
        })

        await mailSender(
            body.user.email,
            `Accomodation Registered`,
            accomodationSuccessEmail(body.user.firstName, saveaccomod)
        )

        return res.status(200).json(JSON.stringify({
            status: 'done'
        }))
    } else {
        return res.status(405).send("Method Not Allowed")
    }
}

exports.initPayment = async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body)
        const { amount, data, user } = req.body;
        const taxAmount = (0.02 * amount);
        let allpayments = await AccomodationPayments.find();
        let receiptid = `Order#${allpayments.length + 1}`
        var options = {
            amount: 100 * (amount + taxAmount),
            currency: "INR",
            receipt: receiptid
        }
        // console.log(options)
        instance.orders.create(options, async function (err, order) {
            console.log(order)
            if (order.amount === 100 * (amount + taxAmount)) {
                const OrderDetail = await AccomodationPayments.create({
                    orderid: order.id,
                    amount: order.amount,
                    amount_paid: order.amount_paid,
                    amount_due: order.amount_due,
                    currency: order.currency,
                    receipt: order.receipt,
                    status: order.status,
                    totalperson: data.totalperson,
                    data: data,
                    paymentreport: {},
                    user: user
                })
                console.log(OrderDetail)
                order.mongoid = OrderDetail._id;
                return res.status(200).json(JSON.stringify(order))
            }
        })
    } else {
        return res.status(405).send("Method not allowed")
    }
}

exports.verifyPayment = async (req, res) => {
    if (req.method === 'POST') {
        console.log("Order is getting verified")
        let { orderstatus, mongoid, response, data, user } = req.body;
        let tosend = {
            status: 0,
            msg: ''
        }
        console.log(orderstatus)
        if (response?.error === undefined) {
            // console.log("HUM VERIFY ho gaye 7 .")
            let doc = await AccomodationPayments.findById(mongoid);
            let generated_signature = hmac(doc.orderid + "|" + response.razorpay_payment_id, process.env.RAZORPAY_SECRET);
            // const body = response?.razorpay_order_id + "|" + response?.razorpay_payment_id;
            // console.log("BODY: ",body)
            // console.log("SECERT: ",process.env.RAZORPAY_SECRET)
            // const expectedSignature = crypto
            //     .createHmac("sha256", process.env.RAZORPAY_SECRET)
            //     .update(body.toString())
            //     .digest("hex");
            console.log("SIGN: " + generated_signature);
            console.log("sign_r:", response?.razorpay_signature);
            if (generated_signature == response?.razorpay_signature) {
                doc.status = 'success';
                doc.paymentreport = response;
                doc.amount_paid = doc.amount_due;
                doc.amount_due = 0;
                await doc.save();
                let newdetails = data.details;
                const saveaccomod = await Accomodations.create({
                    totalperson: data.totalperson,
                    totalcost: data.totalcost,
                    men: data.men,
                    women: data.women,
                    minor: data.minor,
                    isminorgirl: data.isminorgirl,
                    guardian: data.guardian,
                    checkIn: data.checkin,
                    checkOut: data.checkout,
                    days: data.days,
                    details: newdetails,
                    user: user._id,
                    eventfree: false,
                    paymentID: response.razorpay_order_id,
                    paymentStatus: 'success',
                    paymentMethod: 'gateway'
                })

                //sendmail

                await mailSender(user.email, `Payment Successful`, accomodationPaymentSuccess(user.firstName, data.totalcost, response.razorpay_order_id, response.razorpay_payment_id))

                await mailSender(
                    user.email,
                    `Accomodation Registered`,
                    accomodationSuccessEmail(user.firstName, saveaccomod)
                )

                tosend.status = 1;
                tosend.msg = 'Registered! Please check your mail for further process';

            }
            else {
                doc.status = 'failed'
                doc.paymentreport = { reason: 'checksum verification failed' };
                await doc.save();
                tosend.status = 0;
                tosend.msg = 'Payment Failed! Unable to verify the authenticity of Transaction. If money has been deducted from your account, please contact us with order id ' + response.razorpay_order_id;
            }

        } else {
            let doc = await AccomodationPayments.findById(mongoid);
            doc.status = 'failed'
            doc.paymentreport = response.error;
            await doc.save();
            tosend.status = 0;
            tosend.msg = response.error.description;
        }
        return res.status(200).json(JSON.stringify(tosend))
    } else {
        return res.status(405).send("method not allowed")
    }
}