const authMiddleware = require('../middlewares/auth');
const express = require('express');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');
const Ciclo = require('../models/Ciclo');
const Atividade = require('../models/Atividade');
const Equipe = require('../models/Equipe');
const Membro = require('../models/Membro');
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
    const municipio = await Municipio.findByPk( supervisor.atuacoes[0].local_id, {
      include: { association: "regional" }
    });

    regionalSaude_id = municipio.regional.id;
  } else { // Laboratório

  }

  // Pegando o ciclo em aberto
  let current_date = new Date();
  current_date.setHours(0,0,0,0);

  const ciclo = await Ciclo.findOne({
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

/**
 * Esta rota recebe como parametro o id da equipe e atualiza o apelido da mesma.
 */
atualizarApelido = async (req, res) => {
  const { apelido } = req.body;
  const { id }      = req.params;

  const usuario = await Usuario.findByPk( req.userId, {
    include: {
      association: "atuacoes"
    }
  });

  const allow = await allowFunction( usuario.id, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  let equipe = await Equipe.findByPk( id );
  if( !equipe )
    return res.status(400).json({ error: 'Equipe não existe' });

  const { fl_rejeitado } = await Equipe.update(
    {
      apelido
    },
    {
      where: {
        id
      }
    }
  )

  if( fl_rejeitado )
    return res.status(502).json({ 
      status: 'error',
      mensage: 'Falha ao atualizar a Equipe',
      data: equipe
    });

  equipe.dataValues.apelido = apelido;

  return res.json({ 
    status: 'success',
    mensage: 'Equipe Atualizada com sucesso',
    data: equipe
  });
}

/**
 * Consultando e retornando os membros de uma equipe
 */
getMembros = async ( req, res ) => {
  const { equipe_id } = req.params;

  const membros = await Membro.findAll({
    where: {
      equipe_id
    },
    attributes: [ 'tipoPerfil' ],
    include: {
      association: 'usuario',
      attributes: [ 'id', 'nome' ]
    }
  });

  res.json( membros );
}

const router = express.Router();
router.use(authMiddleware);

router.get( '/membros/:equipe_id', getMembros );
router.get( '/sup/:id', getTeamsSupervised );
router.get( '/:atividade_id/atividades', getTeams );
router.put( '/apelido/:id', atualizarApelido );

module.exports = app => app.use('/equipes', router);