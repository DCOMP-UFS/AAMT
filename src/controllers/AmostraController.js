const authMiddleware  = require('../middlewares/auth');
const Sequelize       = require('sequelize');
const express         = require('express');
const Usuario         = require('../models/Usuario');
const Municipio       = require('../models/Municipio');
const Ciclo           = require('../models/Ciclo');
const Atividade       = require('../models/Atividade');
const Amostra         = require('../models/Amostra');
const Exemplar        = require('../models/Exemplar');

// UTILITY
const allowFunction = require('../util/allowFunction');

const router = express.Router();
router.use(authMiddleware);

/**
 * Esta função retorna um array de Amostras de um supervisor,
 * retorna somente as amostras das equipes que o usuário é supervisor
 * de um ciclo em aberto.
 */
getSampleBySurpervision = async ( req, res ) => {
  const { id } = req.params;

  const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
  if( !allow )
    return res.status( 403 ).json( { error: 'Acesso negado' } );

  const userRequest = await Usuario.findByPk( req.userId, {
    include: {
      association: 'atuacoes'
    }
  } );

  if( userRequest.id !== parseInt( id ) )
    return res.status( 403 ).json( { error: 'Acesso negado' } );

  /**
   * Checando se o usuário que está requisitando é um supervisor,
   * se sim, verificando se o ID da URL é diferente do usuário requisitado.
   */
  if( userRequest.atuacoes[ 0 ].tipoPerfil === 3 ) {
    if( parseInt( id ) !== req.userId )
      return res.status( 403 ).json( { error: 'Acesso negado' } );
  }

  // Consultando Regional ID
  let regional_id;
  switch( userRequest.atuacoes[ 0 ].escopo ) {
    case 1: // Regional
      regional_id = userRequest.atuacoes[ 0 ].local_id;
      break;

    case 2: // Municipio
      regional_id = await Municipio.findByPk( userRequest.atuacoes[ 0 ].local_id, {
        include: {
          association: 'regional'
        }
      }).then( municipio => {
        return municipio.regional.id;
      });
      break;
  
    default: // Laboratório
      
      break;
  }

  // Consultando o ciclo em aberto da regional de saúde
  const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split( '/' );
  const current_date = `${ Y }-${ m }-${ d }`;

  const ciclo = await Ciclo.findOne( {
    where: Sequelize.and(
      { regional_saude_id: regional_id } ,
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

  // Pegando as equipes que o usuário é supervisor
  const atividades = await Atividade.findAll( {
    where: {
      ciclo_id: ciclo.id,
      municipio_id: userRequest.atuacoes[ 0 ].local_id
    },
    include: [
      {
        association: 'equipes',
        include: {
          association: 'membros'
        }
      },
      {
        association: 'metodologia'
      },
      {
        association: 'objetivo'
      }
    ]
  } );

  let equipes = [];
  atividades.forEach( atividade => {
    atividade.equipes.forEach( equipe => {
      equipe.membros.forEach( membro => {
        if( membro.usuario_id === parseInt( id ) && membro.tipoPerfil === 4 )
          equipes.push( equipe.id );
      } );
    } );
  } );

  let amostras = await Amostra.findAll( {
    include: [
      {
        association: 'deposito',
        include: {
          association: 'vistoria',
          include: {
            association: 'trabalhoDiario',
            include: {
              association: 'equipe'
            }
          }
        }
      },
      {
        association: 'exemplares'
      }
    ]
  } );

  // Tratando resultados
  amostras.forEach(async ( amostra, index ) => {
    let a = amostra.dataValues;

    amostras[ index ].dataValues.trabalhoDiario = a.deposito.dataValues.vistoria.dataValues.trabalhoDiario.dataValues;
    a.deposito.dataValues.vistoria.dataValues.trabalhoDiario = undefined;
    amostras[ index ].dataValues.vistoria = a.deposito.dataValues.vistoria.dataValues;
    a.deposito.dataValues.vistoria = undefined;
    amostras[ index ].dataValues.deposito = a.deposito.dataValues;
    amostras[ index ].dataValues.ciclo = ciclo;

    amostras[ index ].dataValues.atividade = atividades.find( atividade => atividade.id === amostras[ index ].dataValues.trabalhoDiario.equipe.dataValues.atividade_id );
  });

  return res.json( amostras );
}

/**
 * Preenche o campo laboratório_id o que indica que este laboratório
 * irá examinar a amostra. Processo conhecido como encaminhar amostras, na regra
 * de negócio.
 */
sendSample = async ( req, res ) => {
  const { amostras, laboratorio_id } = req.body;

  const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const updated = await Amostra.update(
    { 
      laboratorio_id: parseInt( laboratorio_id ),
      situacaoAmostra: 2 
    }, 
    {
      where: {
        id: amostras
      }
    }
  );

  res.json({
    mensage: "Amostras Atualizadas com sucesso",
    data: {
      status: 200
    }
  });
}

insertExamination = async ( req, res ) => {
  const { id, situacaoAmostra, exemplares } = req.body;

  const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
  if( !allow )
    return res.status( 403 ).json({ error: 'Acesso negado' });

  // Alterando a situação da amostra, 3 - Positiva, 4 - Negativa.
  const simple = await Amostra.findByPk( id );

  if( !simple )
    return res.status( 500 ).json({ mensage: 'Não foi possível processar sua requisição' });

  simple.situacaoAmostra = situacaoAmostra;
  await simple.save();

  // Inserindo Exemplares do exame.
  await Exemplar.destroy({
    where: {
      amostra_id: id
    }
  });
  await Exemplar.bulkCreate( exemplares );

  return res.json({
    mensage: "Amostra examinada com sucesso"
  });
}

router.get( '/:id', getSampleBySurpervision );
router.post( '/enviar', sendSample );
router.post( '/examinar', insertExamination );

module.exports = app => app.use('/amostras', router);