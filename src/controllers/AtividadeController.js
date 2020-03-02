const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Atividade = require('../models/Atividade');
const Ciclo = require('../models/Ciclo');
const Municipio = require('../models/Municipio');

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  const { ciclo_id, municipio_id } = req.params;

  const municipio = await Municipio.findByPk( municipio_id );
  if( !municipio )
    return res.status(200).json({ message: "Município não existe" });

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

const router = express.Router();
router.use(authMiddleware);

router.get('/:ciclo_id/ciclos/:municipio_id/municipios', index);
router.get('/:regionalSaude_id/regionaisSaude', getActivitiesOfCity);
// router.get('/open', getOpenCycles);
router.put('/:id', update);
router.post('/', store);
router.delete('/:id', destroy);

module.exports = app => app.use('/atividades', router);