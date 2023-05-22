const Sequelize = require('sequelize');
const Bank = require('../Banco/bank');
const BankAccount = require('../BankAccount/bankAcount');
const connection = require('../database/database')



const Transacao = connection.define('transaction', {
    valor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    forma_pagamento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    bank:{
        type: Sequelize.STRING,
        allowNull: false
    },
    account:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_cliente:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nsu:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data_transacao:{
        type: Sequelize.DATE,
        allowNull: false
    },
    data_caixa:{
        type: Sequelize.DATE,
        allowNull: false
    },
    funcionario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    loja:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero_venda:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      extrato: {
        type: Sequelize.STRING
      }
});



Transacao.sync({ force: true});

module.exports = Transacao;