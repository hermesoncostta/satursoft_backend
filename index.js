require('dotenv').config()
const express = require('express')
const app = express();
const connection = require('./database/database');
const bodyParser = require('body-parser')
var cors = require('cors');
const Bank = require('./Banco/bankController')
const BankAccount = require('./BankAccount/bankAcount')
const Account = require('./BankAccount/bankAccountController')
const User = require('./User/UserController')
const Login = require('./Login/LoginController')
const Transacao = require('./Transacao/transacaoController')
const Loja = require('./Loja/lojaController')






app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());



// ROTAS
app.use('/', Bank)
app.use('/', Account)
app.use('/', User)
app.use('/', Login)
app.use('/', Transacao)
app.use('/', Loja)

// CONEXÃO COM O MYSQL
connection.authenticate().then(
    () => {
        console.log('conectado ao mysql');
    }
)

// CONEXÃO COM O BACKEND
app.listen('8080', () => {
    console.log('banco de dados online');
})