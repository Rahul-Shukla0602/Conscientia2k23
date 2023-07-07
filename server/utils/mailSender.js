// const nodemailer = require('nodemailer');
// require('dotenv').config();
// const mailSender = async (email,title,body)=>{
//     try{
//         let transport = nodemailer.createTransport({
//             host: process.env.MAIL_HOST,
//             auth: {
//               user: process.env.MAIL_USER, // generated ethereal user
//               pass: process.env.MAIL_PASS, // generated ethereal password
//             },
//             tls: {
//               // do not fail on invalid certs
//               rejectUnauthorized: false,
//             },
//         });
//         console.log("transport: ",transport)
//         let info = await transport.sendMail({
//             from: 'Conscientia Team IIST', // sender address
//             to: `${email}`, // list of receivers
//             subject: `${title}`, // Subject line
//             html: `${body}`, //html body
//           });
//           console.log(info);
//           return info;
//     } catch(error){
//       console.log("Error sending email: ", error.message);

//       // console.log("error in mail send")
//       // console.log(error.message);
//     }
// }
// module.exports = mailSender;

// const { MailtrapClient } = require('mailtrap');
// require('dotenv').config();

// const mailSender = async (email, title, body) => {
//   try {
//     const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
//     const sender = { name: 'Conscientia Team IIST', email: process.env.MAILTRAP_SENDER_EMAIL };
    
//     const response = await client.send({
//       from: sender,
//       to: [{ email }],
//       subject: title,
//       html: body,
//     });

//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log('Error sending email: ', error.message);
//   }
// };

// module.exports = mailSender;
const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    let transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USER, // Mailtrap username
        pass: process.env.MAIL_PASS, // Mailtrap password
      },
    });

    let info = await transport.sendMail({
      from: 'Conscientia Team IIST', // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      html: body, //html body
    });

    console.log(info);
    return info;
  } catch (error) {
    console.log('Error sending email: ', error.message);
  }
};

module.exports = mailSender;

