const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Localidade = require('../models/Localidade');
const Categoria = require('../models/Categoria');
const Municipio = require('../models/Municipio');

// UTILITY
const isCoordinator = require('../util/isCoordinator');

index = async (req, res) => {
  const localidades = await Localidade.findAll({
    include: [
      { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'categoria_id', 'municipio_id' ]
    },
    order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
  });

  return res.json( localidades );
}

getById = async (req, res) => {
  const { id } = req.params;

  const localidade = await Localidade.findByPk( id, {
    include: [
      { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'categoria_id', 'municipio_id' ]
    },
  });

  if( !localidade ) {
    return res.status(400).json({ error: "Localidade não existe" });
  }

  return res.json( localidade );
}

listByCategory = async ( req, res ) => {
  const { categoria_id } = req.params;

  const localidades = await Localidade.findAll({
    where: {
      categoria_id
    },
    include: [
      { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'categoria_id', 'municipio_id' ]
    },
    order: [
      ['nome', 'ASC'],
      ['createdAt', 'ASC'],
    ]
  });

  return res.json(localidades);
}

listByCity = async ( req, res ) => {
  const { municipio_id } = req.params;

  const localidades = await Localidade.findAll({
    where: {
      municipio_id
    },
    include: [
      { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'categoria_id', 'municipio_id' ]
    },
    order: [
      ['nome', 'ASC'],
      ['createdAt', 'ASC'],
    ]
  });

  return res.json(localidades);
}

store = async (req, res) => {
  const { categoria_id, municipio_id } = req.params;
  const { nome, codigo } = req.body;
  const userId = req.userId;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const categoria = await Categoria.findByPk(categoria_id);

  if(!categoria) {
    return res.status(400).json({ error: 'Categoria não encontrada' });
  }

  const municipio = await Municipio.findByPk(municipio_id);

  if(!municipio) {
    return res.status(400).json({ error: 'Município não encontrada' });
  }

  const localidade = await Localidade.create({ 
    nome,
    codigo,
    ativo: 1,
    categoria_id,
    municipio_id
  });

  const result = await Localidade.findByPk( localidade.id, {
    include: [
      { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'categoria_id', 'municipio_id' ]
    },
  } );

  return res.status(201).json(result);
}

update = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { categoria_id, municipio_id } = req.body;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const localidade = await Localidade.findByPk( id );
  if( !localidade ) {
    return res.status(400).json({ error: 'Localidade não encontrada' });
  }

  if( categoria_id ) {
    const categoria = await Categoria.findByPk( categoria_id );
    if( !categoria ) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }
  }

  if( municipio_id ) {
    const municipio = await Municipio.findByPk( municipio_id );
    if( !municipio ) {
      return res.status(400).json({ error: 'Município não encontrada' });
    }
  }

  req.body.id = undefined;
  req.body.createdAt = undefined;
  req.body.updatedAt = undefined;

  const { isRejected } = await Localidade.update(
    req.body,
    {
      where: {
        id
      },
      include: [
        { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'categoria_id', 'municipio_id' ]
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar usuário' });
  }

  const result = await Localidade.findByPk( id,  {
    include: [
      { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'categoria_id', 'municipio_id' ]
    }
  });

  return res.json( result );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getById);
router.get('/:categoria_id/categorias', listByCategory);
router.get('/:municipio_id/municipios', listByCity);
router.post('/:categoria_id/categorias/:municipio_id/municipios', store);
router.put('/:id', update);

module.exports = app => app.use('/localidades', router);