const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Pais = require('../models/Pais');
const { Op } = require("sequelize");

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  try{
    const paises = await Pais.findAll();

    return res.json( paises );
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

    const pais = await Pais.findByPk( id );

    if( !pais ) {
      return res.status(400).json({ error: "País não existe" });
    }

    return res.json( pais );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

destroy = async ( req, res ) => {
  try{
    const { id } = req.params;

    const userId = req.userId;

    const allow = await allowFunction( req.userId, 'manter_pais' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const result = await Pais.destroy({
      where: {
        id
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

store = async (req, res) => {
  try{
    const { nome, sigla } = req.body;
    const userId = req.userId;

    const allow = await allowFunction( req.userId, 'manter_pais' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const isUnique = await Pais.findOne({
      where: {
        [Op.or]: [
          {nome},
          {sigla}
        ]
      }
    });
    
    if( isUnique ) {
      return res.status(400).json({ error: 'Nome ou sigla do páis já existe' });
    }
    
    const pais = await Pais.create({ 
      nome,
      sigla
    });

    return res.status(201).json( pais );
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
router.post('/', store);
router.delete('/:id', destroy);

module.exports = app => app.use('/paises', router);