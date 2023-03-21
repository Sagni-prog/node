const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
   const transporter = nodemailer.createTransport({
       host: process.env.EMAIL_HOST,
       port: process.env.EMAIL_PORT,
       auth: {
           user: process.env.EMAIL_USERNAME,
           pass: process.env.EMAIL_PASSWORD
       }
   });
   
   const mailOPtions = {
     from: `Sagni Alemayehu ${process.env.EMAIL_USERNAME}`,
     to: process.env.EMAIL_USERNAME,
     subject: "test mail",
     text: "hello this is the test email"
   }
   
   await transporter.sendEmail(mailOPtions);
}

module.exports = sendEmail;