const request = require('supertest');
const express = require('express');
const router = require('../api'); // Adjust the path as needed
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Mock Sequelize models
jest.mock('../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const PlaylistMock = dbMock.define('Playlist', {
    name: 'Test Playlist'
  });

  PlaylistMock.findByPk = jest.fn((id) => {
    const playlist = PlaylistMock.build({ id, name: 'Test Playlist' });
    playlist.Songs = [{
      id: 1,
      songTitle: 'Test Song',
      artist: 'Test Artist'
    }];
    return Promise.resolve(playlist);
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

  it('should create a new song', async () => {
    const mp3Buffer = fs.readFileSync(path.join(__dirname, 'test_files/sample.mp3'));
    const jpgBuffer = fs.readFileSync(path.join(__dirname, 'test_files/sample.jpg'));

    const response = await request(app)
      .post('/songs')
      .field('songTitle', 'New Song')
      .field('artist', 'New Artist')
      .field('selectedPlaylists', '[]')
      .field('selectedGenres', '[]')
      .field('notes', 'Some notes')
      .attach('mp3File', mp3Buffer, 'sample.mp3')
      .attach('jpgFile', jpgBuffer, 'sample.jpg');

    expect(response.status).toBe(201);
    expect(response.body.songTitle).toBe('New Song');
  });
  
  it('should fetch songs for a playlist', async () => {
    const response = await request(app).get('/playlists/1/songs');

    if (response.status !== 200) {
      console.error('Error response:', response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return 400 for invalid playlist ID format', async () => {
    const response = await request(app).get('/playlists/invalid-id/songs');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid playlist ID format');
  });

  it('should return 400 for creating a playlist without a name', async () => {
    const response = await request(app).post('/playlists').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Playlist name is required');
  });
  
});