'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Songs', 'PlaylistId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Playlists', // name of the table
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: true, // Set to true if PlaylistId can be null
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Songs', 'PlaylistId');
  }
};
