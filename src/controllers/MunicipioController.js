const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Usuario = require('../models/Usuario');

const router = express.Router();

index = async (req, res) => {
  const { municipio_id } = req.params;

  const municipioFind = await Municipio.findByPk(municipio_id);

  if( !municipioFind ) {
    return res.status(400).json({ error: 'Município não encontrado' });
  }

  const user = await Usuario.findByPk( req.userId, {include: { association: 'municipio' }} );

  if( !user ) {
    return res.status(401).json({ error: 'Usuário não existe' });
  }

  if( user.tipoPerfil !== "C" || user.municipio.id !== parseInt(municipio_id) ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const municipio = await Municipio.findByPk(municipio_id, {
    include: {
      association: 'usuarios'
    }
  });

  return res.json(municipio.usuarios);
}

store = async (req, res) => {
  const { codigo, nome } = req.body;

  const municipio = await Municipio.create({ 
    codigo,
    nome
  });

  return res.json(municipio);
}

router.use(authMiddleware);

router.get('/:municipio_id/usuarios', index);
router.post('/', store);

module.exports = app => app.use('/municipios', router);