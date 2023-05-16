const authMiddleware  = require('../middlewares/auth');
const express         = require('express');
const { Op }          = require('sequelize');
const Usuario         = require('../models/Usuario');
const TrabalhoDiario  = require('../models/TrabalhoDiario');
const Rota            = require('../models/Rota');
const Lado            = require('../models/Lado');
const Quarteirao      = require('../models/Quarteirao');
const Vistoria        = require('../models/Vistoria');
const Deposito        = require('../models/Deposito');
const Tratamento      = require('../models/Tratamento');
const Amostra         = require('../models/Amostra');
const Imovel          = require('../models/Imovel');
const Equipe          = require('../models/Equipe');
const Atividade       = require('../models/Atividade');
const Atuacao         = require('../models/Atuacao');
const Municipio       = require('../models/Municipio');

// UTILITY
const allowFunction = require('../util/allowFunction');
const checkBlockSituationPNCD = require('../util/checkBlockSituationPNCD');
const checkBlockSituationLIRAa = require('../util/checkBlockSituationLIRAa');

/**
 * Consulta a rota de trabalho de um agente em 
 * uma determinada data.
 */
getRoute = async ( req, res ) => {
  try{
    const { usuario_id, data } = req.params;
    const userId = req.userId;

    // Iniciando validação
    const userRequest = await Usuario.findByPk( userId, {
      include: {
        association: "atuacoes"
      }
    } );

    let fl_agente = false;
    userRequest.atuacoes.forEach( at => {
      if( at.tipoPerfil === 4 )
        fl_agente = true;
    });

    if( fl_agente && parseInt( usuario_id ) !== userRequest.id )
      return res.status( 400 ).json( { error: "Acesso negado" } );

    const usuario = await Usuario.findByPk( usuario_id );

    if( !usuario )
      return res.status( 400 ).json( { error: "Usuário não existe" } );

    const td = await TrabalhoDiario.findOne( {
      where: {
        usuario_id: usuario.id,
        data:       `${ data }`,
      },

      include: {
        association: 'equipe',
        include: { 
          association: 'atividade',
          include: [
            {
              association: 'metodologia',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            },
            {
              association: 'objetivo',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            },
          ]
        }
      }
    } );

    if( !td )
      return res.json( {} );

    var imoveisId = await imoveisVistoriados(td, td.equipe.id)

    let rota = await Quarteirao.findAll( {
      include: {
        association: 'lados',
        include: [
          {
            association: 'imoveis',
            where:{
              ativo:true,
              id: {
                [Op.notIn]: imoveisId
              },
            }
          },
          {
            association: 'rota',
            where: {
              id: td.id
            }
          },
          { association: 'rua' }
        ]
      }
    } );

    const sequencia_usuario = await Atuacao.findOne( {
      where: {
        usuario_id,
        local_id: td.equipe.atividade.municipio_id
      }
    } ).then( at => at.sequencia_usuario );

    const codigo_municipio = await Municipio.findOne({
      where: {
        id: td.equipe.atividade.municipio_id
      }
    } ).then( mun => mun.codigo );

    rota = rota.filter( r => r.lados.length > 0 );
    
    let equipe = {
      id: td.equipe.id,
      atividade_id: td.equipe.atividade_id
    };

    let trabalhoDiario = {
      id:             td.id,
      sequencia:      td.sequencia,
      data:           td.data,
      horaInicio:     td.horaInicio,
      horaFim:        td.horaFim,
      usuario_id:     td.usuario_id,
      sequencia_usuario,
      supervisor_id:  td.supervisor_id,
      equipe_id:      td.supervisor_id,
      equipe:         equipe,
      atividade:      td.equipe.atividade,
      codigo_municipio,
    };

    return res.json( {
      trabalhoDiario,
      rota
    } );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

//Busca todas as rotas do usuario em uma determinada data
getAllRoutes = async ( req, res ) => {
  try{
    const { usuario_id, data } = req.params;
    const isMobile = req.query.isMobile //indica se a rota foi chamada pelo app mobile
    const userId = req.userId;

    // Iniciando validação
    const userRequest = await Usuario.findByPk( userId, {
      include: {
        association: "atuacoes"
      }
    } );

    let fl_agente = false;
    userRequest.atuacoes.forEach( at => {
      if( at.tipoPerfil === 4 )
        fl_agente = true;
    });

    if( fl_agente && parseInt( usuario_id ) !== userRequest.id )
      return res.status( 400 ).json( { error: "Acesso negado" } );

    const usuario = await Usuario.findByPk( usuario_id );

    if( !usuario )
      return res.status( 400 ).json( { error: "Usuário não existe" } );

    const trabalhos_diarios = await TrabalhoDiario.findAll( {
      where: {
        usuario_id: usuario.id,
        data:       `${ data }`,
        horaFim:    null
      },

      include: {
        association: 'equipe',
        include: { 
          association: 'atividade',
          include: [
            {
              association: 'metodologia',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            },
            {
              association: 'objetivo',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            },
          ]
        }
      }
    } );

    if( !trabalhos_diarios )
      return res.json( {} );

    var result = []
      
    for( const td of trabalhos_diarios) {
      var imoveisId = await imoveisVistoriados(td, td.equipe.id)

      let rota = await Quarteirao.findAll( {
        include: [
          {
            association: 'localidade',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
          },
          {
            association: 'lados',
            include: [
              {
                association: 'imoveis',
                where:{
                  ativo:true,
                  id: {
                    [Op.notIn]: imoveisId
                  },
                  tipoImovel:{
                    [Op.ne]: 4 //Ponto estrategico
                  }
                }
              },
              {
                association: 'rota',
                where: {
                  id: td.id
                }
              },
              { association: 'rua' }
            ]
          }
        ]
      } );

      const sequencia_usuario = await Atuacao.findOne( {
        where: {
          usuario_id,
          local_id: td.equipe.atividade.municipio_id
        }
      } ).then( at => at.sequencia_usuario );

      const codigo_municipio = await Municipio.findOne({
        where: {
          id: td.equipe.atividade.municipio_id
        }
      } ).then( mun => mun.codigo );

      rota = rota.filter( r => r.lados.length > 0 );

      //caso esta rota tenha sido chamada pelo mobile, cada imovel de cada rota terá
      //seu status de visita definido (normal ou recuperada)
      if(isMobile){
        const trabalhosAnterioresEquipe = await TrabalhoDiario.findAll({
          where:{
            equipe_id: td.equipe_id,
            id:{ [Op.lt]: td.id },
            horaFim:{ [Op.ne]: null }
        
          },
          order:[["id","DESC"]]
        })
        
        //rota só contem imoveis que ainda não foram vistoriados ou que com pendencia (fechado ou recusado). 
        //Estes laços servem para indentifica os imoveis que possuem pendencias. 
        if(trabalhosAnterioresEquipe.length > 0){
          for( const r of rota) {
            for( const l of r.lados) {
              for( const imovel of l.imoveis) {

                //Status padrão de uma visita (normal)
                imovel.dataValues.statusVisita = "N"

                for(const trabalho_anterior of  trabalhosAnterioresEquipe){
                  const isPendente = await Vistoria.findOne( {
                    where: {
                      trabalho_diario_id: trabalho_anterior.id,
                      imovel_id: imovel.id,
                      pendencia: {[Op.ne]: null}
                    },
                  })
                  //caso verdadeiro, significa que este imovel foi vistoriado antes,
                  //mas ficou pendente, logo o status de visita da proxima vistoria é recuperada
                  if(isPendente){
                    imovel.dataValues.statusVisita = "R"
                    break
                  }
                }
              }
            }
          }
        }
      }
      
      let equipe = {
        id: td.equipe.id,
        atividade_id: td.equipe.atividade_id
      };

      let trabalhoDiario = {
        id:             td.id,
        sequencia:      td.sequencia,
        data:           td.data,
        horaInicio:     td.horaInicio,
        horaFim:        td.horaFim,
        usuario_id:     td.usuario_id,
        sequencia_usuario,
        supervisor_id:  td.supervisor_id,
        equipe_id:      td.supervisor_id,
        equipe:         equipe,
        atividade:      td.equipe.atividade,
        codigo_municipio,
      };

      result.push({
        trabalhoDiario,
        rota})

    }
    
    return res.json( result );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Esta função registra na base um trabalho diário para um determinado
 * agente
 * 
 * @body {Integer} supervisor_id responsável da equipe
 * @body {Integer} usuario_id usuário a qual a rota será atribuída
 * @body {Integer} equipe_id equipe a qual a rota se refere
 * @body {Array} lados lados dos quarteirões planejado para o usuário
 */
planejarRota = async ( req, res ) => {
  try{
    const { supervisor_id, usuario_id, equipe_id, lados } = req.body;
    const userId = req.userId;

    // Iniciando validação
    const usuario_req = await Usuario.findByPk( userId );

    const allow = await allowFunction( usuario_req.id, 'definir_trabalho_diario' );
    if( !allow )
      return res.status( 403 ).json( { error: 'Acesso negado' } );

    const usuario = await Usuario.findByPk( usuario_id );
    if( !usuario )
      return res.status( 400 ).json( { error: "Usuário não existe" } );

    const equipe = await Equipe.findByPk( equipe_id, {
      include: {
        association: 'membros',
        where: {
          usuario_id
        }
      }
    } );

    if( !equipe )
      return res.status( 400 ).json( { error: "Equipe não existe ou usuário não pertence a esta equipe" } );

    // en-GB: d/m/Y
    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split( '/' );
    const current_date = `${ Y }-${ m }-${ d }`;

    const td = await TrabalhoDiario.findAll( {
      where: {
        [Op.and]: [
          {
            data: {
              [Op.eq]: current_date
            }
          },
          { usuario_id },
        ]
      },
      order: [
        [ 'sequencia', 'DESC' ]
      ]
    } );

    const trabalho_diario = await TrabalhoDiario.create( {
      data: current_date,
      supervisor_id,
      usuario_id,
      equipe_id,
      sequencia: td.length > 0 ? td[ 0 ].sequencia + 1 : 1        
    } );

    const rota = lados.map( lado_id => ( {
      lado_id,
      trabalho_diario_id: trabalho_diario.id
    } ) );

    Rota.bulkCreate( rota );

    return res.json( trabalho_diario );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Esta função alterar as rotas de um trabalho diário na base para um determinado
 * agente
 * 
 * @param {Integer} trabalho_diario_id o trabalho diario que terá sua rota alterada
 * @body {Array} lados lados dos novos quarteirões planejado para o usuário
 */
alterarRota = async ( req, res ) => {
  try{
    const { trabalhoDiario_id } = req.params
    const { lados,} = req.body;
    const userId = req.userId;

    // Iniciando validação
    const usuario_req = await Usuario.findByPk( userId );

    const allow = await allowFunction( usuario_req.id, 'definir_trabalho_diario' );
    if( !allow )
      return res.status( 403 ).json( { error: 'Acesso negado' } );

    // en-GB: d/m/Y
    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split( '/' );
    const current_date = `${ Y }-${ m }-${ d }`;

    const trabalho_diario = await TrabalhoDiario.findOne({
      where: { 
          id: trabalhoDiario_id,
          data: {[Op.eq]: current_date} 
        } 
    })

    if(!trabalho_diario)
      return res.status( 400 ).json( { error: 'A rota do trabalho diario informado não pode ser alterado. Ou ele não existe ou a data do trabalho não é a mesma que a data de hoje' } );
    
    if(trabalho_diario.horaInicio != null){
      return res.status( 400 ).json( { 
        routeStarted: true,
        error: 'Não é possível alterar uma rota de um trabalho que já foi iniciada' 
      } );
    }

    const deleteRostasAntigas = await Rota.destroy({
      where: {
        trabalho_diario_id: trabalho_diario.id
      }
    })

    const rota = lados.map( lado_id => ( {
      lado_id,
      trabalho_diario_id: trabalho_diario.id
    } ) );

    Rota.bulkCreate( rota );

    return res.json( trabalho_diario );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getPlain = async ( req, res ) => {
  try{
    const { usuario_id } = req.params;
    const userId = req.userId;
    
    const supervisor = await Usuario.findByPk( userId );

    const allow = await allowFunction( supervisor.id, 'definir_trabalho_diario' );
    if( !allow )
      return res.status(403).json({ error: 'Acesso negado' });

    const usuario = await Usuario.findByPk( usuario_id, {
      include: {
        association: "atuacoes"
      }
    });

    let fl_supervisor = false;
    usuario.atuacoes.forEach( at => {
      if( at.tipoPerfil === 3 )
        fl_supervisor = true;
    });

    if( !fl_supervisor )
      return res.status(400).json({ error: "Usuário informado não é um supervisor!" });

    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
    const current_date = `${Y}-${m}-${d}`;
    const planejamento = await TrabalhoDiario.findAll({
      where: {
        [Op.and]: [
          {
            data: {
              [Op.eq]: current_date
            }
          },
          { supervisor_id: usuario.id }
        ]
      },
      include: [
        {
          association: 'equipe',
          include: [ 
            { association: 'membros', include: { association: 'usuario' } },
            { 
              association: 'quarteiroes',
              include: { 
                association: 'lados', 
                include: { association: 'rua' }
              } 
            }
          ]
        },
        {
          model: Lado,
          as: 'rota',
          attributes: [ 'id', 'numero', 'rua_id', 'quarteirao_id' ],
          include: { association: 'rua' }
        }
      ],
    });

    // formatando o array planejamento por equipe para ser compatível com a tela de planejamento.
    plainTeam = [];
    planejamento.forEach( p => {
      let index = plainTeam.findIndex( pt => p.equipe_id === pt.idEquipe );

      if( index !== -1 ) {//Existe
        p.rota.forEach( r => {
          plainTeam[ index ].quarteiroes.forEach(( q, qIndex ) => {
            let found = false;
            q.lados.forEach(( l, lIndex ) => {
              if( r.id === l.id ) {
                plainTeam[ index ].quarteiroes[ qIndex ].lados[ lIndex ].dataValues.rotaIndex = plainTeam.length;
                found = true;
                return;
              }
            });

            if( found )
              return;
          });
        });

        plainTeam[ index ].rotas.push({
          usuario_id: p.usuario_id,
          lados: p.rota
        });
      } else {//Nova equipe
        let plain = {
          idEquipe: p.equipe_id,
          membros: p.equipe.membros,
          quarteiroes: p.equipe.quarteiroes
        }

        p.rota.forEach( r => {
          plain.quarteiroes.forEach(( q, qIndex ) => {
            let found = false;
            q.lados.forEach(( l, lIndex ) => {
              if( r.id === l.id ) {
                plain.quarteiroes[ qIndex ].lados[ lIndex ].dataValues.rotaIndex = 0;
                found = true;
                return;
              }
            });

            if( found )
              return;
          });
        });

        plain.rotas = [{
          usuario_id: p.usuario_id,
          lados: p.rota
        }];

        plainTeam.push( plain );
      }
    });

    return res.json( plainTeam );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Inicializa uma rota de trabalho diário.
 */
startRoute = async ( req, res ) => {
  try{
    const { trabalhoDiario_id } = req.body;
    const userId = req.userId;

    // Validando
    const td = await TrabalhoDiario.findByPk( trabalhoDiario_id,
    {
      include: {
        association: 'equipe'
      }
    })

    if( !td ) 
      res.json({
        status: 'error',
        mensage: 'Impossível iniciar a rota, trabalho diário informado não existe!'
      });

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

    if( fl_agente && td.usuario_id !== userRequest.id )
      return res.json({ 
        status: 'error',
        mensage: 'Acesso negado'
      });
    // Validando

    // Iniciando a rota
    if( td.horaInicio === null ) {
      const { horaInicio } = req.body;
      const [ result ] = await TrabalhoDiario.update(
        {
          horaInicio
        },
        {
          where: {
            id: trabalhoDiario_id
          }
        }
      );  
    
      if( !result ) 
        return res.json({ 
          status: 'error',
          mensage: 'Falha ao tentar iniciar a rota, por favor, aguarde e tente novamente.'
        });
    }

    var imoveisId = await imoveisVistoriados(td, td.equipe.id)

    // Iniciando a rota
    let rota = await Quarteirao.findAll({
      include: {
        association: 'lados',
        include: [
          {
            association: 'imoveis',
            ativo:true,
            where:{
              id: {
                [Op.notIn]: imoveisId
              },
            }
          },
          {
            association: 'rota',
            where: {
              id: td.id
            }
          },
          { association: 'rua' }
        ]
      }
    });

    rota = rota.filter( r => r.lados.length > 0);

    return res.json( rota );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Finaliza uma rota de trabalho diário e armazena
 * as informações da vistoria.
 * 
 * @returns {Promise} reponse
 */
endRoute = async ( req, res ) => {
  try{
    const { trabalhoDiario_id, horaFim, vistorias } = req.body;
    const userId = req.userId;

    // Validando
    const td = await TrabalhoDiario.findByPk( trabalhoDiario_id );
    if( !td ) 
      res.json( {
        status: 'error',
        mensage: 'Impossível finalizar a rota, trabalho diário informado não existe!'
      } );

    const userRequest = await Usuario.findByPk( userId, {
      include: {
        association: "atuacoes"
      }
    } );

    let fl_agente = false;
    userRequest.atuacoes.forEach( at => {
      if( at.tipoPerfil === 4 )
        fl_agente = true;
    } );

    /**
     * Verificando se o usuário solicitando finalização da rota é o responsável
     * pelo trabalho diário informado
     */
    if( fl_agente && td.usuario_id !== userRequest.id )
      return res.json( { 
        status: 'error',
        mensage: 'Acesso negado'
      } );

    // Concatenando todas amostras
    let arrayCodigosAmostra = [];

    vistorias.forEach( v => {
      v.recipientes.forEach( recipiente => {
        if( recipiente.fl_comFoco ) {
          recipiente.amostras.forEach( amostra => {
            arrayCodigosAmostra.push( amostra.idUnidade );
          } );
        }
      } );
    } );

    // Verificando códigos de amostra repetidos
    const temCodigoDuplicado = arrayCodigosAmostra.filter( ( item, index ) => arrayCodigosAmostra.indexOf( item ) !== index );

    if( temCodigoDuplicado.length > 0 ) {
      return res.status( 400 ).json( {
        status:   'error',
        tipo:     'codigo_amostra_duplicado',
        message:  `Os códigos de amostra ${ temCodigoDuplicado.join( ', ' ) } estão repetidos. Por favor, verifique e corrija.`
      } );
    }

    // Apagando dados desatualizados
    await Vistoria.destroy( {
      where: {
        trabalho_diario_id: trabalhoDiario_id
      }
    } );

    // Salvando as vistorias 
    for( let vistoria of vistorias ) {
      await Vistoria.create( {
        situacaoVistoria:   vistoria.situacaoVistoria,
        horaEntrada:        vistoria.horaEntrada,
        pendencia:          vistoria.pendencia,
        sequencia:          vistoria.sequencia,
        justificativa:      vistoria.justificativa,
        imovel_id:          vistoria.imovel.id,
        trabalho_diario_id: vistoria.trabalhoDiario_id,
        responsavel:        vistoria.imovel.responsavel,
        tipoImovelVistoria: vistoria.imovel.tipoImovel
      } )
      .then( result => {
        vistoria.id = result.dataValues.id;
      } );

      await Imovel.update( 
        {
          numero:       vistoria.imovel.numero,
          sequencia:    vistoria.imovel.sequencia,
          complemento:  vistoria.imovel.complemento,
          responsavel:  vistoria.imovel.responsavel,
          tipoImovel:   vistoria.imovel.tipoImovel
        }, { 
          where: { id: vistoria.imovel.id } 
        } 
      );

      const recipientes = vistoria.recipientes;
      let amostras      = [];
      for( let recipiente of recipientes ) {
        await Deposito.create( {
          fl_comFoco:     recipiente.fl_comFoco ? true : false,
          fl_tratado:     recipiente.fl_tratado ? true : false,
          fl_eliminado:   recipiente.fl_eliminado ? true : false,
          tipoRecipiente: recipiente.tipoRecipiente,
          sequencia:      recipiente.sequencia,
          vistoria_id:    vistoria.id
        } )
        .then( result => {
          recipiente.id = result.dataValues.id;
        } );

        if( recipiente.fl_tratado ) {
          await Tratamento.create( {
            quantidade:     recipiente.tratamento.quantidade,
            tecnica:        recipiente.tratamento.tecnica,
            deposito_id:    recipiente.id,
            inseticida_id:  2
          } );
        }

        if( recipiente.fl_comFoco ) {
          let amostrasInsert = recipiente.amostras.map( amostra => ( {
            situacaoAmostra:  amostra.situacao,
            sequencia:        amostra.sequencia,
            codigo:           amostra.idUnidade,
            deposito_id:      recipiente.id,
            laboratorio_cnpj: null
          } ) );

          amostras = [ ...amostras, ...amostrasInsert ];
        }
      }

      await Amostra.bulkCreate( amostras );
    }

    // Finalizar rota
    const [ result ] = await TrabalhoDiario.update(
      {
        horaFim
      },
      {
        where: {
          id: trabalhoDiario_id
        }
      }
    );  

    if( !result ) 
      return res.json({ 
        status: 'error',
        mensage: 'Falha ao tentar finalizara rota, por favor, aguarde e tente novamente.'
      });
    
    const metodologiaAtividade = await Equipe.findByPk(td.dataValues.equipe_id, {
      include: [
        {
          association: 'atividade',
          include:{
            association: 'metodologia'
          }
        }
      ]
    }).then( equipe => {
      return equipe.atividade.metodologia;
    })

    if(metodologiaAtividade.dataValues.sigla == "PNCD"){
      // Atualizando a situação dos quarteirões de acordo com o PNCD
      await checkBlockSituationPNCD( trabalhoDiario_id );
    }
    else if(metodologiaAtividade.dataValues.sigla == "LIRAa"){
      // Atualizando a situação dos quarteirões de acordo com o LIRAa
      await checkBlockSituationLIRAa( trabalhoDiario_id );
    }
    
    return res.json( { 
      status: 'success',
      mensage: 'Vistorias registradas com sucesso!'
    } );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

isStarted = async ( req, res ) => {
  try{
    const { trabalhoDiario_id } = req.params;
    const userId = req.userId;

    // Validando
    const td = await TrabalhoDiario.findByPk( trabalhoDiario_id );
    if( !td ) 
      res.json({
        status: 'error',
        mensage: 'Trabalho diário informado não existe!'
      });

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

    if( fl_agente && td.usuario_id !== userRequest.id )
      return res.json({ 
        status: 'error',
        mensage: 'Acesso negado'
      });
    // Validando

    if( td.horaInicio === null )
      return res.json( false );

    return res.json( true );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Esta rota consulta as rotas já planejadas de uma equipe e retorna
 * um array de quarteirões com seus lados e a situação de cada lado.
 * 
 * @param int equipe_id
 * @returns array quarteiroes
 */
const getOpenRouteByTeam = async ( req, res ) => {
  try{
    const { equipe_id } = req.params;

    const metodologiaAtividade = await Equipe.findByPk(equipe_id, {
      include: [
        {
          association: 'atividade',
          include:{
            association: 'metodologia'
          }
        }
      ]
    }).then( equipe => {
      return equipe.atividade.metodologia;
    })

    // Consultando quarteirões de responsabilidade da equipe.
    const quarteirao_equipe = await Equipe.findByPk(equipe_id, {
      include: {
        association: 'quarteiroes'
      }
    }).then( equipe => {
      return equipe.quarteiroes;
    });

    let sql = 
      'SELECT ' +
        'q.*, ' +
        'loc.nome AS localidade_nome, ' +
        'l.id AS lado_id, ' +
        'l.ativo AS lado_ativo, ' +
        'l.numero AS lado_numero, ' +
        'l.rua_id AS lado_rua_id, ' +
        'l.quarteirao_id AS lado_quarteirao_id, ' +
        'r.id AS rua_id, ' +
        'r.nome AS rua_nome, ' +
        'r.cep AS rua_cep, ' +
        'CAST( ' +
          '(SELECT COUNT(*) FROM imoveis WHERE lado_id = l.id AND ativo = true AND tipo_imovel != 4) ' +
        ' AS INTEGER ) AS imoveis, ' +
        'CAST( ' +
          '( ' +
            'SELECT ' +
              'COUNT(*) ' +
            'FROM ' +
              'vistorias AS v ' +
              'JOIN imoveis AS i ON(v.imovel_id = i.id) ' +
              'JOIN trabalhos_diarios AS td ON( v.trabalho_diario_id = td.id ) ' +
            'WHERE ' +
              'i.lado_id = l.id ' +
              'AND v.pendencia IS NULL ' +
              'AND td.equipe_id = ' + equipe_id +
          ') ' +
        ' AS INTEGER ) AS vistorias ' +
      'FROM ' +
        'quarteiroes AS q ' +
        'JOIN localidades AS loc ON(q.localidade_id = loc.id) ' +
        'JOIN lados AS l ON(q.id = l.quarteirao_id) ' +
        'JOIN ruas AS r ON(l.rua_id = r.id) ' +
      'WHERE ';
        // 'q.id = 1 ' +
        // 'OR q.id = 2';

    const q = quarteirao_equipe.map((quarteirao, index) => {
      if( index === 0 )
        sql += 'q.id = $' + ( index + 1 ) + ' ';
      else
        sql += 'OR q.id = $' + ( index + 1 ) + ' ';

      return quarteirao.id;
    });

    // Consultando quarteirões e verificando a situação dos lados.
    let quarteirao_situacao = [];
    if( q.length > 0 ) {
      quarteirao_situacao = await Quarteirao.sequelize.query(
        sql, 
        {
          bind: q,
          logging: console.log,
        }
      ).then( async data => {
        const [ rows ] = data;
    
        if( rows.length > 0 ) {
          let rota          = [];
          let quarteirao_id = null;
          let quarteirao    = {
            id: null,
            numero: null,
            sequencia:null,
            ativo: null,
            localidade_id: null,
            localidade_nome: null,
            zona_id: null,
            lados: []
          };
          
          for( const row of rows ) {
            if( !quarteirao_id || row.id !== quarteirao_id ) {
              quarteirao_id = row.id;
              quarteirao    = {
                id: row.id,
                numero: row.numero,
                sequencia: row.sequencia,
                ativo: row.ativo,
                localidade_id: row.localidade_id,
                localidade_nome: row.localidade_nome,
                zona_id: row.zona_id,
                lados: []
              };
    
              rota.push( quarteirao );
            }
            if(row.lado_ativo){

              //contem os ids dos imoveis de uma lado que tiveram uma vistoria com pendencia ao menos uma vez
              const sql_pendencia = 
                'SELECT DISTINCT ' +
                  'i.id ' +
                'FROM ' +
                  'imoveis as i ' +
                  'JOIN vistorias as v ON (v.imovel_id = i.id) ' +
                  'JOIN trabalhos_diarios AS td ON( v.trabalho_diario_id = td.id ) ' +
                'WHERE ' +
                  'td.equipe_id = ' + equipe_id +
                  ' AND i.lado_id = '+ row.lado_id +
                  ' AND v.pendencia IS NOT NULL';
              
              const pendencia = await Imovel.sequelize.query(sql_pendencia)
              
              //Quantidades de vistorias com pendencia em imoveis não repetidos
              const pendenciaTotal = pendencia[ 1 ].rows.length
              
             
              /*
                  variavel que armazena situação de uma lado do quarteirão

                  Situacao do lado
                    1 - Em Aberto
                    2 - Fazendo
                    3 - Concluído
                    4 - Planejado
                    5 - Concluído com pendência
                */
              let sitLado = 1

              if(metodologiaAtividade.dataValues.sigla == "PNCD"){
                sitLado = row.imoveis === row.vistorias ? 3 : row.imoveis <= row.vistorias + pendenciaTotal ? 5 : ( row.vistorias + pendenciaTotal > 0 ? 2 : 1 )
              }
              else if(metodologiaAtividade.dataValues.sigla == "LIRAa"){
                //No LIRAa não são vistoriados todos os imoveis do lado, ao terminar de vistoriar um imovel, o agente pula os 4 imoveis seguintes
                //e vistoria o 5º. Esse processo continua até ele chegar no final do lado

                //No caso do numero de imoveis do lado dividido por 5 gerar resto, significa que
                //existe um imovel a mais que deve ser vistoriado
                const imovelExcedente = row.imoveis % 5 > 0 ? 1 : 0

                //Variavel que armazena a quantidade de imoveis que devem ser vistorados, para que o lado
                //seja considerado com situação concluida
                const numeroImoveisNecessarios = Math.floor(row.imoveis / 5) + imovelExcedente

                sitLado = numeroImoveisNecessarios <= row.vistorias ? 3 :( row.vistorias > 0 ? 2 : 1 )
              }

              quarteirao.lados.push( {
                id: row.lado_id,
                ativo: row.lado_ativo,
                numero: row.lado_numero,
                rua_id: row.lado_rua_id,
                quarteirao_id: row.lado_quarteirao_id,
                rua: {
                  id: row.rua_id,
                  nome: row.rua_nome,
                  cep: row.rua_cep,
                },
                imoveis: row.imoveis,
                vistorias: row.vistorias,
                situacao: sitLado
              } );
            }
          }
      
          return rota;
        } else {
          return [];
        }
      } );
    }

    // Consultando lados já planejando do dia de uma equipe.
    const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split( '/' );
    const current_date = `${ Y }-${ m }-${ d }`;

    const rotas = await Rota.findAll( {
      include: {
        association: "trabalhoDiario",
        where: {
          data: current_date,
          equipe_id,
          horaFim: null,
        }
      }
    } );

    quarteirao_situacao = quarteirao_situacao.map( quarteirao => {
      let q = quarteirao;

      q.lados = quarteirao.lados.map( lado => {
        rotas.forEach(r => {
          if( lado.id === r.lado_id ) {
            if( lado.situacao !== 3 )
              lado.situacao = 4;
            lado.usuario_id = r.trabalhoDiario.usuario_id
          }
        } );

        return lado;
      } );

      return q;
    } );

    quarteirao_situacao.forEach( q =>{
      q.lados.sort((a,b) => a.numero - b.numero )
    })

    return res.json( quarteirao_situacao );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Retorna um array de atividades com as equipes com todas as rotas planejadas
 * da equipe do dia.
 */
const consultarRotasPlanejadas = async ( req, res ) => {
  try{
    const { usuario_id, ciclo_id } = req.params;

    const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
    if( !allow )
      return res.status(403).json({ error: 'Acesso negado' });

    const supervisor = await Usuario.findByPk( usuario_id, {
      include: {
        association: "atuacoes"
      }
    });
    if( !supervisor )
      return res.status(400).json({ error: "Usuário não existe" });

    if( supervisor.atuacoes[ 0 ].escopo !== 2 )
      return res.json([]);

    const atividades = await Atividade.findAll({
      where: {
        ciclo_id,
        municipio_id: supervisor.atuacoes[ 0 ].local_id
      },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [
        {
          association: 'metodologia',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'objetivo',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'equipes',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          include: [
            {
              association: 'membros',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              include: {
                association: 'usuario',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] } 
              }
            }
          ]
        }
      ]
    });

    const atividadesSupervisor = [];

    const promise_atividades = atividades.map(async atividade => {
      let act = atividade;

      let teams = act.equipes.filter( (team, index) => {
        let fl_team = false;
        
        team.membros.forEach( member => {
          if( member.usuario_id === supervisor.id && member.tipoPerfil === 4 )
            fl_team = true;
        });

        return fl_team;
      });

      if( teams.length > 0 ) {
        const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
        const current_date = `${ Y }-${ m }-${ d }`;

        let equipes = [];
        const promises = teams.map( async equipe => {
          let e = equipe;
          
          e.dataValues.rota = await TrabalhoDiario.findAll({
            where: {
              equipe_id: equipe.id,
              data: current_date
            },
            include: [
              {
                association: 'usuario',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              },
              {
                association: 'rota',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                include: {
                  association: 'imoveis',
                  attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                  include: {
                    association: 'vistorias',
                    attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
                  }
                }
              }
            ]
          });

          e.dataValues.membros = undefined;
          equipes.push( e );
        });

        await Promise.all( promises );
        
        act.dataValues.equipes = equipes;
        atividadesSupervisor.push( act );
      }
    });

    await Promise.all( promise_atividades );

    return res.json( atividadesSupervisor );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Verifica se a rota está finalizada
 * @param {*} req 
 * @param {*} res 
 * @returns {Boolean}
 */
const isFinalizado = async ( req, res ) => {
  try{
    const { trabalhoDiario_id } = req.params;
    const userId                = req.userId;

    // Validando
    const td = await TrabalhoDiario.findByPk( trabalhoDiario_id );

    if( !td ) 
      return res.status( 404 ).json( {
        status  : 'error',
        mensage : 'Trabalho diário informado não existe!'
      } );

    const userRequest = await Usuario.findByPk( userId, {
      include: {
        association: "atuacoes"
      }
    } );

    let fl_agente = false;
    userRequest.atuacoes.forEach( at => {
      if( at.tipoPerfil === 4 )
        fl_agente = true;
    } );

    if( fl_agente && td.usuario_id !== userRequest.id )
      return res.status( 401 ).json( { 
        status: 'error',
        mensage: 'Acesso negado'
      } );

    if( td.horaFim === null )
      return res.json( false );

    return res.json( true );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Dado um trabalho diario, a função abaixo procurar todos os imoveis ja vistoriado por trabalhos diarios anteriores.
 * Retorna uma lista de id de imoveis vistoriados.
 * Caso nenhum id tenha sido encontrado, retorna a lista contendo o numero -1. 
 * */
async function imoveisVistoriados(trabalhoDiario, equipe_id ) {
  const imoveisVistoriados = await Imovel.sequelize.query(
    'SELECT ' +
      'v.id as "vistoria_id", ' +
      'i.id, ' +
      'i.numero, ' +
      'v.pendencia as "vistoria_pendencia", ' +
      'td.data as "vistoria_data" ' +
    'FROM ' +
      'imoveis as i ' +
      'JOIN vistorias as v ON( i.id = v.imovel_id ) ' +
      'JOIN trabalhos_diarios as td ON( td.id = v.trabalho_diario_id ) ' +
    'WHERE ' +
      'td.equipe_id = $1 ' +
      'AND td.data <= $2 '+
      'AND td.hora_fim IS NOT NULL '+ 
      'AND v.pendencia IS NULL '+
    'ORDER BY '+
      'td.data', 
    {
      bind: [ equipe_id, trabalhoDiario.data ],
      logging: console.log,
    }
  );

  //td.data < $2 AND
  const imo = imoveisVistoriados[ 1 ].rows.map( i => ({
    vistoria_id: i.vistoria_id,
    id: i.id,
    numero: i.numero,
    vistoria_pendencia: i.vistoria_pendencia,
    vistoria_data: i.vistoria_data
  }));

  let result = []
  imo.forEach( i => result.push(i.id))
  if(result.length == 0) result.push(-1)

 /*  console.log("-----------------------------------------")
  console.log(result)
  console.log(imo)
  console.log("-----------------------------------------") */

  return result

}

const router = express.Router();
router.use(authMiddleware);

router.get( '/:usuario_id/usuarios/:data/data', getRoute );
router.get( '/todas/:usuario_id/usuarios/:data/data', getAllRoutes );
router.get( '/planejamento/:usuario_id/usuarios', getPlain );
router.post( '/planejamento', planejarRota );
router.post( '/iniciar', startRoute );
router.post( '/finalizar', endRoute );
router.get( '/check/:trabalhoDiario_id/trabalhoDiario', isStarted );
router.get( '/abertas/:equipe_id/equipes', getOpenRouteByTeam );
router.get( '/planejadas/:ciclo_id/ciclo/:usuario_id/supervisor', consultarRotasPlanejadas );
router.get( '/isFinalizado/:trabalhoDiario_id/trabalhoDiario', isFinalizado );
router.put( '/alterar/:trabalhoDiario_id/trabalhoDiario', alterarRota )


module.exports = app => app.use( '/rotas', router );