module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Playlist.associate = (models) => {
    Playlist.belongsToMany(models.Songs, {
      through: 'SongPlaylists',
      foreignKey: 'playlistId',
      otherKey: 'songId'
    });
  };

  return Playlist;
};
