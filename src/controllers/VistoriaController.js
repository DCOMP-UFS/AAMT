const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Vistoria = require('../models/Vistoria');

// UTILITY
const allowFunction = require('../util/allowFunction');

getInspects = async ( req, res ) => {
  const { usuario_id } = req.params;
  const userId = req.userId;

  // Iniciando validação
  const userRequest = await Usuario.findByPk( userId, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_agente = false;
  userRequest.atuacoes.forEach( at => {
    if( at.tipoPerfil === 4 )
      fl_agente = true;
  });

  if( fl_agente && parseInt( usuario_id ) !== userRequest.id )
    return res.status(400).json({ error: "Acesso negado" });

  const usuario = await Usuario.findByPk( usuario_id );

  if( !usuario )
    return res.status(400).json({ error: "Usuário não existe" });
  // Fim validação

  const vistorias = await Vistoria.findAll({
    order: [
      [ 'createdAt', 'DESC' ]
    ],
    include: [
      {
        where: {
          usuario_id: usuario.id
        },
        association: 'trabalhoDiario',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: {
          association: 'equipe',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          include: {
            association: 'atividade',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            include: [
              {
                association: 'ciclo',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              },
              {
                association: 'metodologia',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              },
              {
                association: 'objetivo',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              }
            ]
          }
        }
      },
      {
        association: 'imovel',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: {
          association: 'lado',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          include: [
            {
              association: 'quarteirao',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            },
            {
              association: 'rua',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            }
          ]
        }
      },
      {
        association: 'depositos',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: [
          {
            association: 'tratamentos',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          },
          {
            association: 'amostras',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          }
        ]
      }
    ]
  });

  return res.json({
    status: 'success',
    mensage: '',
    data: vistorias
  });
}

getInspectsByDailyWork = async ( req, res ) => {
  const { trabalho_diario_id } = req.params;
  const userId = req.userId;

  // Iniciando validação
  const trabalho_diario = await TrabalhoDiario.findByPk( trabalho_diario_id );

  if( !trabalho_diario )
    return res.status(400).json({ error: "Trabalho diário não existe" });
  // Fim validação

  const vistorias = await Vistoria.findAll({
    where: {
      trabalho_diario_id: trabalho_diario.id
    },
    order: [
      [ 'createdAt', 'DESC' ]
    ],
    include: [
      {
        association: 'trabalhoDiario',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: {
          association: 'equipe',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          include: {
            association: 'atividade',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            include: [
              {
                association: 'ciclo',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              },
              {
                association: 'metodologia',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              },
              {
                association: 'objetivo',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              }
            ]
          }
        }
      },
      {
        association: 'imovel',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: {
          association: 'lado',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          include: [
            {
              association: 'quarteirao',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            },
            {
              association: 'rua',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            }
          ]
        }
      },
      {
        association: 'depositos',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: [
          {
            association: 'tratamentos',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          },
          {
            association: 'amostras',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          }
        ]
      }
    ]
  });

  return res.json({
    status: 'success',
    mensage: '',
    data: vistorias
  });
}

getInspectsByPeriod = async ( req, res ) => {
  const { usuario_id, data } = req.params;
  const userId = req.userId;

  // Iniciando validação
  const userRequest = await Usuario.findByPk( userId, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_agente = false;
  userRequest.atuacoes.forEach( at => {
    if( at.tipoPerfil === 4 )
      fl_agente = true;
  });

  if( fl_agente && parseInt( usuario_id ) !== userRequest.id )
    return res.status(400).json({ error: "Acesso negado" });

  const usuario = await Usuario.findByPk( usuario_id );

  if( !usuario )
    return res.status(400).json({ error: "Usuário não existe" });
  // Fim validação

  const td = await TrabalhoDiario.findOne({
    where: {
      usuario_id: usuario.id,
      data: `${ data }`
    }
  });

  if( !td )
    return res.json({
      status: 'success',
      mensage: `Nenhum trabalho diário encontrado em ${ data }`
    });

  const vistorias = await Vistoria.findAll({
    where: {
      trabalho_diario_id: td.id
    }
  });

  return res.json({
    status: 'success',
    mensage: '',
    data: vistorias
  });
}

const router = express.Router();
router.use( authMiddleware );

router.get('/:usuario_id/usuarios', getInspects);
router.get('/trabalho/:trabalho_diario_id/trabalhos_diarios', getInspectsByDailyWork);
router.get('/periodo/:usuario_id/usuarios/:data_inicio/data_inicio/:data_fim/data_fim', getInspectsByPeriod);

module.exports = app => app.use('/vistorias', router);