const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

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

  const user = await Usuario.create({ 
    nome,
    cpf,
    rg,
    celular,
    email,
    usuario,
    senha,
    tipoPerfil,
    ativo 
  });

  return res.json(user);
}

router.get('/', index);
router.post('/', store);

module.exports = app => app.use('/usuarios', router);