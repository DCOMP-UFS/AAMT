const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Metodologia = require('../models/Metodologia');

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  const metodologias = await Metodologia.findAll({
    include: {
      association: 'objetivos'
    }
  });

  const allow = await allowFunction( req.userId, 'manter_atividade' );

  if( !allow ) 
    return res.status(403).json({ error: 'Acesso negado' });

  return res.json( metodologias );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/', index);

module.exports = app => app.use('/metodologias', router);