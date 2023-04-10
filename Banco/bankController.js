const express = require('express');
const router = express.Router()
const Bank = require('./bank')



router.get('/bank/filter', async (req, res) => {
    try {
        const data = await Bank.findAll({});
        res.json(data);

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
})




router.post('/bank/create', async (req, res) => {
    var { bankName, agency } = req.body;

    const newBank = new Bank({
        bankName: bankName,
        agency: agency,
      
    })

    try {
        await newBank.save()
        res.json(newBank);
    } catch (err) {
        res.json({ error: true, message: err.message });
    }


})



module.exports = router;