const { STRING } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Playlists = sequelize.define("Songs", {
        title: {
            type: DataTypes.TEXT('tiny'),
            allowNull: false,
        },
        
    })
    return Songs
}