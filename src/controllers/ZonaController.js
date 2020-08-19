const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');

// UTILITY
const allowFunction = require('../util/allowFunction');

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
    attributes: {
      exclude: [ 'municipio_id' ]
    },
    order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
  });

  return res.json( zonas );
}

getById = async (req, res) => {
  const { id } = req.params;

  const zona = await Zona.findByPk( id, {
    include: [
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'municipio_id' ]
    }
  });

  if( !zona ) {
    return res.status(400).json({ error: "Zona não existe" });
  }

  return res.json( zona );
}

store = async (req, res) => {
  const { municipio_id } = req.body;
  const userId = req.userId;
  let nome = 'a';

  const allow = await allowFunction( userId, 'manter_zona' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const municipio = await Municipio.findByPk(municipio_id);

  if(!municipio) {
    return res.status(400).json({ error: 'Município não encontrada' });
  }

  const zonas = await Zona.findAll({
    where: {
      municipio_id
    },
    order: [['createdAt', 'desc']]
  });

  if( zonas.length > 0 ) {
    if( zonas[0].nome !== 'única' ) {
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
    nome = 'única';
  }

  const zona = await Zona.create({ 
    nome,
    municipio_id,
    ativo: 1
  });

  const result = await Zona.findByPk( zona.id, {
    include: { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    attributes: {
      exclude: [ 'municipio_id' ]
    }
  });

  return res.status(201).json(result);
}

update = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { municipio_id } = req.body;

  const allow = await allowFunction( userId, 'manter_zona' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const zona = await Zona.findByPk( id );
  if( !zona ) {
    return res.status(400).json({ error: 'Zona não encontrada' });
  }

  if( municipio_id ) {
    const municipio = await Municipio.findByPk( id );
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
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar a zona' });
  }

  const result = await Zona.findByPk( id,  {
    include: [
      { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
    ],
    attributes: {
      exclude: [ 'municipio_id' ]
    }
  });

  return res.json( result );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', getById);
router.get('/:municipio_id/municipios', getByCityId);
router.post('/', store);
router.put('/:id', update);

module.exports = app => app.use('/zonas', router);