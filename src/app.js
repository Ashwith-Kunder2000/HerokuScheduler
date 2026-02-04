const express = require('express');
const mailRoutes = require('./routes/mailRoutes');

const app = express();

app.use(express.json());

app.use('/api/mail', mailRoutes);

module.exports = app;
