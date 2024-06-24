const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Playlist, Songs, SongPlaylists, User } = require("./models");
const authController = require("./controllers/authController");
const verifyToken = require("./authMiddleware.js");
const multer = require("multer");
const path = require("path");

// Configure storage for files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "mp3File") {
      cb(null, "./uploads/mp3files");
    } else if (file.fieldname === "jpgFile") {
      cb(null, "./uploads/jpgfiles");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });


router.post(
  "/songs",
  upload.fields([
    { name: "mp3File", maxCount: 1 },
    { name: "jpgFile", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Received request to save new song");
    const { songTitle, artist, selectedPlaylists, selectedGenres, notes } =
      req.body;

    try {
      const mp3FilePath = req.files["mp3File"][0].path;
      const jpgFilePath = req.files["jpgFile"][0].path;

      const newSong = await Songs.create({
        mp3File: mp3FilePath,
        jpgFile: jpgFilePath,
        songTitle,
        artist,
        selectedPlaylists: JSON.parse(selectedPlaylists),
        selectedGenres: JSON.parse(selectedGenres),
        notes,
      });

      console.log("New song created:", newSong);

      const playlistIds = JSON.parse(selectedPlaylists);
      if (playlistIds && playlistIds.length > 0) {
        const playlistRecords = await Playlist.findAll({
          where: {
            id: playlistIds, // Use `id` instead of `name`
          },
        });
        console.log("Found playlists:", playlistRecords);
        await newSong.setPlaylists(playlistRecords);
        console.log("Associated playlists with new song");
      }

      res.status(201).json(newSong);
    } catch (error) {
      console.error("Error saving song:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the song." });
    }
  }
);

// Route to create a new playlist
router.post("/playlists", async (req, res) => {
  try {
    console.log(
      `[${new Date().toISOString()}] POST /playlists called with body:`,
      req.body
    );
    const { name } = req.body;
    const newPlaylist = await Playlist.create({ name });
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error creating playlist:`,
      error
    );
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Playlist name must be unique" });
    } else {
      res.status(500).json({ message: "Error creating playlist", error });
    }
  }
});

// Route to fetch all playlists
router.get("/playlists", async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] GET /playlists called`);
    const playlists = await Playlist.findAll();
    res.status(200).json(playlists);
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error fetching playlists:`,
      error
    );
    res.status(500).json({ message: "Error fetching playlists", error });
  }
});

// Route to delete a playlist
router.delete("/playlists/:id", async (req, res) => {
  try {
    console.log(
      `[${new Date().toISOString()}] DELETE /playlists/${req.params.id} called`
    );
    const playlistId = req.params.id;
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      console.error(
        `[${new Date().toISOString()}] Playlist not found with id:`,
        playlistId
      );
      return res.status(404).json({ message: "Playlist not found" });
    }
    await playlist.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error deleting playlist:`,
      error
    );
    res.status(500).json({ message: "Error deleting playlist", error });
  }
});

// Route to fetch songs for a specific playlist
router.get("/playlists/:id/songs", async (req, res) => {
  const playlistId = req.params.id;
  try {
    const playlist = await Playlist.findByPk(playlistId, {
      include: [
        {
          model: Songs,
          through: {
            attributes: [], // Remove SongPlaylists attributes from the result
          },
        },
      ],
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    console.log("Fetched playlist with songs:", playlist.Songs);
    res.status(200).json(playlist.Songs);
  } catch (error) {
    console.error(`Error fetching songs for playlist ${playlistId}:`, error);
    res.status(500).json({ message: "Error fetching songs", error });
  }
});

// Route to delete a single song from a specific playlist
// Route to delete a song from a specific playlist
router.delete("/playlists/:playlistId/songs/:songId", async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    console.log(
      `Attempting to delete song with ID ${songId} from playlist with ID ${playlistId}`
    );

    const songPlaylist = await SongPlaylists.findOne({
      where: {
        songId,
        playlistId,
      },
    });

    if (!songPlaylist) {
      console.log(
        `Song with ID ${songId} not found in playlist with ID ${playlistId}`
      );
      return res
        .status(404)
        .json({ message: "Song not found in the specified playlist" });
    }

    await songPlaylist.destroy();
    console.log(
      `Successfully deleted song with ID ${songId} from playlist with ID ${playlistId}`
    );
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting song from playlist:", error);
    res
      .status(500)
      .json({ message: "Error deleting song from playlist", error });
  }
});

// Route to delete multiple songs from a specific playlist
router.delete("/playlists/:playlistId/songs", async (req, res) => {
  const { playlistId } = req.params;
  const { songIds } = req.body; // Expecting an array of song IDs in the request body

  console.log(
    `Attempting to delete songs with IDs ${songIds} from playlist with ID ${playlistId}`
  );

  try {
    const songPlaylists = await SongPlaylists.findAll({
      where: {
        songId: songIds,
        playlistId,
      },
    });

    if (!songPlaylists.length) {
      console.log(
        `No songs found with IDs ${songIds} in playlist with ID ${playlistId}`
      );
      return res
        .status(404)
        .json({ message: "Songs not found in the specified playlist" });
    }

    await SongPlaylists.destroy({
      where: {
        songId: songIds,
        playlistId,
      },
    });

    console.log(
      `Successfully deleted songs with IDs ${songIds} from playlist with ID ${playlistId}`
    );
    res.status(204).end();
  } catch (error) {
    console.error(`Error deleting songs from playlist ${playlistId}:`, error);
    res
      .status(500)
      .json({ message: "Error deleting songs from playlist", error });
  }
});

// Route to update a song
router.put('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const { songTitle, artist, selectedGenres, notes } = req.body;

  try {
    const song = await Songs.findByPk(id);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    song.songTitle = songTitle;
    song.artist = artist;
    song.selectedGenres = selectedGenres;
    song.notes = notes;

    await song.save();

    res.status(200).json({ message: 'Song updated successfully', song });
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ message: 'Error updating song', error });
  }
});

// Passwort vergessen Route
router.post("/forgot_password", authController.forgotPassword);

// Passwort zurücksetzen Route
router.post("/reset_password", authController.resetPassword);

router.post("/register", authController.register);

router.post("/login", async (req, res) => {
  const { username, password, rememberMe } = req.body;

  try {
    console.log(`Login attempt for username: ${username}`);

    const user = await User.findOne({
      where: { username },
      attributes: [
        "id",
        "firstname",
        "lastname",
        "username",
        "email",
        "password",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`Stored hashed password: ${user.password}`);
    console.log(`Entered password: ${password}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(`Password comparison result: ${isPasswordValid}`);
    console.log(`Type of stored password: ${typeof user.password}`);
    console.log(`Type of entered password: ${typeof password}`);

    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${username}`);
      return res.status(401).json({ message: "Invalid password" });
    }
    const tokenExpiry = rememberMe ? "7d" : "1d"; // 7 Tage für Remember Me, 1 Tag sonst

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    console.log(`Login successful for user: ${username}`);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

router.post("/change_password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: hashedNewPassword },
      { where: { id: userId } }
    );

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password", error });
  }
});

// Route to delete the logged-in user's profile
router.delete("/delete_profile", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ message: "Error deleting user profile", error });
  }
});

module.exports = router;
