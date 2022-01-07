const authMiddleware        = require( '../middlewares/auth' );
const express               = require( 'express' );
const Laboratorio           = require( '../models/Laboratorio' );
const Municipio             = require( '../models/Municipio' );
const LaboratorioMunicipio  = require( '../models/LaboratorioMunicipio' );

// UTILITY
const allowFunction = require( '../util/allowFunction' );
const { setDayWithOptions } = require('date-fns/fp');

const router = express.Router();
router.use( authMiddleware );

/**
 * Retorna a lista de laboratórios de um município
 * @returns {array}
 */
getLaboratorio = async ( req, res ) => {
  const { municipio_id } = req.params;

  const municipio = await Municipio.findByPk( municipio_id );
  if( !municipio )
    res.status( 404 ).json( { error: 'Município não existe' } );

  const laboratorios = await Laboratorio.findAll( {
    include: {
      association: 'municipios',
      where: {
        id: municipio_id
      }
    }
  } );

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

  return res.status( 201 ).json( laboratorio );
}

/**
 * Atualiza um laboratório pelo CNPJ
 * @returns {Object} Laboratorio
 */
updateLaboratorio = async( req, res ) =>{
  const { cnpjId, cnpj, nome, endereco, tipoLaboratorio, ativo } = req.body;

  const cnpjExists = await Laboratorio.findByPk( cnpj );

  if ( !cnpjExists ){
    const query = `UPDATE laboratorios SET cnpj = '${cnpj}' WHERE cnpj = '${cnpjId}';`;
    await Laboratorio.sequelize.query(query);
  }else{
    if ( cnpj != cnpjId){
      res.status( 404 ).json( { error: "CNPJ já existe" } );
    }
  }
  
  const laboratorio = await Laboratorio.findByPk( cnpj );

  if( !laboratorio ){
    res.status( 404 ).json( { error: "CNPJ não existe" } );
  }

  laboratorio.set( {
    cnpj,
    nome,
    endereco,
    tipoLaboratorio,
    ativo,
  });

  await laboratorio.save();
  const resp = {
    cnpjId:          cnpjId,
    cnpj:            laboratorio.cnpj,
    nome:            laboratorio.nome,
    endereco:        laboratorio.endereco,
    tipoLaboratorio: laboratorio.tipoLaboratorio,
    ativo:           laboratorio.ativo,
    createdAt:       laboratorio.createdAt,
    updatedAt:       laboratorio.updatedAt
  }

  console.log(resp);
  return res.json( resp );
}

router.get( '/:municipio_id', getLaboratorio );
router.post( '/', createLaboratorio );
router.put( '/', updateLaboratorio );

module.exports = app => app.use( '/laboratorios', router );