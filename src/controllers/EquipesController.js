const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');
const Ciclo = require('../models/Ciclo');
const Atividade = require('../models/Atividade');
const Equipe = require('../models/Equipe');
const SituacaoQuarteirao = require('../models/SituacaoQuarteirao');

// UTILITY
const allowFunction = require('../util/allowFunction');

getTeamsSupervised = async ( req, res ) => {
  const { id } = req.params;
  
  const supervisor = await Usuario.findByPk( id, {
    include: {
      association: "atuacoes"
    }
  });

  if( !supervisor )
    return res.status(400).json({ error: "Usuário não existe" });

  const allow = await allowFunction( supervisor.id, 'definir_trabalho_diario' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  // Pegando id da regional de saúde
  let regionalSaude_id = -1;
  const escopo = supervisor.atuacoes[0].escopo;

  if( escopo === 1 ) { // Regional
    regionalSaude_id = supervisor.atuacoes[0].local_id;
  } else if( escopo === 2 ) { // Municipal
    const regional = await Municipio.findByPk( supervisor.atuacoes[0].local_id, {
      include: { association: "regional" }
    });
    
    regionalSaude_id = regional.id;
  } else { // Laboratório

  }

  // Pegando o ciclo em aberto
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

  if( !ciclo ) {
    return res.json([]);
  }

  let atividades = await Atividade.findAll({
    where: {
      ciclo_id: ciclo.id
    },
    include: [
      {
        association: "equipes",
        attributes: { exclude: [ "createdAt", "updatedAt" ] },
        include: [
          {
            association: "membros",
            attributes: [ "tipo_perfil" ],
            include: { 
              association: "usuario",
              attributes: [ "id", "nome", "usuario" ], 
            }
          },
          {
            association: "quarteiroes",
            attributes: { exclude: [ "createdAt", "updatedAt", "equipes_quarteiroes" ] },
            include: [
              {
                association: "lados",
                attributes: { exclude: [ "createdAt", "updatedAt" ] },
                include: { association: "rua", attributes: { exclude: [ "createdAt", "updatedAt" ] } }
              }, 
              {
                model: SituacaoQuarteirao,
                association: "estrato",
                attributes: [ "dataConclusao", "situacaoQuarteiraoId", "estrato_id", "quarteirao_id" ]
              }
            ]
          }
        ]
      },
      {
        association: "estratos",
        include: { association: "quarteiroes", attributes: [ "id", "numero" ] },
        attributes: [ 'id' ]
      },
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

  atividades = atividades.filter( a => {
    const atividade = a.dataValues;
    let isActivity = false;
    
    atividade.equipes.forEach( e => {
      e.membros.forEach( m => {
        if( m.dataValues.tipo_perfil === 3 ) {
          const usuario = m.dataValues.usuario.dataValues;
          if( usuario.id === parseInt( supervisor.id ) )
            isActivity = true;
        }
      });
    });

    return isActivity;
  });
  
  return res.json( atividades );
}

getTeams = async ( req, res ) => {
  const { atividade_id } = req.params;

  let equipes = await Equipe.findAll({
    where: {
      atividade_id
    },
    include: [
      {
        association: "membros",
        attributes: [ "tipo_perfil" ],
        include: { 
          association: "usuario",
          attributes: [ "id", "nome", "usuario" ], 
        }
      },
      {
        association: "quarteiroes",
        attributes: [ "id", "numero", "localidade_id", "zona_id", "quarteirao_id" ],
        include: [
          {
            association: "lados",
            attributes: { exclude: [ "createdAt", "updatedAt" ] },
            include: { association: "rua", attributes: { exclude: [ "createdAt", "updatedAt" ] } }
          },
          {
            association: "situacoes",
            include: {
              association: "estrato",
              where: {
                atividade_id
              }
            }
          }
        ]
      }
    ]
  });

  let sit = SituacaoQuarteirao.findAll({
    where: {

    }
  });

  return res.json( equipes );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/sup/:id', getTeamsSupervised);
router.get('/:atividade_id/atividades', getTeams);

module.exports = app => app.use('/equipes', router);