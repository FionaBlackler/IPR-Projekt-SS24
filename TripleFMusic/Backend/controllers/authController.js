const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User, PasswordResetToken } = require('../models');

// Konfiguration von nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // oder ein anderer E-Mail-Service
  auth: {
    user: process.env.EMAIL_USER, // Umgebungsvariable anpassen
    pass: process.env.EMAIL_PASS, // Umgebungsvariable anpassen
  },
});

// Controller für die Registrierung
exports.register = async (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  console.log('authController.register called with:', req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    console.log('Password hashed:', hashedPassword);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword, // Store the hashed password
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

// Funktion zum Generieren eines Reset-Tokens
function generateResetToken() {
  // Implementieren Sie hier die Logik zur Generierung eines Tokens (z.B. mit crypto oder uuid)
  return crypto.randomBytes(20).toString('hex'); // Beispiel: Zufälliger Token
}

// Controller für das Anfordern eines Passwort-Resets
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Token generieren und speichern
    const token = generateResetToken();
    await PasswordResetToken.create({ token, email });

    // E-Mail mit Reset-Link senden
    const resetLink = `http://your-app-domain/reset-password?token=${token}&email=${email}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You have requested a password reset. Please click on the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset token generated and sent successfully' });

  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Error requesting password reset' });
  }
};

// Controller für das Zurücksetzen des Passworts
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