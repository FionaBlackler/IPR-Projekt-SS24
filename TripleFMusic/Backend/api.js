const express = require('express');
const router = express.Router();
const { Playlist, Songs, User } = require('./models');
const authController = require('./controllers/authController');

//Route to create a new song
router.post('/songs', async (req, res) => {
  const { mp3FilePath, jpgFilePath, songTitle,artist, selectedPlaylists, selectedGenres, notes } = req.body;

  try {
    const newSong = await Songs.create({
      mp3FilePath,
      jpgFilePath,
      songTitle,
      artist,
      selectedPlaylists,
      selectedGenres,
      notes
    });
    res.status(201).json(newSong);
  } catch (error) {
    console.error('Error saving song:', error);
    res.status(500).json({ error: 'An error occurred while saving the song.' });
  }
});



// Route to create a new playlist
router.post('/playlists', async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] POST /playlists called with body:`, req.body);
    const { name } = req.body;
    const newPlaylist = await Playlist.create({ name });
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error creating playlist:`, error);
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
    console.log(`[${new Date().toISOString()}] GET /playlists called`);
    const playlists = await Playlist.findAll();
    res.status(200).json(playlists);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching playlists:`, error);
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
});

// Route to delete a playlist
router.delete('/playlists/:id', async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] DELETE /playlists/${req.params.id} called`);
    const playlistId = req.params.id;
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      console.error(`[${new Date().toISOString()}] Playlist not found with id:`, playlistId);
      return res.status(404).json({ message: 'Playlist not found' });
    }
    await playlist.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error deleting playlist:`, error);
    res.status(500).json({ message: 'Error deleting playlist', error });
  }
});

router.post('/register', async (req, res) => {
  console.log(`[${new Date().toISOString()}] POST /register called with body:`, req.body);
  try {
    const { firstname, lastname, email, password, username } = req.body;
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password, // Password should be hashed
      username,
    });
    console.log(`[${new Date().toISOString()}] User registered:`, newUser);
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error registering user:`, error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Route to fetch songs for a specific playlist
router.get('/playlists/:id/songs', async (req, res) => {
  const playlistId = req.params.id;  // Ensure playlistId is defined here
  try {
    const songs = await Songs.findAll({ where: { PlaylistId: playlistId } });
    res.status(200).json(songs);
  } catch (error) {
    console.error(`Error fetching songs for playlist ${playlistId}:`, error);
    res.status(500).json({ message: 'Error fetching songs', error });
  }
});


// Passwort vergessen Route
router.post('/forgot_password', authController.forgotPassword);

// Passwort zurücksetzen Route
router.post('/reset_password', authController.resetPassword);


module.exports = router;
