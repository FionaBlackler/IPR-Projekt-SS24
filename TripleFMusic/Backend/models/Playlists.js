const { STRING } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Playlists = sequelize.define("Playlists", {
        name: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        
    })
    return Playlists
}