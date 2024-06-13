require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json').development;

// Initialize Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Define the Song model
const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filepath: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Function to read file paths from the songs directory
const readFilePaths = (dir) => {
  let filepaths = [];
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      filepaths = filepaths.concat(readFilePaths(fullPath));
    } else {
      filepaths.push(fullPath);
    }
  });
  return filepaths;
};

const populateDatabase = async () => {
  try {
    // Sync the Song model with the database
    await Song.sync({ force: true });
    
    // Read file paths from the songs directory
    const songDirectory = path.join(__dirname, 'songs');
    const filepaths = readFilePaths(songDirectory);
    
    // Insert file paths into the Songs table
    for (const filepath of filepaths) {
      await Song.create({ filepath });
    }
    
    console.log('Database populated with song file paths.');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await sequelize.close();
  }
};

// Execute the function
populateDatabase();
