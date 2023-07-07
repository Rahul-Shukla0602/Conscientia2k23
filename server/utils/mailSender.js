const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    let transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER, // Mailtrap username
        pass: process.env.MAIL_PASS, // Mailtrap password
      },
    });

    let info = await transport.sendMail({
      from: 'Conscientia Team IIST', // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, //html body
    });

    console.log(info);
    return info;
  } catch (error) {
    console.log('Error sending email: ', error.message);
  }
};

module.exports = mailSender;

