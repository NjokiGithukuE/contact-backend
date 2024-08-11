require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider here
    auth: {
      user: process.env.EMAIL_USER, // Access email from .env
      pass: process.env.EMAIL_PASS,  // Access password from .env
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email to receive messages
    subject: `Contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
