const mongoose = require('mongoose')

const merchOrder = new mongoose.Schema({
    orderid: {type:String},
    upipaymentid: {type: String},
    paymentmongoid: {type:String},
    amountinruppes: {type:Number,required: true},
    receipt:  {type:String,required: true},
    status: {type:String,required: true},
    totalitems: {type:Number,required: true},
    itemslist:  {type:Object,required: true},
    delivery: {type: String, required:true},
    deliverydetails: {type:Object, required:true},
    delivered: {type: Boolean, required: true},
    user: {type:Object, required:true},
},{timestamps: true});

module.exports = mongoose.model("Merchandise_Orders",merchOrder);