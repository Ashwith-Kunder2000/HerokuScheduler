const express = require('express');
const { sendMailController } = require('../controllers/temp');

const router = express.Router();

router.post('/send-email', sendMailController);

module.exports = router;




