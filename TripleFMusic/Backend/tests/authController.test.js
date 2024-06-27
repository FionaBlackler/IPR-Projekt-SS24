const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
jest.mock('../models', () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
  }
}));

const app = express();
app.use(bodyParser.json());
app.post('/register', authController.register);
app.post('/forgot_password', authController.forgotPassword);
app.post('/reset_password', authController.resetPassword);

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.create.mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com', password: 'hashedPassword' });

    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'password', email: 'test@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully'); // Updated to match the controller's response
    expect(response.body.user).toHaveProperty('id');
  });

  // Add more tests as needed
});
