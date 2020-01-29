const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Usuario = require('../models/Usuario');

// UTILITY
const isCoordinator = require('../util/isCoordinator');

const router = express.Router();

index = async ( req, res ) => {
  const municipios = await Municipio.findAll({
    order: [[ 'nome', 'asc' ], [ 'codigo', 'asc' ]]
  });

  res.json( municipios );
}

listUser = async (req, res) => {
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
    nome,
    ativo: 1
  });

  return res.json(municipio);
}

update = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
      return res.status(403).json({ error: 'Acesso negado' });
  }

  const municipio = await Municipio.findByPk( id );
  if( !municipio ) {
    return res.status(400).json({ error: 'Município não existe' });
  }

  req.body.id = undefined;
  req.body.createdAt = undefined;
  req.body.updatedAt = undefined;

  const { isRejected } = await Municipio.update(
    req.body,
    {
      where: {
        id
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar o município' });
  }

  const result = await Municipio.findByPk( id );

  return res.json( result );
}

router.use(authMiddleware);

router.get('/', index);
router.get('/:municipio_id/usuarios', listUser);
router.post('/', store);
router.put('/:id', update);

module.exports = app => app.use('/municipios', router);