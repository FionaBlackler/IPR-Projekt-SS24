require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const apiRoutes = require("./api");
const path = require("path"); // Import path module for handling file paths


const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};


const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });

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

// Serve uploaded files statically
app.use('/uploads/mp3files', express.static(path.join(__dirname, 'uploads/mp3files')));
app.use('/uploads/jpgfiles', express.static(path.join(__dirname, 'uploads/jpgfiles')));

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
