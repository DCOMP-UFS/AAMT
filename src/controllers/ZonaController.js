const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Localidade = require('../models/Localidade');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');

// UTILITY
const isCoordinator = require('../util/isCoordinator');

getByCityId = async (req, res) => {
  const { municipio_id } = req.params;

  const municipio = await Municipio.findByPk( municipio_id );

  if( !municipio ) {
    return res.status(400).json({ error: "Município não existe" });
  }

  const zonas = await Zona.findAll({
    where: {
      municipio_id
    },
    include: [
      { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'localidade_id', 'municipio_id' ]
    },
    order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
  });

  return res.json( zonas );
}

getByLocationId = async (req, res) => {
  const { localidade_id } = req.params;

  const localidade = await Localidade.findByPk( localidade_id );

  if( !localidade ) {
    return res.status(400).json({ error: "Localidade não existe" });
  }

  const zonas = await Zona.findAll({
    where: {
      localidade_id
    },
    include: [
      { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'localidade_id', 'municipio_id' ]
    },
    order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
  });

  return res.json( zonas );
}

getById = async (req, res) => {
  const { id } = req.params;

  const zona = await Zona.findByPk( id, {
    include: [
      { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'localidade_id', 'municipio_id' ]
    }
  });

  if( !zona ) {
    return res.status(400).json({ error: "Zona não existe" });
  }

  return res.json( zona );
}

store = async (req, res) => {
  const { municipio_id } = req.params;
  const { localidade_id } = req.body;
  const userId = req.userId;
  let nome = 'a';

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const municipio = await Municipio.findByPk(municipio_id);

  if(!municipio) {
    return res.status(400).json({ error: 'Município não encontrada' });
  }

  if( localidade_id ) {
    const localidade = await Localidade.findByPk(localidade_id);

    if(!localidade) {
      return res.status(400).json({ error: 'Localidade não encontrada' });
    }
  }

  const zonas = await Zona.findAll({
    where: {
      municipio_id
    },
    order: [['createdAt', 'desc']]
  });

  if( zonas.length > 0 ) {
    if( zonas[0].nome !== 'unica' ) {
      let lastNome = zonas[0].nome;
  
      let lastChar = lastNome[lastNome.length - 1];
  
      lastNome = lastNome.substring(0, lastNome.length - 1);
      
      if( lastChar.charCodeAt(0) >= 122 ) {
        // make last char a and append a
        lastChar = String.fromCharCode(97) + String.fromCharCode(97);
      } else {
        // Increase last char
        lastChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
      }
  
      nome = lastNome + lastChar;
    }
  }else {
    nome = 'unica';
  }

  const zona = await Zona.create({ 
    nome,
    municipio_id,
    localidade_id,
    ativo: 1
  });

  const result = await Zona.findByPk( zona.id, {
    include: [
      { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'localidade_id', 'municipio_id' ]
    }
  });

  return res.status(201).json(result);
}

update = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { localidade_id, municipio_id } = req.body;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const zona = await Zona.findByPk( id );
  if( !zona ) {
    return res.status(400).json({ error: 'Zona não encontrada' });
  }

  if( localidade_id ) {
    const localidade = await Localidade.findByPk( id );
    if( !localidade ) {
      return res.status(400).json({ error: 'Localidade não encontrada' });
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

  const { isRejected } = await Zona.update(
    req.body,
    {
      where: {
        id
      },
      include: [
        { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'localidade_id', 'municipio_id' ]
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar usuário' });
  }

  const result = await Zona.findByPk( id,  {
    include: [
      { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'localidade_id', 'municipio_id' ]
    }
  });

  return res.json( result );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', getById);
router.get('/:municipio_id/municipios', getByCityId);
router.get('/:localidade_id/localidades', getByLocationId);
router.post('/:municipio_id/municipios', store);
router.put('/:id', update);

module.exports = app => app.use('/zonas', router);