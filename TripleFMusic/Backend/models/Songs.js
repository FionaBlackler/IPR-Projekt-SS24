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
    mp3:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover:{
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Song.associate = (models) => {
    Song.belongsTo(models.Playlist, {
      foreignKey: 'PlaylistId',
      onDelete: 'CASCADE'
    });
  };

  return Song;
};
