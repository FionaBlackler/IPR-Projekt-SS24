const request = require('supertest');
const express = require('express');
const router = require('../api'); // Stelle sicher, dass der Pfad zu deiner api.js-Datei korrekt ist
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Mock die Sequelize-Modelle
jest.mock('../models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  return {
    Playlist: dbMock.define('Playlist', {
      name: 'Test Playlist'
    }),
    Songs: dbMock.define('Songs', {
      songTitle: 'Test Song',
      artist: 'Test Artist'
    }),
    SongPlaylists: dbMock.define('SongPlaylists', {}),
    User: dbMock.define('User', {
      username: 'testuser',
      password: 'password123'
    })
  };
});

// Initialisiere die Express-Anwendung
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

    expect(response.status).toBe(204);
  });


  // Füge weitere Tests für andere Endpunkte hinzu...
});
