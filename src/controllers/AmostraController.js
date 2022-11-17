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
  try{
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

    //Significa que não existe um ciclo em aberto, logo é retornado
    //uma lista vazia de amostras
    if(ciclo == null)
      return res.json( [] );

    // Pegando todas as atividades do ciclo atual
    // que pertencem ao municipio do usuario
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

    //Array irá armazenar os ids das equipes que são lideradas
    //pelo supervisor que fez a requisição
    let equipes = [];
    atividades.forEach( atividade => {
      atividade.equipes.forEach( equipe => {
        equipe.membros.forEach( membro => {
          if( membro.usuario_id === parseInt( id ) && membro.tipoPerfil === 3 )
            equipes.push( equipe.id );
        } );
      } );
    } );

    //Significa que o suprvisor não está liderando nenhuma equipe no ciclo atual,
    //logo será retornado uma lista vazia de amostras
    if(equipes.length == 0)
      return res.json( [] );

    let amostras = await Amostra.findAll( {
      attributes: { exclude: [ 'cnpj' ] },
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

    var result = []
    // Tratando resultados
    amostras.forEach(async ( amostra, index ) => {
      let a = amostra.dataValues;
      amostras[ index ].dataValues.trabalhoDiario = a.deposito.dataValues.vistoria.dataValues.trabalhoDiario.dataValues;

      //Verifica se a amostra em questão foi feita por alguma equipe liderada pelo supervisor que fez a requisição
      let isAmostraSupervisor = equipes.includes(amostras[index].dataValues.trabalhoDiario.equipe.dataValues.id)

      if(isAmostraSupervisor){

        //Busca a atividade da amostra com sua informações
        var ativ = atividades.find( atividade => atividade.id === amostras[ index ].dataValues.trabalhoDiario.equipe.dataValues.atividade_id );

        a.deposito.dataValues.vistoria.dataValues.trabalhoDiario = undefined;
        amostras[ index ].dataValues.vistoria = a.deposito.dataValues.vistoria.dataValues;
        a.deposito.dataValues.vistoria = undefined;
        amostras[ index ].dataValues.deposito = a.deposito.dataValues;
        amostras[ index ].dataValues.ciclo = ciclo;
        amostras[ index ].dataValues.atividade = ativ

        result.push( amostras[ index ])
      }
    });

    return res.json( result );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Preenche o campo laboratório_id o que indica que este laboratório
 * irá examinar a amostra. Processo conhecido como encaminhar amostras, na regra
 * de negócio.
 */
sendSample = async ( req, res ) => {
  try{
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
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

insertExamination = async ( req, res ) => {
  try{
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
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Essa função retorna todas as amostras de um laboratório
 */
getSamplesByLab = async ( req, res ) => {
  try{
    const { laboratorio_id } = req.params;

    const amostras = await Amostra.findAll( {
      where: { laboratorio_id: parseInt(laboratorio_id) },
      attributes: { exclude: [ 'cnpj' ] },
    } );
    
    res.json( amostras );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

router.get( '/:id', getSampleBySurpervision );
router.get( '/laboratorio/:laboratorio_id', getSamplesByLab);
router.post( '/enviar', sendSample );
router.post( '/examinar', insertExamination );

module.exports = app => app.use('/amostras', router);