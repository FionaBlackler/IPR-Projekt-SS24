const express = require('express');
const router = express.Router();
const { Playlist, Song } = require('./models');

// Route to create a new playlist
router.post('/playlists', async (req, res) => {
  try {
    const { name } = req.body;
    const newPlaylist = await Playlist.create({ name });
    res.status(201).json(newPlaylist);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Playlist name must be unique' });
    } else {
      res.status(500).json({ message: 'Error creating playlist', error });
    }
  }
});

// Route to fetch all playlists
router.get('/playlists', async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
});

// Route to delete a playlist
router.delete('/playlists/:id', async (req, res) => {
  try {
    const playlistId = req.params.id;
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    await playlist.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist', error });
  }
});

// Route to save a new song
router.post('/songs', async (req, res) => {
  try {
    const {
      mp3FilePath,
      jpgFilePath,
      songTitle,
      artist,
      selectedPlaylists,
      selectedGenres,
      notes,
    } = req.body;

    const newSong = await Song.create({
      mp3FilePath,
      jpgFilePath,
      songTitle,
      artist,
      selectedPlaylists,
      selectedGenres,
      notes,
    });

    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: 'Error creating song', error });
  }
});

module.exports = router;
