const express = require('express');
const authMiddleware = require('../middlewares/auth');
const RegionalSaude = require('../models/RegionalSaude');
const Estado = require('../models/Estado');
const { Op } = require("sequelize");

// UTILITY
const isCoordinator = require('../util/isCoordinator');

index = async ( req, res ) => {
  const regionais = await RegionalSaude.findAll({
    order: [[ 'nome', 'asc' ]]
  });

  return res.json( regionais );
}

getById = async ( req, res ) => {
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
}

getRegionalHealthByState = async ( req, res ) => {
  const { estado_id } = req.params;

  const estado = Estado.findByPk( estado_id );

  if( !estado ) {
    return res.status(400).json({ error: "Estado não existe" });
  }

  const regionais = await RegionalSaude.findAll({
    where: {
      estado_id
    },
    order: [[ 'nome', 'asc' ]]
  });

  return res.json( regionais );
}


// destroy = async ( req, res ) => {
//   const { id } = req.params;

//   const userId = req.userId;

//   const coordinator = await isCoordinator( userId );
//   if( !coordinator ) {
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
  const { nome, endereco, estado_id } = req.body;
  const userId = req.userId;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
   
  const regional = await RegionalSaude.create({ 
    nome,
    endereco,
    estado_id
  });

  return res.status(201).json( regional );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getById);
router.get('/:estado_id/estados', getRegionalHealthByState);
router.post('/', store);
// router.delete('/:id', destroy);

module.exports = app => app.use('/regionaisSaude', router);