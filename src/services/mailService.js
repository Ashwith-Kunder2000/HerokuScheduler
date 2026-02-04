const transporter = require('../config/mailConfig');

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
