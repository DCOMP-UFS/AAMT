const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');
const Quarteirao = require('../models/Quarteirao');

// UTILITY
const isCoordinator = require('../util/isCoordinator');

getByCityId = async (req, res) => {
  const { municipio_id } = req.params;

  const municipio = await Municipio.findByPk( municipio_id );

  if( !municipio ) {
    return res.status(400).json({ error: "Município não existe" });
  }

  // const Quarteirao = await Quarteirao.findAll({
  //   where: {
  //     municipio_id
  //   },
  //   include: [
  //     { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
  //     { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
  //   ],
  //   attributes: {
  //     exclude: [ 'localidade_id', 'municipio_id' ]
  //   },
  //   order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
  // });

  return res.json( { message: "OK" } );
}

store = async ( req, res ) => {
  const { numero, zona_id, quarteirao_id } = req.body;

  if( quarteirao_id ) {
    const quarteiraoFather = Quateirao.findByPk( quarteirao_id );

    if( !quarteiraoFather ) {
      return res.status(400).json({ 
        error: `Não foi possível fragmentar o quarteirão pois o quarterião nº ${ quarteirao_id } não existe` 
      });
    }
  }
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:municipio_id/municipios', getByCityId);
router.post('/', store);

module.exports = app => app.use('/quarteiroes', router);