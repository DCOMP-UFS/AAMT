const express = require('express');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth');
const Usuario = require('../models/Usuario');

const router = express.Router();

index = async (req, res) => {
  const usuarios = await Usuario.findAll();

  return res.json(usuarios);
}

store = async (req, res) => {
  const { 
    nome,
    cpf,
    rg,
    celular,
    email,
    usuario,
    senha,
    tipoPerfil,
    ativo 
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const senhaHash = bcrypt.hashSync(senha, salt);

  const user = await Usuario.create({ 
    nome,
    cpf,
    rg,
    celular,
    email,
    usuario,
    senha: senhaHash,
    tipoPerfil,
    ativo 
  });

  return res.json(user);
}

router.use(authMiddleware);

router.get('/', index);
router.post('/', store);

module.exports = app => app.use('/usuarios', router);