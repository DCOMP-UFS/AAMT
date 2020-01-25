const express = require('express');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth');
const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');

const router = express.Router();

index = async (req, res) => {
  const usuarios = await Usuario.findAll({
    include: { association: 'municipio' },
    attributes: {
      exclude: [ 'municipio_id' ]
    }
  });

  return res.json(usuarios);
}

store = async (req, res) => {
  const { municipio_id } = req.params;
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

  const municipio = await Municipio.findByPk(municipio_id);

  if(!municipio) {
    return res.status(400).json({ error: 'Município não encontrado' });
  }

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
    ativo ,
    municipio_id
  });

  return res.json(user);
}

router.use(authMiddleware);

router.get('/', index);
router.post('/:municipio_id/municipios', store);

module.exports = app => app.use('/usuarios', router);