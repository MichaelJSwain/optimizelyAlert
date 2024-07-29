const nodemailer = require('nodemailer');
require('dotenv').config()
const {GMAIL_AUTH} = process.env;

const sendAlert = alertBody => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'michaeljeswain@gmail.com',
        pass: GMAIL_AUTH
        }
    });
  
    const mailOptions = {
        from: 'michaeljeswain@gmail.com',
        to: 'michaeljeswain@gmail.com',
        subject: 'Optimizely Web Alert: Missing custom goals',
        text: alertBody
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendAlert;