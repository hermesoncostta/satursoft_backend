const Sequelize = require('sequelize')
const connection = require('../database/database')
const Bank = require('../Banco/bank')


const BankAccount = connection.define('bank_account', {
    number_account: {
        type: Sequelize.STRING,
        allowNull: false
    },
    titular_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


BankAccount.belongsTo(Bank)

Bank.hasMany(BankAccount)




BankAccount.sync({ force: false});



module.exports = BankAccount;





