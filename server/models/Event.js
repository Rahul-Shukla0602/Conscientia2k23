const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        trim: true,
        required: true,
    },
    eventDescription: {
        type: String,
        trim: true,
        required: true,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    //--------------
    eventContent:{
            type:String,
            trim:true,
            // require:true
        },
    price: {
        type: Number,
        required: true,
    },
    fee:{
        type:Number,
        require:true,
    },
    WhatYouWillLearn:{
        type:String,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    //-------------------
    tag: {
        type: [String],
        // required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    participantEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    instructions: {
        type: [String],
        required:true
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
    },
    eventType:{
        type:String,
        enum:["Team","NoTeam"]
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }, 
    BrochureLink:{
        type:String,
        require:true
    },
    PosterLink:{
        type:String,
        require:true
    },
    location: {
        type: String,
        // required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Event', eventSchema);
