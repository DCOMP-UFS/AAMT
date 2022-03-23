const authMiddleware  = require('../middlewares/auth');
const Sequelize       = require('sequelize');
const express         = require('express');
const Usuario         = require('../models/Usuario');
const Municipio       = require('../models/Municipio');
const Ciclo           = require('../models/Ciclo');
const Atividade       = require('../models/Atividade');
const Amostra         = require('../models/Amostra');
const Exemplar        = require('../models/Exemplar');
const Atuacao         = require('../models/Atuacao');
const LaboratorioMunicipio = require('../models/LaboratorioMunicipio');

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

  const allow = await allowFunction( req.userId, 'visualizar_amostra');
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
   * Checando se o usuário que está requisitando é um supervisor ou laboratorista,
   * se sim, verificando se o ID da URL é diferente do usuário requisitado.
   */
  
  if( userRequest.atuacoes[ 0 ].tipoPerfil === 3 || userRequest.atuacoes[0].tipoPerfil === 5 ) {
    if( parseInt( id ) !== req.userId )
      return res.status( 403 ).json( { error: 'Acesso negado' } );
  }

  // Consultando Regional ID
  let regional_id;
  let id_municipio;
  switch( userRequest.atuacoes[ 0 ].escopo ) {
    case 1: // Regional
      regional_id = userRequest.atuacoes[ 0 ].local_id;
      break;

    case 2: // Municipio
      id_municipio = userRequest.atuacoes[ 0 ].local_id;
      regional_id = await Municipio.findByPk( userRequest.atuacoes[ 0 ].local_id, {
        include: {
          association: 'regional'
        }
      }).then( municipio => {
        return municipio.regional.id;
      });
      break;
  
    default: // Laboratório
      const lab = await LaboratorioMunicipio.findOne({
        where: { laboratorio_id : userRequest.atuacoes[ 0 ].local_id },
      });
      id_municipio = lab.municipio_id;

      regional_id = await Municipio.findByPk( id_municipio, {
        include: {
          association: 'regional'
        }
      }).then( municipio => {
        return municipio.regional.id;
      });
      break;
    
  }

  // Consultando o ciclo em aberto da regional de saúde
  const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split( '/' );
  const current_date = `${ Y }-${ m }-${ d }`;

  const ciclo = await Ciclo.findOne( {
    where: Sequelize.and(
      { 
        regional_saude_id: regional_id 
      } ,
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
  console.log(ciclo)

  // Pegando as equipes que o usuário é supervisor
  const atividades = await Atividade.findAll( {
    where: {
      //ciclo_id: ciclo.id,
      municipio_id: id_municipio,
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

  //Verificando se o usuario é laboratorista ou supervisor para definir o escopo das amostras
  let whereObject;
  if(userRequest.atuacoes[0].tipoPerfil === 5){
    whereObject = { laboratorio_id : userRequest.atuacoes[0].local_id}
  }else{
    whereObject = {}
  }

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
    ],
    where: whereObject
  } );

  // Tratando resultados
  amostras.forEach( ( amostra, index ) => {
      let a = amostra.dataValues;

      amostras[ index ].dataValues.trabalhoDiario = a.deposito.dataValues.vistoria.dataValues.trabalhoDiario.dataValues;
      a.deposito.dataValues.vistoria.dataValues.trabalhoDiario = undefined;
      amostras[ index ].dataValues.vistoria = a.deposito.dataValues.vistoria.dataValues;
      a.deposito.dataValues.vistoria = undefined;
      amostras[ index ].dataValues.deposito = a.deposito.dataValues;
      amostras[ index ].dataValues.ciclo = ciclo;
      amostras[ index ].dataValues.atividade = atividades.find( atividade => atividade.id === amostras[ index ].dataValues.trabalhoDiario.equipe.dataValues.atividade_id );
      /**if para corrigir o bug das seeds TeamData, que está com o campo 'atividade_id' apontando para atividades
       * que nao existem no municipio do usuário
      */
      if( amostras[ index ].dataValues.trabalhoDiario.equipe.dataValues.atividade_id > 2){
        amostras[index].dataValues.atividade = atividades.find( atividade => atividade.id === 2);
      }
  });
  //console.log(amostras);
  console.log(atividades);
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

  for(var i=0; i<amostras.length; i++){
    let amostra =  await Amostra.findByPk( amostras[i].id )
    amostra.set({
      laboratorio_id : parseInt( laboratorio_id ),
      situacaoAmostra: 2
    })
    amostras[i].situacaoAmostra = 2;
    await amostra.save();
  };

  res.json( {data: amostras, status: 200} );
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

/**
 * Essa função retorna todas as amostras de um laboratório
 */
getSamplesByLab = async (req, res) => {
  const { laboratorio_cnpj } = req.params;

  const amostras = await Amostra.findAll({
    where: {laboratorio_cnpj: null},
    attributes: {exclude: ['cnpj']},
  });
  
  res.json( amostras );
}

router.get( '/:id', getSampleBySurpervision );
router.get( '/laboratorio/:laboratorio_cnpj', getSamplesByLab);
router.post( '/enviar', sendSample );
router.post( '/examinar', insertExamination );

module.exports = app => app.use('/amostras', router);