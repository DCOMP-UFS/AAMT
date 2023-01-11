const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Vistoria = require('../models/Vistoria');
const Imovel = require('../models/Imovel')

// UTILITY
const allowFunction = require('../util/allowFunction');

getInspects = async ( req, res ) => {
  try{
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
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getInspectsByDailyWork = async ( req, res ) => {
  try{
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
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getInspectsByPeriod = async ( req, res ) => {
  try{
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
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

//Está rota recebe o id do trabalho diario iniciado, mas não finalizado, além do id do imóvel.
//O papel desta rota é retornar o status da nova vistoria do imovel (normal ou recuperada)
//Esta rota so deve ser utilizada para vistoria que pertence à um trabalho diario não finalizdo,
//pois em um trabalho não finalizado, os imoveis presente na rota ou não foram vistoriados ou possuem uma
//vistoria pendente(fechada ou recusada)
getNewInspectStatus = async ( req, res ) => {
  try{
    const { trabalho_diario_id, imovel_id } = req.params;
    
    const trabalhoDiario = await TrabalhoDiario.findByPk(trabalho_diario_id)
    if( !trabalhoDiario ) {
      return res.status(400).json({ error: 'Trabalho diário informado não existe' });
    }

    const imovel = Imovel.findByPk(imovel_id)
    if( !imovel ){
      return res.status(400).json({ error: 'Imovél informado não existe' });
    }

    //Encontra todos os trabalhos diarios anteriores ao trabalho diario informado,
    //que foram feitos pela mesma equipe
    const trabalhosAnterioresEquipe = await TrabalhoDiario.findAll({
      where:{
        equipe_id: trabalhoDiario.equipe_id,
        id:{ [Op.lt]: trabalhoDiario.id },
        horaFim:{ [Op.ne]: null }
    
      },
      order:[["id","DESC"]]
    })

    //Para cada trabalho anterior, é buscado uma vistoria 
    //com pendencia(fechado ou recusado) feita no imovel informado
    //Se for encontrada uma vistoria assim, significa que o status da nova vistoria é recuperada
    for(const trabalho_anterior of  trabalhosAnterioresEquipe){
      const isPendente = await Vistoria.findOne( {
        where: {
          trabalho_diario_id: trabalho_anterior.id,
          imovel_id: imovel_id,
          pendencia: {[Op.ne]: null}
        },
      })
      if(isPendente)
        return res.send( { statusNovaVistoria:"R"} )  
    }

    //Se chegou aqui significa que o imovel informado
    //não foi vistoriado uma unica vez, o que indica que
    //o status da nova vistoria é normal
    return res.send( { statusNovaVistoria:"N"} )  

  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

const router = express.Router();
router.use( authMiddleware );

router.get('/:usuario_id/usuarios', getInspects);
router.get('/trabalho/:trabalho_diario_id/trabalhos_diarios', getInspectsByDailyWork);
router.get('/periodo/:usuario_id/usuarios/:data_inicio/data_inicio/:data_fim/data_fim', getInspectsByPeriod);
router.get('/status/:trabalho_diario_id/trabalhos_diarios/:imovel_id/imoveis', getNewInspectStatus);

module.exports = app => app.use('/vistorias', router);