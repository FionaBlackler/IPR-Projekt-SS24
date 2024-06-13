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
    return Song;
  };
  