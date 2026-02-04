const { sendEmail } = require('../services/mailService');

const sendMailController = async (req, res) => {
  try {
    const { receiverEmail, subject, body } = req.body;

    if (!receiverEmail || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: 'receiverEmail, subject and body are required'
      });
    }

    const result = await sendEmail({
      to: receiverEmail,
      subject,
      text: body
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

module.exports = { sendMailController };
