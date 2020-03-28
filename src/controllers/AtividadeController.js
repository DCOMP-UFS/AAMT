const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Atividade = require('../models/Atividade');
const Ciclo = require('../models/Ciclo');
const Municipio = require('../models/Municipio');
const Localidade = require('../models/Localidade');
const Zona = require('../models/Zona');
const Quarteirao = require('../models/Quarteirao');
const Estrato = require('../models/Estrato');
const SituacaoQuarteirao = require('../models/SituacaoQuarteirao');

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  const { ciclo_id, municipio_id } = req.params;

  const municipio = await Municipio.findByPk( municipio_id );
  if( !municipio )
    return res.status(400).json({ message: "Município não existe" });

  const atividades = await Atividade.findAll({
    where: {
      municipio_id,
      ciclo_id
    },
    include: [
      {
        association: 'metodologia',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
      },
      {
        association: 'objetivo',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
      }
    ]
  });

  return res.json( atividades );
}

getById = async ( req, res ) => {
  const { id } = req.params;

  const atividade = await Atividade.findByPk( id, {
    include: [
      {
        association: 'metodologia',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
      },
      {
        association: 'objetivo',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
      }
    ]
  });
  
  return res.json( atividade );
}

getActivitiesOfCity = async ( req, res ) => {
  const { regionalSaude_id } = req.params;

  let current_date = new Date();
  current_date.setHours(0,0,0,0);

  const ciclo = await Ciclo.findOne({
    where: {
      regional_saude_id: regionalSaude_id,
      [Op.and]: [
        {
          dataInicio: {
            [Op.lt]: current_date
          }
        },
        {
          dataFim: {
            [Op.gt]: current_date
          }
        }
      ]
    }
  });

  if( !ciclo )
    return res.status(200).json({ message: "Não há nenhum ciclo em aberto cadastrado" });

  const municipios = await Municipio.findAll({
    where: {
      regional_saude_id: regionalSaude_id
    },
    include: {
      association: 'atividades',
      where: {
        ciclo_id: ciclo.id
      },
      include: [
        {
          association: 'metodologia',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'objetivo',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        }
      ]
    }
  });

  return res.json( municipios );
}

getLocations = async ( req, res ) => {
  const { abrangencia_id, municipio_id } = req.params;
  let locais = [];

  switch ( abrangencia_id ) {
    case "1": //Localidade/bairro
      locais = await Localidade.findAll({
        where: {
          municipio_id
        }
      }).map( l => ({ id: l.id, nome: l.nome, tipo: "localidade" }));
      break;
    case "2"://Zona
      locais = await Zona.findAll({
        where: {
          municipio_id
        }
      }).map( z => ({ id: z.id, nome: z.nome, tipo: "zona" }));
      break;
  
    default://Quarteirão
      locais = await Quarteirao.findAll({
        include: {
          association: "localidade",
          where: {
            municipio_id
          }
        }
      }).map( q => ({ id: q.id, nome: q.numero, tipo: "quarteirao" }));
      break;
  }

  return res.json( locais );
}

store = async ( req, res ) => {
  const { 
    abrangencia, 
    objetivoAtividade, 
    flTodosImoveis,
    responsabilidade,
    ciclo_id,
    municipio_id,
    metodologia_id, 
    objetivo_id
  } = req.body;

  const allow = await allowFunction( req.userId, 'manter_atividade' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const ciclo = await Ciclo.findByPk( ciclo_id );
  if( !ciclo )
    return res.status(400).json({ error: "Ciclo não existe" });

  let current_date = new Date();
  current_date.setHours(0,0,0,0);
  if( current_date > ciclo.dataFim )
    return res.status(400).json({ error: "Não é permitido cadastrar atividade em ciclos finalizados" });

  const atividade = await Atividade.create({
    abrangencia, 
    objetivoAtividade, 
    flTodosImoveis,
    situacao: 1,
    responsabilidade,
    ciclo_id,
    municipio_id,
    metodologia_id, 
    objetivo_id
  });

  return res.status(201).json( atividade );
}

update = async ( req, res ) => {
  
}

destroy = async ( req, res ) => {
}

plan = async ( req, res ) => {
  const { id } = req.params;
  const { estratos, equipes, abrangencia_id } = req.body;

  const allow = await allowFunction( req.userId, 'manter_atividade' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const atividade = await Atividade.findByPk( id );
  if( !atividade )
    return res.status(400).json({ message: "Atividade não existe" });

  estratos.forEach( async e => {
    const est = await Estrato.create({
      atividade_id: id
    });

    switch ( abrangencia_id ) {
      case 1: // Localidade
        e.locais.forEach( async l => {
          await Quarteirao.findAll({
            include: {
              association: 'localidade',
              where: {
                id: l.id
              }
            }
          }).then( quarteiroes => {
            quarteiroes.forEach( async q => {
              await SituacaoQuarteirao.create({
                situacaoQuarteiraoId: 1,
                estrato_id: est.id,
                quarteirao_id: q.id
              });
            });
          });
        });
      
        break;
      case 2: // Zona
        e.locais.forEach( async l => {
          await Quarteirao.findAll({
            include: {
              association: 'zona',
              where: {
                id: l.id
              }
            }
          }).then( quarteiroes => {
            quarteiroes.forEach( async q => {
              await SituacaoQuarteirao.create({
                situacaoQuarteiraoId: 1,
                estrato_id: est.id,
                quarteirao_id: q.id
              });
            });
          });
        });
        break;
    
      default: // Quarteirão
        e.locais.forEach( async l => {
          await SituacaoQuarteirao.create({
            situacaoQuarteiraoId: 1,
            estrato_id: est.id,
            quarteirao_id: l.id
          });
        });
        break;
    }
  });

  return res.json( atividade );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', getById);
router.get('/:ciclo_id/ciclos/:municipio_id/municipios', index);
router.get('/:regionalSaude_id/regionaisSaude', getActivitiesOfCity);
router.get('/locais/:abrangencia_id/abrangencia/:municipio_id/municipios', getLocations);
// router.get('/open', getOpenCycles);
router.put('/:id', update);
router.post('/', store);
router.post('/planejar/:id', plan);
router.delete('/:id', destroy);

module.exports = app => app.use('/atividades', router);