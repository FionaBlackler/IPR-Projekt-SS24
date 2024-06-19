module.exports = (sequelize, DataTypes) => {
    const PasswordResetToken = sequelize.define("PasswordResetToken", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return PasswordResetToken;
  };