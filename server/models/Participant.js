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
    },
    paymentStatus:{
      type:String,
      enum:['Paid','NonPaid']
    },
    paymentID:{
      type:String,
      require:true
    },

    ReferralCode:{
      type:String,
      // enum: [''
      // ,'CA23B101','CA23B102','CA23B103','CA23B104','CA23B105','CA23B106','CA23B107','CA23B108','CA23B109'
      // ,'CA23B110','CA23B111','CA23B112','CA23B113','CA23B114','CA23B115','CA23B116','CA23B117','CA23B118'
      // ,'CA23B119','CA23B120','CA23B121','CA23B122','CA23B123','CA23B124','CA23B125','CA23B126','CA23B127'
      // ,'CA23B128','CA23B129','CA23B130','CA23B131','CA23B132','CA23B133','CA23B134','CA23B135'          ]
      
    }
  });


  module.exports = mongoose.model('Participant',participantSchema)
