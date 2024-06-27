const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { User, Playlist, PasswordResetToken } = require('../models');
const router = require('../api'); // Ensure this path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { sendPasswordResetEmail } = require('../services/emailService');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
jest.mock('../models'); // Mock the models
jest.mock('../services/emailService'); // Mock the email service

const app = express();
app.use(bodyParser.json());
app.use('/', router);

describe('API Tests', () => {
  let sendMailMock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Explicitly mock nodemailer.createTransport
    sendMailMock = jest.fn().mockResolvedValue({});
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });

    // Mock sendPasswordResetEmail
    sendPasswordResetEmail.mockResolvedValue({});
  });

  it('should register a new user', async () => {
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.create.mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com', password: 'hashedPassword' });

    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'password', email: 'test@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user).toHaveProperty('id');
  });

  it('should login a user', async () => {
    bcrypt.compare.mockResolvedValue(true);
    User.findOne.mockResolvedValue({ id: 1, username: 'testuser', password: 'hashedPassword' });
    jwt.sign.mockReturnValue('token');

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body).toHaveProperty('token');
  });

  it('should return 404 for login with non-existent user', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({ username: 'nonexistent', password: 'password' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return 401 for login with invalid password', async () => {
    bcrypt.compare.mockResolvedValue(false);
    User.findOne.mockResolvedValue({ id: 1, username: 'testuser', password: 'hashedPassword' });

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid password');
  });

  it('should send a password reset email', async () => {
    User.findOne.mockResolvedValue({ id: 1, firstname: 'Test', email: 'test@example.com', save: jest.fn() });
    PasswordResetToken.create.mockResolvedValue({ token: 'reset-token', email: 'test@example.com' });

    const response = await request(app)
      .post('/forgot_password')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Reset token generated and sent successfully');
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      'test@example.com',
      'Test', // Mocked name parameter
      expect.any(String)  // Mocked reset link parameter
    );
  });

  it('should return 404 for forgot password with non-existent email', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/forgot_password')
      .send({ email: 'nonexistent@example.com' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should reset password with valid token', async () => {
    bcrypt.hash.mockResolvedValue('newHashedPassword');
    User.findOne.mockResolvedValue({ id: 1, resetToken: 'validtoken', resetTokenExpiry: Date.now() + 3600000, save: jest.fn() });

    const response = await request(app)
      .post('/reset_password')
      .send({ resetToken: 'validtoken', newPassword: 'newpassword' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password has been reset successfully');
  });

  it('should return 400 for reset password with invalid or expired token', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/reset_password')
      .send({ resetToken: 'invalidtoken', newPassword: 'newpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid or expired token');
  });

  it('should create a new playlist', async () => {
    Playlist.create.mockResolvedValue({ id: 1, name: 'Test Playlist' });

    const response = await request(app)
      .post('/playlists')
      .send({ name: 'Test Playlist' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Playlist');
  });

  it('should fetch all playlists', async () => {
    Playlist.findAll.mockResolvedValue([{ id: 1, name: 'Test Playlist' }]);

    const response = await request(app).get('/playlists');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should delete a playlist', async () => {
    Playlist.findByPk.mockResolvedValue({ id: 1, name: 'Test Playlist', destroy: jest.fn().mockResolvedValue() });

    const response = await request(app).delete('/playlists/1');

    expect(response.status).toBe(204);
  });

  it('should return 400 for creating a playlist without a name', async () => {
    const response = await request(app).post('/playlists').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Playlist name is required');
  });

  // Add more tests for other routes and edge cases
});
