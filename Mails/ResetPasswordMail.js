// const nodemailer = require('nodemailer');
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
const transport = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})
  
   
   const mailOPtions = {
     from: `Sagni Alemayehu ${process.env.EMAIL_USERNAME}`,
     to: 'natnael3370@gmail.com',
     subject: options.subject,
     text: "hello this is the test email for nodemailer, if you recieved the email please replay me to check"
   }
   
//    await transport.sendil(mailOPtions);

    await transport.sendMail(mailOPtions);
}

module.exports = sendEmail;