const express = require('express')
const router = express.Router()
const Loja = require('./loja')
const bcrypt = require('bcrypt');

router.post('/loja/create', async (req, res) => {
    const { loja_name, password } = req.body;


    //ESCOLHE UM CAMPO NO CADASTRO PARA VERIFICAÇÃO
    const lojaExistent = await Loja.findOne({
        where: {
            loja_name: req.body.loja_name
        }
    });

    // VERIFICA SE A LOJA JÁ É EXISTENTE
    if (lojaExistent) {
        return res.json({ message: 'Loja já cadastrada' })
    }

    // CRIPTOGRAFIA DA SENHA 
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt)


    // BUSCA OS DADOS PARA GUARDAR NO BANCO DE DADOS
    const newLoja = new Loja({
        loja_name: loja_name,
        password: passwordHash,
    })

    try {
        await newLoja.save();
        res.json(newLoja);

    } catch (err) {
        res.json({ error: true, message: err.mensage });

    }
});



router.get('/loja/filter', async (req, res) => {
    try {
        const data = await Loja.findAll();
        res.json(data);

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
})



router.delete('/loja/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Loja.destroy({ where: { id: Number(id) } });
        return res.status(200).json({ mensagem: `O id ${id} deletado!` });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});



module.exports = router;