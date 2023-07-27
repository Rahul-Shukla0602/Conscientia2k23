const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    collegeId: {
      type: String,
      required: true
    },
    teamName: {
      type: String
    },
    teamMembers: [
      {
        name: {
          type: String
        },
        phone: {
          type: String
        }, 
        email: {
          type: String
        },
        aadhar: {
          type: String  
        }
      }
    ],
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    aadhar: {
      type: String,  
      required: true
    }
  
  });


  module.exports = mongoose.model('Participant',participantSchema)
