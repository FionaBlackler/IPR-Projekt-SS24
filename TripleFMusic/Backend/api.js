const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const { Playlist, Songs, User } = require('./models');
const authController = require('./controllers/authController');
const multer = require('multer');
const storage = multer.

//Route to create a new song
router.post('/songs', async (req, res) => {
  const { mp3File, jpgFile, songTitle,artist, selectedPlaylists, selectedGenres, notes } = req.body;

  console.log("mp3Fiel: " + mp3File)
  console.log("jpgFiel: " + jpgFile)
  
  console.log(req.files);

  try {
    const newSong = await Songs.create({
      mp3File,
      jpgFile,
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

router.post('/register', authController.register);

router.post('/login', async (req, res) => {
  const { username, password, rememberMe } = req.body;

  try {
    console.log(`Login attempt for username: ${username}`);
    
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'password', 'createdAt', 'updatedAt']
    });

    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`Stored hashed password: ${user.password}`);
    console.log(`Entered password: ${password}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(`Password comparison result: ${isPasswordValid}`);
    console.log(`Type of stored password: ${typeof user.password}`);
    console.log(`Type of entered password: ${typeof password}`);

    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${username}`);
      return res.status(401).json({ message: 'Invalid password' });
    }
    const tokenExpiry = rememberMe ? '7d' : '20s'; // 7 Tage für Remember Me, 1 Stunde sonst

    // Generate JWT Token (example)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: tokenExpiry });

    console.log(`Login successful for user: ${username}`);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;

module.exports = router;