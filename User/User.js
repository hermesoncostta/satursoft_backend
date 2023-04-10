const Sequelize = require('sequelize');
const connection = require('../database/database')

const User = connection.define('User', {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    access: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  });







User.sync({force: false});

module.exports = User;