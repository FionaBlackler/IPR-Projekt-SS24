module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define("Song", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Song.associate = (models) => {
    Song.belongsTo(models.Playlist, {
      foreignKey: 'PlaylistId',
      onDelete: 'CASCADE'
    });
  };

  return Song;
};
