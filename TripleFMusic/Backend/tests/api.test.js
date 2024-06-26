const request = require('supertest');
const express = require('express');
const router = require('../api'); // Ensure this path is correct
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Mock Sequelize models
jest.mock('../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const PlaylistMock = dbMock.define('Playlist', {
    name: 'Test Playlist'
  });

  // Add findByPk method
  PlaylistMock.findByPk = jest.fn((id) => {
    return PlaylistMock.build({ id, name: 'Test Playlist' });
  });

  const SongsMock = dbMock.define('Songs', {
    songTitle: 'Test Song',
    artist: 'Test Artist'
  });

  const SongPlaylistsMock = dbMock.define('SongPlaylists', {});

  const UserMock = dbMock.define('User', {
    username: 'testuser',
    password: 'password123'
  });

  return {
    Playlist: PlaylistMock,
    Songs: SongsMock,
    SongPlaylists: SongPlaylistsMock,
    User: UserMock
  };
});

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use('/', router);

describe('API Tests', () => {
  it('should create a new playlist', async () => {
    const response = await request(app)
      .post('/playlists')
      .send({ name: 'Test Playlist' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Playlist');
  });

  it('should fetch all playlists', async () => {
    const response = await request(app).get('/playlists');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should delete a playlist', async () => {
    const response = await request(app).delete('/playlists/1');

    if (response.status !== 204) {
      console.error('Response body:', response.body);
    }

    expect(response.status).toBe(204);
  });

  
});