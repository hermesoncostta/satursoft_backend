const Sequelize = require('sequelize')


const connection = new Sequelize('satursoft', 'satursoft', 'H09m20m21p07@', {
    host: 'satursoft.mysql.dbaas.com.br',
    dialect: 'mysql'
})

module.exports = connection;