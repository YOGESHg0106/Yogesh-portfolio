// Load environment variables from .env file
require('dotenv').config();
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true, // Use SSL/TLS
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates (not recommended for production)
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'recipient_email@example.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
