const authMiddleware = require('../middlewares/auth');
const express = require('express');
const Sequelize = require('sequelize')
const Atividade = require('../models/Atividade');
const Ciclo = require('../models/Ciclo');
const Municipio = require('../models/Municipio');

// UTILITY
const allowFunction = require('../util/allowFunction');

/**
 * Esta função retorna a lista de ciclos de uma regional
 * 
 * @params {Integer} regionalSaude_id
 */
getCiclosPorRegional = async ( req, res ) => {
  const { regionalSaude_id } = req.params;

  const allow = await allowFunction( req.userId, 'definir_ciclo' );
  if( !allow ) 
    return res.status( 403 ).json( { error: 'Acesso negado' } );

  const ciclos = await Ciclo.findAll( {
    where: {
      regional_saude_id: regionalSaude_id
    },
    include: [
      {
        association: 'regional',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
      }
    ],
    order: [ 
      [ 'ano', 'desc' ], 
      [ 'sequencia', 'asc' ]
    ]
  } );

  return res.json( ciclos );
}

/**
 * Essa função consulta um ciclo pelo ID
 * @params {Integer} id
 */
getCiclo = async ( req, res ) => {
  const { id } = req.params;

  const ciclo = await Ciclo.findByPk( id, {
    include: {
      association: 'atividades',
      attributes:{ exclude: [ 'createdAt', 'updatedAd' ] },
      where: {
        responsabilidade: 1
      },
      include: [
        { association: 'metodologia', attributes:{ exclude: [ 'createdAt', 'updatedAd' ] } },
        { association: 'objetivo', attributes:{ exclude: [ 'createdAt', 'updatedAd' ] } }
      ]
    }
  } );

  if( !ciclo )
    return res.status( 400 ).json( { error: 'Ciclo não existe' } );

  return res.json( ciclo );
}

/**
 * Consultar ciclo, em aberto de uma regional
 * @params {Integer} regionalSaude_id
 */
getCicloAberto = async ( req, res ) => {
  const { regionalSaude_id }  = req.params;
  const [ m, d, Y ]           = new Date().toLocaleDateString( 'en-US' ).split( '/' );
  const current_date          = `${ Y }-${ m }-${ d }`;

  const ciclos = await Ciclo.findOne( {
    where: Sequelize.and(
      { regional_saude_id: regionalSaude_id } ,
      Sequelize.where(
        Sequelize.fn( 'date', Sequelize.col( 'data_inicio' ) ),
        '<=', current_date
      ),
      Sequelize.where(
        Sequelize.fn( 'date', Sequelize.col( 'data_fim' ) ),
        '>=', current_date
      )
    )
  } );

  return res.json( ciclos );
}

/**
 * Consultar os ciclos de uma regional de um determinado ano
 * @params {Integer} ano
 * @params {Integer} regionalSaude_id
 */
getCiclosPorAno = async ( req, res ) => {
  const { ano, regionalSaude_id } = req.params;

  const ciclos = await Ciclo.findAll( {
    where: {
      regional_saude_id: regionalSaude_id,
      ano
    },
    include: {
      association: 'atividades'
    }
  } );

  return res.json( ciclos );
}

/**
 * Consultar os ciclos cujo a data fim é maior que a data atual
 * @params {Integer} regionalSaude_id
 */
getCiclosPermitidos = async ( req, res ) => {
  const { regionalSaude_id }  = req.params;
  let current_date            = new Date();

  current_date.setHours( 0, 0, 0, 0 );

  const ciclos = await Ciclo.findAll( {
    where: {
      regional_saude_id: regionalSaude_id,
      dataFim: {
        [Sequelize.Op.gt]: current_date
      }
    }
  } );

  return res.json( ciclos );
}

