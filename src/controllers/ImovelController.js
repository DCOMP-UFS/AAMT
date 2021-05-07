const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Imovel = require('../models/Imovel');
const Lado = require('../models/Lado');

getImoveisMunicipio = async ( req, res ) => {
  const { municipio_id } = req.params;

  const imoveis = await Imovel.sequelize.query(
    'SELECT ' +
      'i.*, ' +
      'r.nome as "logradouro" ' +
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
      model: Imovel,
      mapToModel: true
    }
  );

  return res.json( imoveis );
}

index = async ( req, res ) => {
  const imoveis = await Imovel.findAll({
    order: [[ 'numero', 'asc' ]]
  });

  return res.json( imoveis );
}

store = async ( req, res ) => {
  const { numero, sequencia, responsavel, complemento, tipoImovel, lado_id } = req.body;

  const lado = await Lado.findByPk( lado_id );
  if( !lado ) {
    return res.status(400).json({ error: "Lado do quarteirão não encontrado" });
  }

  const imovel = await Imovel.create({
    numero,
    sequencia,
    responsavel,
    complemento,
    tipoImovel,
    lado_id
  });
  
  return res.status(201).json( imovel );  
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