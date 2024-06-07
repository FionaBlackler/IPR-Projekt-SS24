import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

await User.sync({ force: true });
console.log('The table for the User model was just (re)created!');
