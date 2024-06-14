const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');
const apiRoutes = require('./api'); // Import the API routes

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the API routes, prefixed with /api
app.use('/api', apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
});
