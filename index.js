import notifier from 'node-notifier';
import nodemailer from 'nodemailer';
import { senderEmail, senderPassword } from './auth.js';

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

// Function to send email
const sendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Cold Snap Notifier" <${senderEmail}>`,
      to: senderEmail,
      subject: 'Weather Alert: Stay Moisturized!',
      text: 'It’s getting colder and drier. Don’t forget your lip balm and moisturizer!',
    });
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to send notification
const sendNotification = () => {
  notifier.notify(
    {
      title: 'Weather Alert',
      message: 'It’s getting colder and drier. Stay moisturized!',
      sound: true,
    },
    (err, response) => {
      if (err) {
        console.error('Notification error:', err);
      } else {
        console.log('Notification sent:', response);
      }
    }
  );
};

// Trigger both notification and email
const sendAlerts = () => {
  sendNotification();
  sendEmail();
};

// Run alerts
sendAlerts();
