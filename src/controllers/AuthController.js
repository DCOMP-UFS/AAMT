const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, // 1 dia em segundos
  });
}

authenticate = async (req, res) => {
  const { usuario, senha } = req.body;
  
  const user = await Usuario.findOne({ 
    where: {
      usuario
    }
  });

  if(!user) 
    return res.status(400).send({ error: 'User not found' });
  
  if( !bcrypt.compareSync(senha, user.senha) )
    return res.status(400).send({ error: 'Invalid password' });

  user.senha = undefined;

  res.send({ 
    user, 
    token: generateToken({ id: user.id }) 
  });
}

router.post('/authenticate', authenticate);

module.exports = app => app.use('/auth', router);