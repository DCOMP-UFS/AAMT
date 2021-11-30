const express         = require(  'express' );
const authMiddleware  = require(  '../middlewares/auth' );
const Imovel          = require(  '../models/Imovel' );
const Lado            = require(  '../models/Lado' );
const Quarteirao      = require(  '../models/Quarteirao' );
const Rua             = require(  '../models/Rua' );

getImoveisMunicipio = async ( req, res ) => {
  const { municipio_id } = req.params;

  const result = await Imovel.sequelize.query(
    'SELECT ' +
      'i.*, ' +
      'l.id as "lado_id", ' +
      'r.nome as "logradouro", ' +
      'q.id as "quarteirao_id", ' +
      'q.numero as "quarteirao_numero" ' +
    'FROM ' +
      'imoveis as i ' +
      'JOIN lados as l ON( i.lado_id = l.id ) ' +
      'JOIN ruas as r ON( l.rua_id = r.id ) ' +
      'JOIN quarteiroes as q ON( l.quarteirao_id = q.id ) ' +
      'JOIN localidades as loc ON( q.localidade_id = loc.id ) ' +
    'WHERE ' +
      'loc.municipio_id = $1', 
    {
      bind: [ municipio_id ],
      logging: console.log,
    }
  );

  const imoveis = result[ 1 ].rows.map( i => ({
    id: i.id,
    numero: i.numero,
    sequencia: i.sequencia,
    responsavel: i.responsavel,
    complemento: i.complemento,
    tipoImovel: i.tipo_imovel,
    lado_id: i.lado_id,
    createdAt: i.created_at,
    updatedAt: i.updated_at,
    lat: i.lat,
    lng: i.lng,
    ativo: i.ativo,
    logradouro: i.logradouro,
    quarteirao: {
      id: i.quarteirao_id,
      numero: i.quarteirao_numero
    }
  }));

  return res.json( imoveis );
}

index = async ( req, res ) => {
  const imoveis = await Imovel.findAll({
    order: [[ 'numero', 'asc' ]]
  });

  return res.json( imoveis );
}

store = async ( req, res ) => {
  const { numero, sequencia, responsavel, complemento, tipoImovel, lado_id, lng, lat } = req.body;

  const lado = await Lado.findByPk( lado_id );
  if( !lado )
    return res.status( 400 ).json( { error: "Lado do quarteirão não encontrado" } );

  const imovel = await Imovel.create({
    numero,
    sequencia,
    responsavel,
    complemento,
    tipoImovel,
    lado_id,
    lng, 
    lat
  }).then( async imovel => {
    const quarteirao  = await Quarteirao.findByPk( lado.quarteirao_id );
    const rua         = await Rua.findByPk( lado.rua_id );

    return ({
      ...imovel.dataValues,
      lado_id: lado.id,
      logradouro: rua.nome,
      quarteirao: {
        id: quarteirao.id,
        numero: quarteirao.numero
      }
    });
  });
  
  return res.status( 201 ).json( imovel );  
}

update = async ( req, res ) => {
  const { lado_id } = req.body;
  const { id } = req.params;

  let imovel = await Imovel.findByPk( id );
  if( !imovel ) {
    return res.status(400).json({ error: "Imóvel não encontrado" });
  }

  if( lado_id ) {
    const lado = await Lado.findByPk( lado_id );
    if( !lado ) {
      return res.status(400).json({ error: "Lado do quarteirão não encontrado" });
    }
  }
  
  const { isRejected } = await Imovel.update(
    req.body,
    {
      where: {
        id
      }
    }
  );

  if( isRejected ) {
    return res.status(400).json({ error: 'Não foi possível atualizar o imóvel' });
  }

  imovel = await Imovel.findByPk( id );

  return res.json( imovel );
}

destroy = async ( req, res ) => {
  const { id } = req.params;

  const deleted = await Imovel.destroy({
    where: {
      id
    }
  });

  if( deleted )
    return res.json({ message: "Imóvel deletado" });

  return res.status(404).json({ message: "Imóvel não encontrado" });
}

const router = express.Router();
router.use(authMiddleware);

router.get( '/', index );
router.get( '/:municipio_id/municipios', getImoveisMunicipio );
router.post( '/', store );
router.delete( '/:id', destroy );
router.put( '/:id', update );

module.exports = app => app.use( '/imoveis', router );