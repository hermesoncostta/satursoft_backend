const Sequelize = require('sequelize')
const connection = require('../database/database')



const Bank = connection.define('bank', {
    bankName: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    agency: {
        type: Sequelize.STRING,
        allowNull:false
    }
});





Bank.sync({ force: false});



module.exports = Bank;