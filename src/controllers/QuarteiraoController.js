const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');
const Localidade = require('../models/Localidade');
const Quarteirao = require('../models/Quarteirao');
const Rua = require('../models/Rua');
const Lado = require('../models/Lado');
const { Op } = require("sequelize");
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
  const { municipio_id }  = req.params;
  const whereAtivo        = req.query.ativo == '1' || req.query.ativo == '0' ? 
    { ativo: parseInt( req.query.ativo ) } : 
    {};

  const municipio = await Municipio.findOne({
    where: {
      id: municipio_id
    },
    include: {
      association: 'localidades',
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: {
        where: whereAtivo,
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

  if(!numero) return res.status(400).json({ erro: "Informe o nuemro da quarteirão" });
  if(!localidade_id) return res.status(400).json({ erro: "Informe o id de localidade do quarteirão" });
  if(!lados) return res.status(400).json({ erro: "Informe a lados do quarteirão" });

  try{
    const allow = await allowFunction( userId, 'manter_quarteirao' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const localidade = await Localidade.findByPk( localidade_id, {
      include: {
        association: 'municipio',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      }
    });
    if( !localidade ) {
      return res.status(400).json({ error: 'Localidade não existe' });
    }
    
    const municipio_id = localidade.dataValues.municipio_id
    const municipio_nome = localidade.dataValues.municipio.nome

    //Verifica se ja existe um quarteirão no mesmo municipio
    //com o mesmo codigo
    const quarteiraoExiste = await Quarteirao.findOne({
      include: {
          association: 'localidade',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          where:{municipio_id},
      },
      where: {numero}
    });
   
    if( quarteiraoExiste ) {
      return res.status(400).json({
        alreadyExist:true,
        error: `Já existe quarteirão com o número ${numero} registrado no municipio ${municipio_nome}`
      });
    }

    if( quarteirao_id ) {
      const quarteiraoFather = await Quateirao.findByPk( quarteirao_id );

      if( !quarteiraoFather ) {
        return res.status(400).json({
          fragmentFail:true, 
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

    const quarteirao = await Quarteirao.create({
      numero,
      localidade_id,
      zona_id,
      quarteirao_id
    });

    for ( const l of lados ) {
      if( l.rua_id ) {
        await createSide( l.numero, quarteirao.id, l.rua_id );
      } else {
        const rua = await Rua.create({
          nome: l.logradouro,
          cep: l.cep,
          localidade_id: l.localidade_id
        });

        await createSide( l.numero, quarteirao.id, rua.id );
      }
    }
    
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
  } catch(e){
    return res.status(400).json({
      error: "Não foi possível cadastrar este quarteirão, falha na API ou no Banco"
    });
  }
}

update = async ( req, res ) => {
  const { numero, zona_id, ativo, quarteirao_id, lados, localidade_id } = req.body;
  const { id } = req.params;

  const userId = req.userId;

  if(!numero) return res.status(400).json({ erro: "Informe o numero da quarteirão" });
  if(ativo == null) return res.status(400).json({ erro: "Informe se o quarteirão é ativo ou não" });
  if(!localidade_id) return res.status(400).json({ erro: "Informe o id de localidade do quarteirão" });
  if(!lados) return res.status(400).json({ erro: "Informe a lados do quarteirão, mesmo que seja uma lista vazia" });

  try{
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
      if( !zona )
        return res.status(400).json({ error: 'Zona não existe' });
    }

    //Procura localidade e o municipio do quarteirão
    const localidade = await Localidade.findByPk( localidade_id, {
      include: {
        association: 'municipio',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      }
    });
    if( !localidade ) {
      return res.status(400).json({ error: 'Localidade não existe' });
    }
    
    const municipio_id = localidade.dataValues.municipio_id
    const municipio_nome = localidade.dataValues.municipio.nome

    //Verifica se ja existe um quarteirão no mesmo municipio
    //com o mesmo codigo
    const quarteiraoExiste = await quarteiraoExistente(id,municipio_id, numero)
    if( quarteiraoExiste ) {
      return res.status(400).json({
        alreadyExist:true,
        error: `Já existe quarteirão com o número ${numero} registrado no municipio ${municipio_nome}`
      });
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

    lados.forEach(async l => {
      // Lado já existente
      if (l.id) {
        // Lado com rua já cadastrada
        if (l.rua_id) {
          await updateSide( l.id, l.numero, id, l.rua_id );
        } else {
          // Lado sem rua cadastrada
          const rua = await findOrCreateStreet(
            l.logradouro,
            l.localidade_id,
            l.cep
          );
          await updateSide(l.id, l.numero, id, rua.id);
        }
      // Lado a ser cadastrado
      } else {
        // Lado com rua já cadastrada
        if( l.rua_id ) {
          await createSide( l.numero, id, l.rua_id );
        } else {
          // Lado sem rua cadastrada
          const rua = await findOrCreateStreet(
            l.logradouro,
            l.localidade_id,
            l.cep
          );
          await createSide(l.numero, id, rua.id);
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
  } catch(e){
    console.log(e)
    return res.status(400).json({ error: 'Não foi possível atualizar o quarteirão,falha na API ou no banco' });
  }
}

disabled = async ( req, res ) => {
  const { id } = req.params;

  const userId = req.userId;

  const allow = await allowFunction( userId, 'manter_quarteirao' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

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

  if( isRejected )
    return res.status(400).json({ error: 'Não foi possível atualizar o quarteirão' });

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

/**
 * Consulta os lados de um quarteirão.
 * 
 * @params integer id
 * @return array lados
 */
getLadosQuarteirao = async ( req, res ) => {
  const { id } = req.params;

  // Checando se o ID existe
  const quarteirao = await Quarteirao.findByPk( id );

  if( !quarteirao )
    return res.status( 400 ).json({ error: 'Quarteirão não existe' });

  const lados = await Lado.findAll({
    where: {
      quarteirao_id: id
    },
    include: {
      association: 'rua'
    }
  });

  res.json( lados );
}

/**
 * Excluir um lado do quarteirão e atribuir seus imóveis a outro lado
 * 
 * @params integer id
 * @return array lados
 */
 excluirLadoPorId = async ( req, res ) => {
  const { excluirLadoId } = req.params;
  const { addImovelLadoId }     = req.body;

  // Checando se o ID existe
  const excluirLado = await Lado.findByPk( excluirLadoId );
  const addLado     = await Lado.findByPk( addImovelLadoId );

  if( !excluirLado && !addLado )
    return res.status( 400 ).json( { error: 'Não é possível excluir o lado, um dos lados não existe' } );

  if( excluirLado.quarteirao_id !== addLado.quarteirao_id )
    return res.status( 400 ).json( { error: 'Não é permitido adicionar imóveis a um quarteirão diferente' } );

  let sql = `UPDATE imoveis SET lado_id = $1 WHERE lado_id = $2`;

  await Lado.sequelize.query( sql, 
    {
      bind: [ addLado.id, excluirLado.id ],
      logging: console.log,
    }
  );

  excluirLado.destroy();

  res.json( { mensage: 'Lado removido com sucesso' } );
}

async function quarteiraoExistente(id,municipio_id, numero){

  var filtro = {numero: numero}
  if(id)
    filtro.id = {[Op.ne]: id}
  
  //Verifica se ja existe um quarteirão no mesmo municipio
  //com o mesmo codigo
  const quarteiraoExiste = await Quarteirao.findOne({
    include: {
        association: 'localidade',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        where:{municipio_id},
    },
    where: {...filtro}
  });
  console.log("-----------")
  console.log(quarteiraoExiste)
  console.log("-----------")
  if( quarteiraoExiste ) return true
  
  return false
  
}

const router = express.Router();
router.use( authMiddleware );

router.get( '/:id', index );
router.get(  '/lados/:id', getLadosQuarteirao  );
router.get( '/:municipio_id/municipios', getBlockByCity );
router.post( '/', store );
router.put( '/:id/desativar', disabled );
router.put( '/:id', update );
router.post( '/excluirLado/:excluirLadoId', excluirLadoPorId );

module.exports = app => app.use( '/quarteiroes', router );