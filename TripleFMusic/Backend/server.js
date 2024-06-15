const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const db = require('./models');
const apiRoutes = require('./api');

const app = express();

// CORS configuration to allow only specific origin
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the API routes, prefixed with /api
app.use('/api', apiRoutes);

// Sync the models and start the server
db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
