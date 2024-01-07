const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const DrugIssue = require('./schema');
const port = 3000;
const app = express();

// Connect to MongoDB using Mongoose
mongoose
  .connect('mongodb+srv://pmboobesh:a5pIqiYiNwRwnGUB@cluster0.hbtw8lt.mongodb.net/test')
  .then(() => {
    console.log('Mongoose Connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware setup for JSON parsing and CORS
app.use(express.json());
app.use(cors());

// ... (other middleware)

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'logeswaran2108@gmail.com',
    pass: 'gnwd bggl urll soxt',
  },
});

// Define API endpoint to send an email and store data using Mongoose
app.post('/sendemail', async (req, res) => {
  try {
    const mailData = req.body;
    console.log(mailData);

    const mailOptions = {
        from: mailData.email,
        to: 'logesthangam2108@gmail.com,Sanjiv.singh@3analytics.com',
        subject: `Drug Issue Report - ${mailData.selectedProduct}`,
        html: `
        <h1>Report form </h1>
        <p>Drug Manufacturer:${mailData.selectedManufacturer}</p>
        <p>DrugName:${mailData.selectedProduct}</p>
        <p>Patient Name: ${mailData.name}</p>
        <p>Age:${mailData.age}</p>
        <p>City:${mailData.city}</p>
        <p>Gender:${mailData.sex}</p>
        <p>Date of Onset: ${mailData.onsetDate}</p>
        <p>Symptoms: ${mailData.symptoms}</p>
        <p>Drug Issues: ${mailData.drugIssues}</p>
      `
      }

    // Send email using Nodemailer transporter
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });

    // Save data to MongoDB using Mongoose
    const drugIssue = new DrugIssue(mailData);
    await drugIssue.save();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred while processing');
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log('Server has started on port ' + port);
  }
});
