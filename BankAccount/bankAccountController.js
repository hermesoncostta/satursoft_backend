const express = require('express');
const BankAccount = require('./bankAcount');
const router = express.Router()
const Bank = require('../Banco/bank')


router.get('/account/filter', async (req, res) => {

    try {
        const data = await BankAccount.findAll({});
        res.json(data);

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
})


router.get('/account/:id', async (req, res) => {
const {bankId} = req.body;
    try {
        const data = await BankAccount.findByPk(data.id, {include: bankId})  
        const conta = await data.getBank(); 




        res.json(conta);

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
})



router.post('/account/create', async (req, res) => {

    const { number_account, titular_name } = req.body;
   
    var banco = req.body.banco;

    const newAccount = new BankAccount({
        number_account: number_account,
        titular_name: titular_name,
        bankId: banco
    })


    try {
        await newAccount.save();
        res.json(newAccount)
    } catch (err) {
        res.json({ error: true, message: err.message })
    }

})


router.delete('/account/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await BankAccount.destroy({ where: { id: Number(id) } });
        return res.status(200).json({ mensagem: `O id ${id} deletado!` });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});


module.exports = router;