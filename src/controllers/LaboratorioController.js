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

  let laboratorio = await Laboratorio.findByPk( cnpj );
  if( laboratorio )
    res.status( 400 ).json( {  error: "CNPJ já existe" } );

  laboratorio = await Laboratorio.create( {
    cnpj,
    nome,
    endereco,
    tipoLaboratorio
  } );
  
  await LaboratorioMunicipio.create( {
    cnpj,
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
  const { cnpjId, cnpj, nome, endereco, tipoLaboratorio, ativo, municipio_id } = req.body;
  const laboratorio = await Laboratorio.findByPk( cnpj );

  if( !laboratorio ){
    res.status( 404 ).json( { error: "CNPJ não existe" } );
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
        cnpj: cnpj,
        municipio_id: municipio_id
      }
  } );

  laboratorio_municipio.set({
    ativo,
  });

  laboratorio_municipio.changed('updatedAt', true); // atualiza updatedAt mesmo sem set de atributos

  await laboratorio.save();
  await laboratorio_municipio.save();

  const resp = {
    cnpjId:          cnpjId,
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