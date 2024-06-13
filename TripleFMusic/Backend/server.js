const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const playlistsRouter = require('./routes/playlists');

const app = express();

// CORS options
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Server läuft" });
});

// API routes
app.use('/api/playlists', playlistsRouter);

// Set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync();
});
