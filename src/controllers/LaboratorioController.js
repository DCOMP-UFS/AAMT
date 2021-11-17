const authMiddleware = require('../middlewares/auth');
const express = require('express');
const Laboratorio = require('../models/Laboratorio');

// UTILITY
const allowFunction = require('../util/allowFunction');

const router = express.Router();
router.use(authMiddleware);

/**
 * Retorna a lista de laboratórios de um município
 */
 getLaboratorio = async ( req, res ) => {
  const { municipio_id } = req.params;
  /*
  const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });
  */

  const laboratorios = await Laboratorio.findAll({
    include: {
      association: 'localidade',
      where: {
        municipio_id
      }
    }
  });

  res.json( laboratorios );
}

router.get( '/:municipio_id', getLaboratorio );

module.exports = app => app.use('/laboratorios', router);