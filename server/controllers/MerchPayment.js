var hmac = require('crypto-js/hmac-sha256')
const { instance } = require('../config/razorpay');
const MerchandisePayments = require('../models/MerchandisePayments')
const MerchandiseOrders = require('../models/MerchandiseOrders')
const {paymentSuccessEmail } =  require('../mail/Templates/paymentSuccessEmail');
const mailSender = require('../utils/mailSender');

exports.initiateOrder = async (req, res) => {
    if (req.method === 'POST') {
        const { amount, items, qty } = req.body;
        let allpayments = await MerchandisePayments.find();
        let receiptid = `Order#${allpayments.length+1}`
        var options = {
            amount: 100 * amount,
            currency: "INR",
            receipt: receiptid
        }
        console.log(options)
        instance.orders.create(options, async function (err, order) {
            console.log(order)
            if (order.amount === 100 * amount) {
                const OrderDetail = await MerchandisePayments.create({
                    orderid: order.id,
                    amount: order.amount,
                    amount_paid: order.amount_paid,
                    amount_due: order.amount_due,
                    currency: order.currency,
                    receipt: order.receipt,
                    status: order.status,
                    totalitems: qty,
                    items: items,
                    paymentreport: {}
                })
                console.log(OrderDetail)
                order.mongoid = OrderDetail._id;
                return res.status(200).json(JSON.stringify(order))
            }
        })
    }
}

exports.verifyOrder = async (req, res) => {
    if (req.method === 'POST') {
        console.log("Order is getting verified")
        let { orderstatus, mongoid, response, userdata } = req.body;
        let tosend = {
            status: 0,
            msg: ''
        }
        console.log("hello1",orderstatus)
        console.log("check: ",response.error)
        console.log("hello2",mongoid)
        console.log("hello1",response)
        console.log("hello1",userdata)
        if (response?.error === undefined) {
            console.log("HUM VERIFY ho gaye 7 .")
            let doc = await MerchandisePayments.findById(mongoid);
            console.log("DOC",doc);
            let generated_signature = hmac(doc.orderid + "|" + response.razorpay_payment_id, process.env.RAZORPAY_SECRET);
            // const body = response?.razorpay_order_id + "|" + response?.razorpay_payment_id;
            // console.log("BODY: ",body)
            // console.log("SECERT: ",process.env.RAZORPAY_SECRET)
            // const expectedSignature = crypto
            //     .createHmac("sha256", process.env.RAZORPAY_SECRET)
            //     .update(body.toString())
            //     .digest("hex");
            // console.log("exS: ",expectedSignature);
            // console.log("razS: ",razorpay_signature);
            console.log("h3")    
            console.log("SIGN: "+generated_signature);
            console.log("sign_r:",response?.razorpay_signature);
            if (generated_signature == response?.razorpay_signature){
                console.log("hum iske bhi under aa gaye hai")
                doc.status = 'success';
                doc.paymentreport = response;
                doc.amount_paid = doc.amount_due;
                doc.amount_due = 0;
                await doc.save();
                console.log("SAVED_DOC: ",doc)
                console.log("HUM VERIFY ho gaye .")
                let orderfile = await MerchandiseOrders.create({
                    orderid: doc.orderid,
                    paymentmongoid: doc._id,
                    amountinruppes: doc.amount_paid/100,
                    receipt: doc.receipt,
                    status: doc.status,
                    totalitems: doc.totalitems,
                    itemslist: doc.items,
                    user: userdata
                })
                console.log("helloji: ",orderfile);

                //sendmail

                await mailSender(
                    orderfile.user.email,
                    `Payment Recieved`,
                    paymentSuccessEmail(`${orderfile.user.firstName}`,
                    orderfile.amountinruppes,orderfile.orderid,orderfile.paymentmongoid)
                )

                tosend.status = 1;
                tosend.msg = 'Thankyou for shopping! Please check your mail for further process';

            } 
            else {
                doc.status = 'failed'
                doc.paymentreport = {reason: 'checksum verification failed'};
                await doc.save();
                tosend.status = 0;
                tosend.msg = 'Payment Failed! Unable to verify the authenticity of Transaction.If money has been deducted from your account, please contact us with order id ' + response.razorpay_order_id;
            }

        } else {
            let doc = await MerchandisePayments.findById(mongoid);
            doc.status = 'failed'
            doc.paymentreport = response.error;
            await doc.save();
            tosend.status = 0;
            tosend.msg = response.error.description;
        }
        return res.status(200).json(JSON.stringify(tosend))
    }
}