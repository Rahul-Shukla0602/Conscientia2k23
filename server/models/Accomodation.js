const mongoose = require('mongoose');

const accomoDation = new mongoose.Schema({
    totalperson: {type: Number, required: true},
    totalcost: {type: Number, required: true},
    men: {type: Number, required: true},
    women: {type: Number, required: true},
    minor: {type: Number, required: true},
    isminorgirl: {type: Boolean, required: true},
    guardian: {type: Number, requred: true},
    details: {type: Object, required: true},
    user: {type: Object, requred: true},
    eventfree: {type: Boolean, required: true},
    checkIn: {type: String, required: true},
    checkOut: {type: String, required: true},
    days: {type: Number, required: true},
    paymentID: {type: String, requred: true},
    paymentStatus: {type: String, required: true},
    paymentMethod: {type: String, required: true}
},{timestamps: true});

module.exports = mongoose.model("Accomodations",accomoDation);