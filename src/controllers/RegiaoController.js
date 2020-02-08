const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Regiao = require('../models/Regiao');
const Pais = require('../models/Pais');
const { Op } = require("sequelize");

// UTILITY
const isCoordinator = require('../util/isCoordinator');

index = async ( req, res ) => {
  const regioes = await Regiao.findAll();

  return res.json( regioes );
}

getById = async ( req, res ) => {
  const { id } = req.params;

  const regiao = await Regiao.findByPk( id );

  if( !regiao ) {
    return res.status(400).json({ error: "Região não existe" });
  }

  return res.json( regiao );
}

getRegionsByNation = async ( req, res ) => {
  const { pais_id } = req.params;

  const pais = Pais.findByPk( pais_id );

  if( !pais ) {
    return res.status(400).json({ error: "País não existe" });
  }

  const regioes = await Regiao.findAll({
    where: {
      pais_id
    },
    order: [[ 'nome', 'asc' ]]
  });

  return res.json( regioes );
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
  const { nome, sigla, pais_id } = req.body;
  const userId = req.userId;

  const coordinator = await isCoordinator( userId );
  if( !coordinator ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const isUnique = await Regiao.findOne({
    where: {
      [Op.or]: [
        {nome},
        {sigla}
      ]
    }
  });
  
  if( isUnique ) {
    return res.status(400).json({ error: 'Nome ou sigla da região já existe' });
  }
   
  const regiao = await Regiao.create({ 
    nome,
    sigla,
    pais_id
  });

  return res.status(201).json( regiao );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getById);
router.get('/:pais_id/paises', getRegionsByNation);
router.post('/', store);
// router.delete('/:id', destroy);

module.exports = app => app.use('/regioes', router);