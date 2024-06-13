'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1 &&
      file !== 'populateSongs.js'  // Exclude populateSongs.js
    );
  })
  .forEach(file => {
    console.log(`Importing model file: ${file}`);
    const modelPath = path.join(__dirname, file);
    const modelFunction = require(modelPath);
    console.log(`Type of model function for ${file}:`, typeof modelFunction);
    if (typeof modelFunction === 'function') {
      const model = modelFunction(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      console.error(`Error: ${file} does not export a function.`);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

if (db.Playlist && db.Song) {
  db.Playlist.hasMany(db.Song, {
    foreignKey: 'PlaylistId',
    onDelete: 'CASCADE',
  });
  db.Song.belongsTo(db.Playlist, {
    foreignKey: 'PlaylistId',
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
