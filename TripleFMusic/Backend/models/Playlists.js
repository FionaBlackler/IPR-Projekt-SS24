module.exports = (sequelize, DataTypes) => {
    const Playlist = sequelize.define("Playlist", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Playlist.associate = (models) => {
      Playlist.hasMany(models.Song, {
        onDelete: "CASCADE",
      });
    };
  
    return Playlist;
  };
  