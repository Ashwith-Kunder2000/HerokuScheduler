
const nodemailer = require('nodemailer');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_PORT:', process.env.SECRET_KEY);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,   // 🔴 THIS FIXES ::1 ISSUE
  port: process.env.EMAIL_PORT,
  secure: false,                  // true only for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = transporter;