store = async ( req, res ) => {
  const { ano, sequencia, dataInicio, dataFim, regionalSaude_id, atividades } = req.body;

  const allow = await allowFunction( req.userId, 'definir_ciclo' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const ciclo = await Ciclo.create({
    ano,
    sequencia,
    dataInicio,
    dataFim,
    regional_saude_id: regionalSaude_id
  });

  if( atividades ) {
    for (const atividade of atividades) {
      const { abrangencia, metodologia_id, objetivo_id, objetivoAtividade, flTodosImoveis } = atividade;
      const municipios = await Municipio.findAll({
        where: {
          regional_saude_id: regionalSaude_id
        }
      });

      for (const municipio of municipios) {
        const { id: municipio_id } = municipio.dataValues;

        await Atividade.create({
          abrangencia, 
          objetivoAtividade, 
          flTodosImoveis,
          situacao: 1,
          responsabilidade: 1,
          ciclo_id: ciclo.id,
          municipio_id,
          metodologia_id, 
          objetivo_id
        });
      }
    }
  }

  return res.status(201).json( ciclo );
}

update = async ( req, res ) => {
  const { id } = req.params
  const current_date = new Date();

  const allow = await allowFunction( req.userId, 'definir_ciclo' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  let ciclo = await Ciclo.findByPk( id );
  if( !ciclo )
    return res.status(400).json({ error: 'Ciclo não existe' });

  if( ciclo.dataInicio < current_date && ciclo.dataFim > current_date )
    return res.status(400).json({ error: 'Não é possível alterar ciclo em aberto!' });

  req.body.id = undefined;
  req.body.createdAt = undefined;
  req.body.updatedAt = undefined;

  const { isRejected } = await Ciclo.update(
    req.body,
    {
      where: {
        id
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar o ciclo' });
  }

  ciclo = await Ciclo.findByPk( id );

  return res.json(ciclo);
}

destroy = async ( req, res ) => {
  const { id } = req.params;
  const current_date = new Date();

  const allow = await allowFunction( req.userId, 'definir_ciclo' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  await Atividade.destroy({
    where: {
      ciclo_id: id
    }
  });

  const deleted = await Ciclo.destroy({
    where: {
      id,
      [Sequelize.Op.or]: [
        {
          dataInicio: {
            [Sequelize.Op.gt]: current_date
          }
        },
        {
          dataFim: {
            [Sequelize.Op.lt]: current_date
          }
        }
      ]
    }
  });

  if( deleted ) 
    return res.json({ message: "Ciclo deletado" });

  return res.status(200).json({ message: "Não é permitido excluír ciclo aberto!" });
}

destroyMultiple = async ( req, res ) => {
  const { id } = req.params;

  console.log('-> ' + id);

  const allow = await allowFunction(req.userId, 'definir_ciclo');
  if (!allow) return res.status(403).json({ error: 'Acesso negado' });

  const ciclo = await Ciclo.findByPk(id);

  if (!ciclo) {
    return res.status(400).json({ error: 'Ciclo não existe' });
  }

  const { sequencia, ano, regional_saude_id } = ciclo;

  const ciclosDaqueleAno = await Ciclo.findAll({
    where: {
      regional_saude_id,
      ano,
      sequencia: {
        [Sequelize.Op.gte]: sequencia
      },
    }
  });

  for (const cl of ciclosDaqueleAno) {
    const today = new Date();
    const dataInicio = new Date(cl.dataInicio);
    const dataFim = new Date(cl.dataFim);
    if (today >= dataInicio) {
      return res
        .status(400)
        .json({
          error: `O ciclo de sequencia ${cl.sequencia} não pode ser excluído pois já foi encerrado`,
        });
    }
    if (today >= dataInicio) {
      return res.status(400).json({ error: `O ciclo de sequencia ${cl.sequencia} não pode ser excluído pois está em andamento` })
    }
  }

  const ciclosASeremExcluidos = ciclosDaqueleAno.map(ciclo => ciclo.id);

  const ciclosExcluidos = await Ciclo.destroy({
    where: {
      id: {
        [Sequelize.Op.in]: ciclosASeremExcluidos
      }
    }
  });

  if (ciclosExcluidos)
    return res.json({ ids: ciclosASeremExcluidos });
}

const router = express.Router();
router.use( authMiddleware );

router.get( '/:regionalSaude_id/regionaisSaude', getCiclosPorRegional );
router.get( '/open/:regionalSaude_id/regionaisSaude', getCicloAberto );
router.get( '/allowedCycles/:regionalSaude_id/regionaisSaude', getCiclosPermitidos );
router.get( '/:ano/:regionalSaude_id/regionaisSaude', getCiclosPorAno );
router.get( '/:id', getCiclo );
router.put( '/:id', update );
router.post( '/', store );
// router.delete( '/:id', destroy );
router.delete('/:id', destroyMultiple);

module.exports = app => app.use('/ciclos', router);