const authMiddleware = require('../middlewares/auth');
const express = require('express');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');

// UTILITY
const allowFunction = require('../util/allowFunction');

getByUser = async ( req, res ) => {
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

  const trabalhosDiario = await TrabalhoDiario.findAll({
    where: {
      usuario_id
    },
    include: [
      {
        association: 'supervisor',
        attributes: { exclude: [ 'createdAt', 'updatedAt', 'senha' ] }
      },
      {
        association: 'usuario',
        attributes: { exclude: [ 'createdAt', 'updatedAt', 'senha' ] }
      },
      {
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
    ]
  });

  return res.json({
    status: 'success',
    mensage: '',
    data: trabalhosDiario
  });
}

getById = async ( req, res ) => {
  const { id } = req.params;
  // const userId = req.userId;

  const trabalhosDiario = await TrabalhoDiario.findByPk( id, {
    include: [
      {
        association: 'vistorias',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: [
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
      },
      {
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
    ]
  });

  if( !trabalhosDiario )
    return res.json({ status: 'error', mensage: "Não foi possível encontrar um trabalho diário! Verifique as informações." });

  return res.json({ 
    status: 'success',
    mensage: '',
    data: trabalhosDiario
  });
}

const router = express.Router();
router.use( authMiddleware );

router.get( '/:id', getById );
router.get( '/:usuario_id/usuarios', getByUser );

module.exports = app => app.use('/trabalhoDiario', router);