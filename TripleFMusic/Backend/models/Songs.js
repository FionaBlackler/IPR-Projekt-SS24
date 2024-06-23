module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    mp3File: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    jpgFile: {
      type: DataTypes.TEXT('long'),
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
    Songs.belongsTo(models.Playlist, {
      foreignKey: 'PlaylistId',
      onDelete: 'CASCADE'
    });
  };

  return Songs;
};
