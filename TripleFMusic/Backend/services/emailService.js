// Backend/services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendPasswordResetEmail = (email, resetLink) => {
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
          .container { font-family: Arial, sans-serif; margin: 20px; }
          .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
          .content { margin-bottom: 20px; }
          .footer { font-size: 12px; color: #888; }
          .btn { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px; }
          .btn:hover { background-color: #0056b3; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Password Reset Request</div>
          <div class="content">
            <p>Hello,</p>
            <p>You recently requested to reset your password for your TripleF Music account. Click the button below to reset it.</p>
            <p><a href="${resetLink}" class="btn">Reset your password</a></p>
            <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
            <p>Thanks,<br/>The TripleF Music Team</p>
          </div>
          <div class="footer">
            <p>This email was sent to ${email}. If you have received this email in error, please disregard it.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
