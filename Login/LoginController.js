// const express = require('express')
// const router = express.Router()
// const User = require('../User/User')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


// router.post('/login/entry', async (req, res) => {
//     const { userName, password } = req.body;
//     const { access} = req.params;
//     // Validação
//     if (!userName || !password) {
//       return res.json({ error: true, message: "Usuário ou senha inválidos" })
//     }
  
//     // Verificar se o usuário existe
//     const user = await User.findOne({ userName })
  
//     if (!user) {
//       return res.json({ error: true, message: 'Usuário não encontrado' })
//     }
  
//     // Verificar se a senha confere
//     const checkPassword = await bcrypt.compare(password, user.password)
  
//     if (!checkPassword) { 
//       return res.json({ error: true, message: 'Senha inválida'})
//     }
  
//     try {
//       const secret = process.env.SECRET 
//       const token = jwt.sign({ id: user._id }, secret)
  
     
//       // Inclui o campo "access" na resposta JSON
//       return res.json({ userName, access, token })
//       , console.log(user.access);
  
//     } catch(err) {
//       console.log(err);
//       res.status(500).json({ error: true, message: err.message})
//     }
//   });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../User/User')

router.post('/login/entry', async (req, res) => {
  const { userName, password } = req.body;

  // Validação
  if (!userName || !password) {
    return res.json({ error: true, message: "Usuário ou senha inválidos" });
  }

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return res.json({ error: true, message: 'Usuário não encontrado' });
    }

    // Verificar se a senha confere
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) { 
      return res.json({ error: true, message: 'Senha inválida' });
    }

    // Gerar token JWT
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id }, secret);

    // Retornar token JWT com campo "access" do usuário
    return res.json({ userName, access: user.access, token });
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;