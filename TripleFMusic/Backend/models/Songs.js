module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    mp3File: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jpgFile: {
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
      type: DataTypes.JSON,
      allowNull: false,
    },
    selectedGenres: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Songs.associate = (models) => {
    Songs.belongsToMany(models.Playlist, {
      through: 'SongPlaylists',
      foreignKey: 'songId',
      otherKey: 'playlistId'
    });
  };

  return Songs;
};
