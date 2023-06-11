const express = require('express');
const authMiddleware = require('../middlewares/auth');
const RegionalSaude = require('../models/RegionalSaude');
const RegionalMunicipio = require('../models/RegionalMunicipio')
const Estado = require('../models/Estado');
const { Op } = require("sequelize");

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  try{
    const regionais = await RegionalSaude.findAll({
      order: [[ 'nome', 'asc' ]]
    });

    return res.json( regionais );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getById = async ( req, res ) => {
  try{
    const { id } = req.params;

    const regional = await RegionalSaude.findByPk( id, {
      include: {
        association: 'estado'
      },
      attributes: {
        exclude: 'estado_id',
        include: 'id'
      }
    });

    if( !regional ) {
      return res.status(400).json({ error: "Regional não existe" });
    }

    return res.json( regional );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getRegionalHealthByState = async ( req, res ) => {
  try{
    const { estado_id } = req.params;
    const { ativo } = req.query


    const estado = Estado.findByPk( estado_id );

    if( !estado ) {
      return res.status(400).json({ error: "Estado não existe" });
    }

    let where = {estado_id}
    if(ativo != null){
      if(ativo == "true")
        where.ativo = 1
      else if( ativo == "false" )
        where.ativo = 0
      else
        return res.status(400).json({ error: "Atributo ativo deve receber true, false ou null como valores" });
    }

    const regionais = await RegionalSaude.findAll({
      where: where,
      order: [[ 'nome', 'asc' ]]
    });

    return res.json( regionais );
  } catch (error) {
    console.log(error)
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}


// destroy = async ( req, res ) => {
//   const { id } = req.params;

//   const userId = req.userId;

//   const allow = await allowFunction( req.userId, 'manter_regional_saude' );
//  if( !allow ) {
//    return res.status(403).json({ error: 'Acesso negado' });
//  }

//   const result = await Pais.destroy({
//     where: {
//       id
//     }
//   });

//   return res.json( result );
// }

store = async (req, res) => {
  try{
    const { nome, endereco, estado_id } = req.body;

    const userId = req.userId;

    const allow = await allowFunction( req.userId, 'manter_regional_saude' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    const regional = await RegionalSaude.create({ 
      nome,
      endereco,
      estado_id
    });

    return res.status(201).json( regional );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

update = async (req, res) => {
  try{
    const { id } = req.params;
    let { nome, endereco, ativo } = req.body;

    ativo = parseInt(ativo)

    const userId = req.userId;

    const allow = await allowFunction( req.userId, 'manter_regional_saude' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    const { isRejected } = await RegionalSaude.update(
      {
        nome,
        endereco,
        ativo
      },
      { where: { id } }
    )

    if( isRejected )
      return res.status(400).json({ error: 'Não foi possível atualizar a regional' });
    
    const regional = await RegionalSaude.findByPk(id)  

    return res.status(200).json( regional );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

isAbleToCreateCycleOrActivity = async (req, res) => {
  try{
    const { id } = req.params;

    let regionalSituacao = {
      ativo: null,
      qtdMunicipiosAtivos:[]
    }

    const regional = await RegionalSaude.findByPk(id)

    if(!regional)
      return res.status(400).json( { error:"Regional informada não existe"} );

    regionalSituacao.ativo = regional.ativo

    const regionalMunicipio = await RegionalMunicipio.findAll(
      {
        where:{
          regional_saude_id: id,
          vinculado: true
        },
        include:{
          association:"municipio",
          where:{
            ativo: 1
          }
        }
      }
    )
    let ids = []
    regionalMunicipio.forEach( rm => ids.push(rm.municipio.id))

    regionalSituacao.qtdMunicipiosAtivos = regionalMunicipio.length
    return res.status(200).json( regionalSituacao );

  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

const router = express.Router();
router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getById);
router.get('/:id/verificarSituacao', isAbleToCreateCycleOrActivity);
router.get('/:estado_id/estados', getRegionalHealthByState);
router.post('/', store);
router.put('/:id',update)
// router.delete('/:id', destroy);

module.exports = app => app.use('/regionaisSaude', router);