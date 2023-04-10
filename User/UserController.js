const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcrypt');

router.post('/user/create', async (req, res) => {
    const { userName, password, access } = req.body;


    //ESCOLHE UM CAMPO NO CADASTRO PARA VERIFICAÇÃO
    const userExistent = await User.findOne({
        where: {
            userName: req.body.userName
        }
    });

    // VERIFICA SE O USUARIO JÁ É EXISTENTE
    if (userExistent) {
        return res.json({ message: 'Usuario já cadastrado' })
    }

    // CRIPTOGRAFIA DA SENHA 
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt)


    // BUSCA OS DADOS PARA GUARDAR NO BANCO DE DADOS
    const newUser = new User({
        userName: userName,
        password: passwordHash,
        access: access
    })

    try {
        await newUser.save();
        res.json(newUser);

    } catch (err) {
        res.json({ error: true, message: err.mensage });





    }




})



router.get('/user/filter', async (req, res) => {
    try {
        const data = await User.findAll();
        res.json(data);

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
})



router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({ where: { id: Number(id) } });
        return res.status(200).json({ mensagem: `O id ${id} deletado!` });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});



module.exports = router;