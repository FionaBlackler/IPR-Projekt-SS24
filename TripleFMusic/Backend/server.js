const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const apiRoutes = require("./api");

require('dotenv').config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Use CORS middleware with options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Use the API routes, prefixed with /api
app.use("/api", apiRoutes);

// Sync the models and start the server
db.sequelize
  .sync()
  .then(() => {
    app.listen(8080, () => {
      console.log(`[${new Date().toISOString()}] Server running on port 8080`);
    });
  })
  .catch((err) => {
    console.error(`[${new Date().toISOString()}] Failed to sync database:`, err);
  });
