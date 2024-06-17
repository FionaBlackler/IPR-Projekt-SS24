const db = require('../models');
const bcrypt = require('bcrypt');
const { User } = db;

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
