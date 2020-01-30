const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Categoria = require('../models/Categoria');
const Localidade = require('../models/Localidade');

// UTILITY
const isCoordinator = require('../util/isCoordinator');

index = async ( req, res ) => {
  const categorias = await Categoria.findAll({
    order: [[ "nome", "asc" ]]
  });

  res.json( categorias );
}

store = async (req, res) => {
  const { nome, descricao } = req.body;

  const categoria = await Categoria.create({ 
    nome,
    descricao,
    ativo: 1
  });

  return res.status(201).json(categoria);
}

update = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const categoria = await Categoria.findByPk( id );
  if( !categoria ) {
    return res.status(400).json({ error: 'Está categoria não existe' });
  }

  req.body.id = undefined;
  req.body.createdAt = undefined;
  req.body.updatedAt = undefined;

  const { isRejected } = await Categoria.update(
    req.body,
    {
      where: {
        id
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar a categoria' });
  }

  const result = await Categoria.findByPk( id );

  return res.json( result );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/', index);
router.post('/', store);
router.put('/:id', update);

module.exports = app => app.use('/categorias', router);