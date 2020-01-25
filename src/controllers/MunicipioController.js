const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');

const router = express.Router();

index = async (req, res) => {
  const { municipio_id } = req.params;

  const municipio = await Municipio.findByPk(municipio_id, {
    include: { association: 'usuarios' }
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