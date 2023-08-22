const mongoose = require('mongoose');

const merchSchema = new mongoose.Schema({
    orderid: {type: String, required: true},
    amount: {type:Number, required: true},
    amount_paid: {type: Number, required: true},
    amount_due: {type: Number, required: true},
    currency: {type:String, required:true},
    receipt: {type:String, required:true},
    status: {type:String, required:true},
    totalperson: {type:Number, required:true},
    data: {type:Object, required:true},
    paymentreport: {type:Object, required:true},
    user: {type: String, required: true}
},{timestamps: true});

module.exports = mongoose.model("AccomodationPayments",merchSchema);