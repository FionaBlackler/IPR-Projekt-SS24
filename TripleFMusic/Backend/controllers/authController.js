const db = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { PasswordResetToken, User } = db;
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  console.log('authController.register called with:', req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      username,
    });
    console.log('User created:', newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error in authController.register:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Username or email already exists' });
    } else {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
};

const transporter = nodemailer.createTransport({
  service: 'Gmail', // oder ein anderer E-Mail-Service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token and save it
    const token = generateResetToken();
    await PasswordResetToken.create({ token, email });

    // Send email with reset link (implement this functionality)

    res.status(200).json({ message: 'Reset token generated and sent successfully' });

  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Error requesting password reset' });
  }
};

function generateResetToken() {
  // Implement token generation logic here (e.g., using crypto or uuid)
  return 'generated_token'; // Replace with actual token generation code
}

exports.resetPassword = async (req, res) => {
  const { token, email, newPassword } = req.body;

  try {
    const resetToken = await PasswordResetToken.findOne({ where: { token, email } });

    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { email } });

    await PasswordResetToken.destroy({ where: { email } });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};
