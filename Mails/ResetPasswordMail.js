
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
const transport = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})
  
   
   const mailOPtions = {
     from: `Sagni Alemayehu ${process.env.EMAIL_USERNAME}`,
     to: process.env.EMAIL_USERNAME,
     subject: options.subject,
     text: "hello this is the test email for nodemailer, test tls + security"
   }
   
    await transport.sendMail(mailOPtions);
}

module.exports = sendEmail;