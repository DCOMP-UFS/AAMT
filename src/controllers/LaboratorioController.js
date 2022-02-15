const authMiddleware        = require( '../middlewares/auth' );
const express               = require( 'express' );
const Sequelize = require('sequelize');
const Laboratorio           = require( '../models/Laboratorio' );
const Municipio             = require( '../models/Municipio' );
const LaboratorioMunicipio  = require( '../models/LaboratorioMunicipio' );

// UTILITY
const allowFunction = require( '../util/allowFunction' );

const router = express.Router();
router.use( authMiddleware );

/**
 * Retorna a lista de laboratórios de um município
 * @returns {array}
 */
getLaboratorio = async ( req, res ) => {
  const { municipio_id } = req.params;

  const laboratorios = await LaboratorioMunicipio.findAll({
    where: { municipio_id : municipio_id },
    attributes:{
        include: [
          [Sequelize.col('laboratorios.cnpj'), 'cnpj'],
          [Sequelize.col('laboratorios.nome'), 'nome'],
          [Sequelize.col('laboratorios.endereco'), 'endereco'],
          [Sequelize.col('laboratorios.tipo_laboratorio'), 'tipoLaboratorio']
        ]
    },
    include: [
        {
            model: Laboratorio,
            as: 'laboratorios',
            attributes: []
        }
    ]
  });

  res.json( laboratorios );
}

/**
 * Esta função cria um laboratório e faz a relação entre laboratório/município
 * @returns {Object} Laboratorio
 */
createLaboratorio = async( req, res ) => {
  const { cnpj, nome, endereco, tipoLaboratorio, municipio_id } = req.body;

  const userId = req.userId;

  const allow = await allowFunction( userId, 'manter_laboratorio' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  laboratorio = await Laboratorio.create( {
    cnpj,
    nome,
    endereco,
    tipoLaboratorio
  } );

  await LaboratorioMunicipio.create( {
    laboratorio_id: laboratorio.id,
    municipio_id
  } );

  laboratorio.dataValues.ativo = true;

  return res.status( 201 ).json( laboratorio );
}

/**
 * Atualiza um laboratório pelo CNPJ
 * @returns {Object} Laboratorio
 */
updateLaboratorio = async( req, res ) =>{
  const { id, cnpj, nome, endereco, tipoLaboratorio, ativo, municipio_id } = req.body;

  const userId = req.userId;
  
  const allow = await allowFunction( userId, 'manter_laboratorio' );
  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const laboratorio = await Laboratorio.findByPk( id );

  if( !laboratorio ){
    res.status( 404 ).json( { error: "Laboratório não existe" } );
  }

  laboratorio.set( {
    cnpj,
    nome,
    endereco,
    tipoLaboratorio,
  });

  laboratorio.changed('updatedAt', true) // atualiza updatedAt mesmo sem set de atributos

  const laboratorio_municipio = await LaboratorioMunicipio.findOne( {
      where: {
        laboratorio_id : id,
        municipio_id   : municipio_id
      }
  } );

  laboratorio_municipio.set({
    ativo,
  });

  laboratorio_municipio.changed('updatedAt', true); // atualiza updatedAt mesmo sem set de atributos

  await laboratorio.save();
  await laboratorio_municipio.save();

  const resp = {
    id:              laboratorio.id,
    cnpj:            laboratorio.cnpj,
    nome:            laboratorio.nome,
    endereco:        laboratorio.endereco,
    tipoLaboratorio: laboratorio.tipoLaboratorio,
    ativo:           laboratorio_municipio.ativo,
    createdAt:       laboratorio.createdAt,
    updatedAt:       laboratorio.updatedAt
  }

  return res.json( resp );
}

router.get( '/:municipio_id', getLaboratorio );
router.post( '/', createLaboratorio );
router.put( '/', updateLaboratorio );

module.exports = app => app.use( '/laboratorios', router );