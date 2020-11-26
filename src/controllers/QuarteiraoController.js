const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');
const Localidade = require('../models/Localidade');
const Quarteirao = require('../models/Quarteirao');
const Rua = require('../models/Rua');
const Lado = require('../models/Lado');

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  const { id } = req.params;

  const quarteirao = await Quarteirao.findByPk( id, {
    include: [
      { 
        association: 'zona', 
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      },
      { 
        association: 'localidade', 
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      },
      { 
        association: 'lados',
        attributes: { exclude: [ 'rua_id', 'createdAt', 'updatedAt' ] },
        order: [[ 'numero', 'asc' ]],
        include: [
          {
            association: 'rua',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
          },
          {
            association: 'imoveis',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            order: [[ 'numero', 'asc' ]]
          }
        ]
      }
    ],
    attributes: {
      exclude: [ 'zona_id' ]
    }
  });

  if( !quarteirao ) {
    return res.status(400).json({ error: "Quarteirão não existe" });
  }

  return res.json( quarteirao );
}

getBlockByCity = async (req, res) => {
  const { municipio_id } = req.params;

  const municipio = await Municipio.findOne({
    where: {
      id: municipio_id
    },
    include: {
      association: 'localidades',
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: {
        association: 'quarteiroes',
        include: [
          {
            association: 'localidade',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          },
          {
            association: 'zona',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
          }
        ]
      }
    }
  });

  if( !municipio ) {
    return res.status(400).json({ error: "Município não existe" });
  }

  let quarteirao = [];
  municipio.localidades.forEach( localidade => {
    quarteirao = [ ...localidade.quarteiroes, ...quarteirao ];
  });

  return res.json( quarteirao );
}

const createSide = async (numero, quarteirao_id, rua_id) => {
  const lado = await Lado.create({ numero, quarteirao_id, rua_id });

  return lado;
}

const findOrCreateStreet = async ( nome, localidade_id, cep ) => {
  const [ rua ] = await Rua.findOrCreate({
    where: {
      nome,
      localidade_id
    },
    defaults: { 
      nome,
      cep,
      localidade_id
    }
  });

  return rua;
}

const createStreet = async ( nome, localidade_id, cep ) => {
  const rua = await Rua.create({
    nome,
    cep,
    localidade_id
  });

  return rua;
}

const updateSide = async ( id, numero, quarteirao_id, rua_id ) => {
  const { isRejected } = await Lado.update(
    {
      id,
      numero,
      quarteirao_id,
      rua_id
    },
    {
      where: {
        id
      }
    }
  );

  return isRejected;
}

store = async ( req, res ) => {
  const { numero, localidade_id, zona_id, quarteirao_id, lados } = req.body;
  const userId = req.userId;

  const allow = await allowFunction( userId, 'manter_quarteirao' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  if( quarteirao_id ) {
    const quarteiraoFather = await Quateirao.findByPk( quarteirao_id );

    if( !quarteiraoFather ) {
      return res.status(400).json({ 
        error: `Não foi possível fragmentar o quarteirão pois o quarterião nº ${ quarteirao_id } não existe` 
      });
    }
  }

  if( zona_id ) {
    const zona = await Zona.findByPk( zona_id );
    if( !zona ) {
      return res.status(400).json({ error: 'Zona não existe' });
    }
  }

  const localidade = await Localidade.findByPk( localidade_id );
  if( !localidade ) {
    return res.status(400).json({ error: 'Localidade não existe' });
  }

  const quarteirao = await Quarteirao.create({
    numero,
    localidade_id,
    zona_id,
    quarteirao_id
  });

  lados.forEach( async l => {
    if( l.rua_id ) {
      await createSide( l.numero, quarteirao.id, l.rua_id );
    }else {
      const rua = await createStreet( l.logradouro, l.localidade_id, l.cep );

      await createSide( l.numero, quarteirao.id, rua.id );
    }
  });
  
  const quarteiraoFind = await Quarteirao.findByPk( quarteirao.id, {
    include: [
      { association: 'zona', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
      { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    ],
    attributes: {
      exclude: [ 'zona_id', 'localidade_id' ]
    }
  });

  return res.status(201).json( quarteiraoFind );
}

update = async ( req, res ) => {
  const { numero, zona_id, ativo, quarteirao_id, lados } = req.body;
  const { id } = req.params;

  const userId = req.userId;

  const allow = await allowFunction( userId, 'manter_quarteirao' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  if( quarteirao_id ) {
    const quarteiraoFather = await Quateirao.findByPk( quarteirao_id );

    if( !quarteiraoFather ) {
      return res.status(400).json({ 
        error: `Não foi possível fragmentar o quarteirão pois o quarterião nº ${ quarteirao_id } não existe` 
      });
    }
  }

  const zona = await Zona.findByPk( zona_id );
  if( !zona ) {
    return res.status(400).json({ error: 'Zona não existe' });
  }

  const { isRejected } = await Quarteirao.update(
    {
      numero,
      zona_id,
      ativo,
      quarteirao_id: null
    },{
      where: {
        id
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar o quarteirão' });
  }

  lados.forEach( async l => {
    if( l.id ) {
      if( l.rua_id ) {
        await updateSide( id, numero, quarteirao_id, rua_id );
      }else {
        const rua = await findOrCreateStreet( l.logradouro, l.localidade_id, l.cep );
        await updateSide( l.id, l.numero, id, rua.id );
      }
    }else {
      if( l.rua_id ) {
        await createSide( l.numero, id, l.rua_id );
      }else {
        const rua = await findOrCreateStreet( l.logradouro, l.localidade_id, l.cep );
        await createSide( l.numero, id, rua.id );
      }
    }
  });

  const quarteirao = await Quarteirao.findByPk( id, {
    include: [
      { association: 'zona' },
      { 
        association: 'lados',
        exclude: [ 'rua_id' ],
        include: {
          association: 'rua',
        } 
      }
    ],
    attributes: { exclude: [ 'zona_id' ] }
  });

  const quarteiraoFind = await Quarteirao.findByPk( quarteirao.id, {
    include: [
      { association: 'zona', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    ],
    attributes: {
      exclude: [ 'zona_id' ]
    }
  });

  return res.json( quarteiraoFind );
}

disabled = async ( req, res ) => {
  const { id } = req.params;

  const userId = req.userId;

  const allow = await allowFunction( userId, 'manter_quarteirao' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const quarteirao = await Quarteirao.findByPk( id );
  if( !quarteirao )
    return res.status( 400 ).json({ error: 'Quarteirão não existe!' });
  
  const { isRejected } = await Quarteirao.update(
    {
      ativo: 0,
    },{
      where: {
        id
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar o quarteirão' });
  }

  const quarteiraoFind = await Quarteirao.findByPk( id, {
    include: [
      { association: 'zona', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    ],
    attributes: {
      exclude: [ 'zona_id' ]
    }
  });

  return res.json( quarteiraoFind );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', index);
router.get('/:municipio_id/municipios', getBlockByCity);
router.post('/', store);
router.put('/:id/desativar', disabled);
router.put('/:id', update);

module.exports = app => app.use('/quarteiroes', router);