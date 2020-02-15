const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');
const Quarteirao = require('../models/Quarteirao');
const Rua = require('../models/Rua');
const Lado = require('../models/Lado');

// UTILITY
const isCoordinator = require('../util/isCoordinator');

index = async ( req, res ) => {
  const { id } = req.params;

  const quarteirao = await Quarteirao.findByPk( id, {
    include: [
      { 
        association: 'zona', 
        attributes: { exclude: [ 'localidade_id', 'createdAt', 'updatedAt' ] },
        include: {
          association: 'localidade',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        } 
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

  const municipio = await Municipio.findByPk( municipio_id );

  if( !municipio ) {
    return res.status(400).json({ error: "Município não existe" });
  }

  const quarteiroes = await Quarteirao.sequelize.query(
    'SELECT ' +
      '"Quarteirao"."id", ' +
      '"Quarteirao"."numero", ' +
      '"Quarteirao"."ativo", ' +
      '"Quarteirao"."created_at" AS "createdAt", ' +
      '"Quarteirao"."updated_at" AS "updatedAt", ' +
      '"Quarteirao"."zona_id", ' +
      '"Quarteirao"."quarteirao_id", ' +
      '"zona"."nome" AS "zona.nome", ' +
      '"zona"."ativo" AS "zona.ativo", ' +
      '"zona->localidade"."id" AS "zona.localidade.id", ' +
      '"zona->localidade"."nome" AS "zona.localidade.nome", ' +
      '"zona->localidade"."codigo" AS "zona.localidade.codigo", ' +
      '"zona->localidade"."ativo" AS "zona.localidade.ativo", ' +
      '"zona->localidade->municipio"."id" AS "zona.localidade.municipio.id", ' +
      '"zona->localidade->municipio"."codigo" AS "zona.localidade.municipio.codigo", ' +
      '"zona->localidade->municipio"."nome" AS "zona.localidade.municipio.nome", ' +
      '"zona->localidade->municipio"."ativo" AS "zona.localidade.municipio.ativo", ' +
      '"zona->localidade->municipio"."regional_saude_id" AS "zona.localidade.municipio.regionalSaude_id" ' +
    'FROM ' +
      '"quarteiroes" AS "Quarteirao" ' +
      'LEFT OUTER JOIN "zonas" AS "zona" ON "Quarteirao"."zona_id" = "zona"."id"' +
      'LEFT OUTER JOIN "localidades" AS "zona->localidade" ON "zona"."localidade_id" = "zona->localidade"."id" ' +
      'LEFT OUTER JOIN "municipios" AS "zona->localidade->municipio" ON "zona->localidade"."municipio_id" = "zona->localidade->municipio"."id" ' +
    'WHERE' +
      '"zona->localidade->municipio".id = $1 ' + 
      'ORDER BY ' +
        '"Quarteirao"."ativo" DESC, ' +
        '"Quarteirao"."numero" ASC,  ' +
        '"Quarteirao"."created_at" ASC;',
    {
      bind: [ municipio_id ],
      logging: console.log,
      plain: false,
      model: Quarteirao,
      mapToModel: true,
    }
  );

  const quarteiroesMap = quarteiroes.map( q => ({
    id: q.id,
    numero: q.numero,
    ativo: q.ativo,
    createdAt: q.createdAt,
    updatedAt: q.updatedAt,
    quarteirao_id: q.quarteirao_id,
    zona: {
      id: q.zona_id,
      nome: q.dataValues["zona.nome"],
      ativo: q.dataValues["zona.ativo"],
    },
    localidade: {
      id: q.dataValues["zona.localidade.id"],
      nome: q.dataValues["zona.localidade.nome"],
      codigo: q.dataValues["zona.localidade.codigo"],
      ativo: q.dataValues["zona.localidade.ativo"],
    },
    municipio: {
      id: q.dataValues["zona.localidade.municipio.id"],
      codigo: q.dataValues["zona.localidade.municipio.codigo"],
      nome: q.dataValues["zona.localidade.municipio.nome"],
      ativo: q.dataValues["zona.localidade.municipio.ativo"],
      regionalSaude_id: q.dataValues["zona.localidade.municipio.regionalSaude_id"],
    }
  }));

  return res.json( quarteiroesMap );
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
  const { numero, zona_id, quarteirao_id, lados } = req.body;
  const userId = req.userId;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
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

  const quarteirao = await Quarteirao.create({
    numero,
    zona_id,
    quarteirao_id
  });

  await lados.forEach(async l => {
    if( l.rua_id ) {
      await createSide( l.numero, quarteirao.id, l.rua_id );
    }else {
      const rua = await findOrCreateStreet( l.logradouro, l.localidade_id, l.cep );

      await createSide( l.numero, quarteirao.id, rua.id );
    }
  });

  const quarteiraoFind = await Quarteirao.findByPk( quarteirao.id, {
    include: [
      { association: 'zona', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    ],
    attributes: {
      exclude: [ 'zona_id' ]
    }
  });

  return res.status(201).json( quarteiraoFind );
}

update = async ( req, res ) => {
  const { numero, zona_id, ativo, quarteirao_id, lados } = req.body;
  const { id } = req.params;

  const userId = req.userId;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
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

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', index);
router.get('/:municipio_id/municipios', getBlockByCity);
router.post('/', store);
router.put('/:id', update);

module.exports = app => app.use('/quarteiroes', router);