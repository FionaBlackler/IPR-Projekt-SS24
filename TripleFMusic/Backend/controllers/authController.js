const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User, PasswordResetToken } = require('../models');
const { sendPasswordResetEmail } = require('../services/emailService');

// Funktion zum Generieren eines Reset-Tokens
function generateResetToken() {
  return crypto.randomBytes(20).toString('hex'); // Beispiel: Zufälliger Token
}

// Controller für das Anfordern eines Passwort-Resets
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ userExists: false, message: 'User not found' });
    }

    // Token generieren und speichern
    const token = generateResetToken();
    await PasswordResetToken.create({ token, email });

    // E-Mail mit Reset-Link senden
    const resetLink = `http://localhost:5173/reset_password?token=${token}&email=${email}`;

    // Name des Benutzers und E-Mail an die Funktion übergeben
    await sendPasswordResetEmail(user.email, user.firstname, resetLink);

    res.status(200).json({ userExists: true, message: 'Reset token generated and sent successfully' });

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

// Registrierung
exports.register = async (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  console.error('authController.register called with:', req.body); // Use console.error for logging
  try {
    console.error('Hashing password...'); // Use console.error
    const hashedPassword = await bcrypt.hash(password, 10); // Passwort hashen
    console.error('Password hashed:', hashedPassword); // Use console.error

    // Logging before creation
    console.error('Creating new user with hashed password...'); // Use console.error
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword, // Gespeichertes, gehashtes Passwort
      username,
    });

    // Logging after creation
    console.error('User created:', newUser); // Use console.error
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