const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Pfad zum Logo relativ zum Backend
const logoPath = path.join(__dirname, '../../Frontend/src/pages/Images/TripleF3_2.png');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendPasswordResetEmail = (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Password Reset Request</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
            color: #00AEBD; /* Grün wie bei Spotify */
          }
          .content {
            margin-bottom: 20px;
            text-align: center;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            font-size: 18px;
            color: white;
            background-color: #00AEBD; /* Grün wie bei Spotify */
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px; /* Abstand zum Text */
            text-align: center;
          }
          .btn:hover {
            background-color: #00AEBD; /* Dunklere grüne Farbe im Hover */
          }
          .footer {
            font-size: 14px;
            color: #888;
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <div>
          <img src="cid:logo@triplef-music.com" alt="TripleF Music Logo" style="display: block; margin-right: 100 auto; max-width: 12%;">
        </div>
          <div class="header">Hello ${name}!, </div>
          <div class="content">
            <p>Did you misplace your password for your TripleF Music account? No worries!</p>
            <p>Click the button below to reset your password:</p>
            <p><a href="http://localhost:5173/login" class="btn">Reset Password</a></p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br/>The TripleF Music Team</p>
            <p>This email was sent to ${email}. If you received this email in error, please disregard it.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [{
      filename: 'TripleF3_2.png',
      path: logoPath,
      cid: 'logo@triplef-music.com' // Eindeutige Content-ID für das Bild
    }]
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
