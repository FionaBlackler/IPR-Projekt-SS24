module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define("Playlist", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure the name is unique
    },
  });

  Playlist.associate = (models) => {
    Playlist.hasMany(models.Song, {
      onDelete: "CASCADE",
    });
  };

  return Playlist;
};
