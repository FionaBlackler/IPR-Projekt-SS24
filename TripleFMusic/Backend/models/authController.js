// models/authController.js

const db = require('../models');
const bcrypt = require('bcrypt');
const { User } = db;

exports.register = async (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;

  try {
    // Hash des Passworts
    const hashedPassword = await bcrypt.hash(password, 10);

    // Erstelle den Benutzer in der Datenbank
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Username or email already exists' });
    } else {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
};
