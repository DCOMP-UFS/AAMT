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
const { json } = require('sequelize');

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
    
    const amostras = await Amostra.sequelize.query(
      'SELECT ' +
        'a.id as "id", ' +
        'a.data_encaminhamento as "dataEncaminhamento", ' +
        'a.data_examinado as "dataExaminado", ' +
        'a.codigo as "codigo", ' +
        'a.situacao_amostra as "situacaoAmostra", ' +
        'a.laboratorio_id as "laboratorio_id", ' +
        'td.id as "td_id", ' +
        'td.data as "td_data", ' +
        'ativ.id as "ativ_id", ' +
        'ativ.metodologia_id as "ativ_metodologia", ' +
        'metod.sigla as "metodo_sigla", ' +
        'obj.sigla as "objetivo_sigla", ' +
        'ativ.objetivo_id as "ativ_objetivo" ' +
      'FROM ' +
        'amostras as a ' +
        'JOIN depositos as dep ON( a.deposito_id = dep.id ) ' +
        'JOIN vistorias as vist ON( dep.vistoria_id = vist.id ) ' +
        'JOIN trabalhos_diarios as td ON( vist.trabalho_diario_id = td.id ) ' +
        'JOIN equipes as equip ON( td.equipe_id = equip.id ) ' +
        'JOIN atividades as ativ ON( equip.atividade_id = ativ.id ) ' +
        'JOIN metodologias as metod ON( ativ.metodologia_id = metod.id ) ' +
        'JOIN objetivos as obj ON( ativ.objetivo_id = obj.id ) ' +
      'WHERE ' +
        'equip.id = ANY($equipes_ids) '+
      'ORDER BY '+
        'td.data', 
      {
        bind:{ equipes_ids: equipes },
        logging: console.log,
      }
    )

    var todosExemplares = []
    
    for( var i = 0; i < amostras[ 1 ].rows.length; i++){
      const amostra = amostras[ 1 ].rows[i]
      const exemplaresAmostra = await Exemplar.findAll({
        attributes: { exclude: [ 'amostra_id','createdAt', 'updatedAt' ] },
        where: {
          amostra_id: amostra.id
        }
      });

      exemplaresAmostra == undefined ? todosExemplares.push([]) : todosExemplares.push(exemplaresAmostra)
    }
    
    const result = amostras[ 1 ].rows.map( (i,index) => ({
      id: i.id,
      codigo: i.codigo,
      situacaoAmostra: i.situacaoAmostra,
      dataEncaminhamento: i.dataEncaminhamento,
      dataExaminado: i.dataExaminado,
      laboratorio_id: i.laboratorio_id,
      trabalhoDiario:{
        id: i.td_id,
        data: i.td_data
      },
      atividade: {
        id: i.ativ_id,
        metodologia: {
          id: i.ativ_metodologia,
          sigla: i.metodo_sigla
        },
        objetivo: {
          id: i.ativ_objetivo,
          sigla: i.objetivo_sigla
        }
      },
      exemplares: todosExemplares[index],
      ciclo: ciclo
    }));

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

    const allow = await allowFunction( req.userId, 'visualizar_amostra' );
    if( !allow )
      return res.status(403).json({ error: 'Acesso negado' });

    
    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split( '/' );
    const dataAtual = `${ Y }-${ m }-${ d }`;

    const updated = await Amostra.update(
      { 
        laboratorio_id: parseInt( laboratorio_id ),
        situacaoAmostra: 2 ,
        dataEncaminhamento: dataAtual
      }, 
      {
        where: {
          id: amostras
        }
      }
    );

    res.json({
      mensage: "Amostras encaminhadas com sucesso",
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

    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split( '/' );
    const dataAtual = `${ Y }-${ m }-${ d }`;

    const allow = await allowFunction( req.userId, 'visualizar_amostra' );
    if( !allow )
      return res.status( 403 ).json({ error: 'Acesso negado' });

    // Alterando a situação da amostra, 3 - Positiva, 4 - Negativa.
    // Colocando a data do exame como a data atual
    const simple = await Amostra.findByPk( id );

    if( !simple )
      return res.status( 500 ).json({ mensage: 'Não foi possível processar sua requisição' });

    simple.situacaoAmostra = situacaoAmostra;
    simple.dataExaminado = dataAtual
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

    const amostras = await Amostra.sequelize.query(
      'SELECT ' +
        'a.id as "id", ' +
        'a.data_encaminhamento as "dataEncaminhamento", ' +
        'a.data_examinado as "dataExaminado", ' +
        'a.codigo as "codigo", ' +
        'a.situacao_amostra as "situacaoAmostra", ' +
        'ativ.id as "ativ_id", ' +
        'ativ.metodologia_id as "ativ_metodologia", ' +
        'metod.sigla as "metodo_sigla", ' +
        'obj.sigla as "objetivo_sigla", ' +
        'ativ.objetivo_id as "ativ_objetivo" ' +
      'FROM ' +
        'amostras as a ' +
        'JOIN depositos as dep ON( a.deposito_id = dep.id ) ' +
        'JOIN vistorias as vist ON( dep.vistoria_id = vist.id ) ' +
        'JOIN trabalhos_diarios as td ON( vist.trabalho_diario_id = td.id ) ' +
        'JOIN equipes as equip ON( td.equipe_id = equip.id ) ' +
        'JOIN atividades as ativ ON( equip.atividade_id = ativ.id ) ' +
        'JOIN metodologias as metod ON( ativ.metodologia_id = metod.id ) ' +
        'JOIN objetivos as obj ON( ativ.objetivo_id = obj.id ) ' +
      'WHERE ' +
        'a.laboratorio_id = $1 ' +
      'ORDER BY '+
        'a.data_encaminhamento', 
      {
        bind: [ parseInt(laboratorio_id) ],
        logging: console.log,
      }
    )

    var todosExemplares = []
    
    for( var i = 0; i < amostras[ 1 ].rows.length; i++){
      const amostra = amostras[ 1 ].rows[i]
      const exemplaresAmostra = await Exemplar.findAll({
        attributes: { exclude: [ 'amostra_id','createdAt', 'updatedAt' ] },
        where: {
          amostra_id: amostra.id
        }
      });

      exemplaresAmostra == undefined ? todosExemplares.push([]) : todosExemplares.push(exemplaresAmostra)
    }
    
    const result = amostras[ 1 ].rows.map( (i,index) => ({
      id: i.id,
      codigo: i.codigo,
      situacaoAmostra: i.situacaoAmostra,
      dataEncaminhamento: i.dataEncaminhamento,
      dataExaminado: i.dataExaminado,
      atividade: {
        id: i.ativ_id,
        metodologia: {
          id: i.ativ_metodologia,
          sigla: i.metodo_sigla
        },
        objetivo: {
          id: i.ativ_objetivo,
          sigla: i.objetivo_sigla
        }
      },
      exemplares: todosExemplares[index]
    }));
    
    res.json( result );
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