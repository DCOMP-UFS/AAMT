const express         = require( 'express' );
const authMiddleware  = require( '../middlewares/auth' );
const Metodologia     = require( '../models/Metodologia' );

// UTILITY
const allowFunction = require( '../util/allowFunction' );

/**
 * Consulta a lista de metodologias de atividades
 * @returns {array}
 */
index = async ( req, res ) => {
  try{
    const metodologias = await Metodologia.findAll( {
      include: {
        association: 'objetivos'
      }
    } );

    const allow = await allowFunction( req.userId, 'manter_atividade', 'manter_atividade_municipio' );

    if( !allow ) 
      return res.status( 403 ).json( { error: 'Acesso negado' } );

    return res.json( metodologias );
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

module.exports = app => app.use('/metodologias', router);