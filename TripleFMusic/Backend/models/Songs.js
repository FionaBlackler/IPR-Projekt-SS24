module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    mp3FilePath: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jpgFilePath: {
      type: DataTypes.TEXT,
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
