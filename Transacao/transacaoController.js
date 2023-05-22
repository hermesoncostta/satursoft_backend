const express = require('express')
const router = express.Router()
const Transacao = require('./transacao')

router.post('/transacao/create', async (req, res) => {
    var {
        valor,
        forma_pagamento,
        bank,
        nome_cliente,
        nsu,
        data_transacao,
        data_caixa,
        funcionario,
        loja,
        numero_venda,
        account,

    } = req.body;

    const novaTransacao = new Transacao({
        valor: valor,
        forma_pagamento: forma_pagamento,
        bank: bank,
        account: account,
        nome_cliente: nome_cliente,
        nsu: nsu,
        data_transacao: data_transacao,
        data_caixa: data_caixa,
        funcionario: funcionario,
        loja: loja,
        numero_venda: numero_venda,

    });

    try {
        await novaTransacao.save();
        res.json(novaTransacao);
    } catch (err) {
        res.json({ error: true, message: err.message });
    }


});


router.get('/transacao/filter', async (req, res) => {
    try {
        const data = await Transacao.findAll({});
        res.json(data);

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});



router.get('/transacao/filter/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const operacao = await Transacao.findOne({ where: { id } });
      
        res.json(operacao);

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});


router.put('/transacao/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const { status } = req.body;

        const operacao = await Transacao.findOne({ where: { id } });

        if (!operacao) {
            res.json({ message: "Não Encontrado" })
        } else {
            const operacao = await Transacao.update({
                status
            }, { where: { id } })

            res.json(operacao);
        }

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});


router.delete('/transacao/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Transacao.destroy({ where: { id: Number(id) } });
        return res.status(200).json({ mensagem: `A Transação ${id} deletado!` });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.post('/transacao/:id', async (req, res) => {
    const { id, status } = req.params;
    try {
        await Transacao.save(status);
        return res.status(200).json(Transacao);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});





module.exports = router;
