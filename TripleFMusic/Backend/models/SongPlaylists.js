module.exports = (sequelize, DataTypes) => {
    const SongPlaylists = sequelize.define('SongPlaylists', {
      songId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Songs',
          key: 'id'
        }
      },
      playlistId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Playlists',
          key: 'id'
        }
      }
    });
  
    return SongPlaylists;
  };
  