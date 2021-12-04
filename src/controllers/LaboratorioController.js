const authMiddleware        = require( '../middlewares/auth' );
const express               = require( 'express' );
const Laboratorio           = require( '../models/Laboratorio' );
const Municipio             = require( '../models/Municipio' );
const LaboratorioMunicipio  = require( '../models/LaboratorioMunicipio' );
const fillCnpj              = require( '../util/fillCnpj' );

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

  const municipio = await Municipio.findByPk( municipio_id );
  if( !municipio )
    res.status( 404 ).json( { error: 'Município não existe' } );

  let laboratorios = await Laboratorio.findAll( {
    include: {
      association: 'municipios',
      where: {
        id: municipio_id
      }
    },
  } ).then(laboratorios => {
    return laboratorios.map(laboratorio => ({
      cnpj: fillCnpj(laboratorio.cnpj),
      nome: laboratorio.nome,
      endereco: laboratorio.nome,
      tipoLaboratorio: laboratorio.tipoLaboratorio,
      createdAt: laboratorio.createdAt,
      updatedAt: laboratorio.updatedAt,
      municipios: laboratorio.municipios
    }))
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

  return res.status( 201 ).json( laboratorio );
}

/**
 * Atualiza um laboratório pelo CNPJ
 * @returns {Object} Laboratorio
 */
updateLaboratorio = async( req, res ) =>{
  const { cnpj, nome, endereco, tipoLaboratorio } = req.body;

  const laboratorio = await Laboratorio.findByPk( cnpj );

  console.log(laboratorio);

  if( !laboratorio )
    res.status( 404 ).json( { error: "CNPJ não existe" } );

  laboratorio.set( {
    cnpj,
    nome,
    endereco,
    tipoLaboratorio
  } );

  await laboratorio.save();
  return res.json( laboratorio );
}

router.get( '/:municipio_id', getLaboratorio );
router.post( '/', createLaboratorio );
router.put( '/', updateLaboratorio );

module.exports = app => app.use( '/laboratorios', router );