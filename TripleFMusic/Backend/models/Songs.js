module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    mp3FilePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jpgFilePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    songTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedPlaylists: {
      type: DataTypes.JSON, // array of strings
      allowNull: false,
    },
    selectedGenres: {
      type: DataTypes.JSON, // array of strings
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Songs.associate = (models) => {
    Songs.belongsTo(models.Playlist, {
      foreignKey: 'PlaylistId',
      onDelete: 'CASCADE'
    });
  };

  return Songs;
};
