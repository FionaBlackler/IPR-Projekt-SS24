// migrations/<timestamp>-create-songs.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mp3File: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jpgFile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      songTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artist: {
        type: Sequelize.STRING,
        allowNull: false
      },
      selectedPlaylists: {
        type: Sequelize.JSON,
        allowNull: false
      },
      selectedGenres: {
        type: Sequelize.JSON,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};
