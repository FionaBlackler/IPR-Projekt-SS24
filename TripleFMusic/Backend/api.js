const express = require('express');
const router = express.Router();
const { Playlist } = require('./models');

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

module.exports = router;
