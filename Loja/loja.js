const Sequelize = require('sequelize')
const connection = require('../database/database')

const Loja = connection.define('loja', {
    loja_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});




Loja.sync({ force: false});



module.exports = Loja;