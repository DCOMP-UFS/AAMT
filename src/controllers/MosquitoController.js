const express         = require( 'express' );
const authMiddleware  = require( '../middlewares/auth' );
const Mosquito        = require( '../models/Mosquito' );

/**
 * Consulta todos os mosquitos cadastrados na base e retorna na consulta.
 */
getTodos = async ( req, res ) => {
  const mosquitos = await Mosquito.findAll({
    order: [[ 'nome', 'asc' ]]
  });

  return res.json( mosquitos );
}

const router = express.Router();
router.use( authMiddleware );

router.get( '/', getTodos );

module.exports = app => app.use('/mosquitos', router);