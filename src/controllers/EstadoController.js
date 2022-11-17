const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Estado = require('../models/Estado');
const Regiao = require('../models/Regiao');
const { Op } = require("sequelize");

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  try{
    const estados = await Estado.findAll({
      order: [[ 'nome', 'asc' ]]
    });

    return res.json( estados );
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

    const estado = await Estado.findByPk( id, {
      include: {
        association: 'regiao'
      },
      attributes: {
        exclude: 'regiao_id',
        include: 'id'
      }
    });

    if( !estado ) {
      return res.status(400).json({ error: "Estado não existe" });
    }

    return res.json( estado );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getStatesByRegion = async ( req, res ) => {
  try{
    const { regiao_id } = req.params;

    const regiao = Regiao.findByPk( regiao_id );

    if( !regiao ) {
      return res.status(400).json({ error: "Região não existe" });
    }

    const estados = await Estado.findAll({
      where: {
        regiao_id
      },
      order: [[ 'nome', 'asc' ]]
    });

    return res.json( estados );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}


// destroy = async ( req, res ) => {
//   const { id } = req.params;

//   const userId = req.userId;

//   const allow = await allowFunction( req.userId, 'manter_usuario' );
//   if( !allow ) {
//     return res.status(403).json({ error: 'Acesso negado' });
//   }

//   const result = await Pais.destroy({
//     where: {
//       id
//     }
//   });

//   return res.json( result );
// }

store = async (req, res) => {
  try{
    const { nome, sigla, regiao_id } = req.body;
    const userId = req.userId;

    const allow = await allowFunction( req.userId, 'manter_estado' );

    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const isUnique = await Estado.findOne({
      where: {
        [Op.or]: [
          {nome},
          {sigla}
        ]
      }
    });
    
    if( isUnique ) {
      return res.status(400).json({ error: 'Nome ou sigla do estado já existe' });
    }
    
    const estado = await Estado.create({ 
      nome,
      sigla,
      regiao_id
    });

    return res.status(201).json( estado );
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
router.get('/:regiao_id/regioes', getStatesByRegion);
router.post('/', store);
// router.delete('/:id', destroy);

module.exports = app => app.use('/estados', router);