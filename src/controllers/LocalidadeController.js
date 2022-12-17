const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Localidade = require('../models/Localidade');
const Categoria = require('../models/Categoria');
const Municipio = require('../models/Municipio');
const { Op } = require("sequelize");

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async (req, res) => {
  try{
    const localidades = await Localidade.findAll({
      include: [
        { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'categoria_id', 'municipio_id' ]
      },
      order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
    });

    return res.json( localidades );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getById = async (req, res) => {
  try{
    const { id } = req.params;

    const localidade = await Localidade.findByPk( id, {
      include: [
        { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'categoria_id', 'municipio_id' ]
      },
    });

    if( !localidade ) {
      return res.status(400).json({ error: "Localidade não existe" });
    }

    return res.json( localidade );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

listByCategory = async ( req, res ) => {
  try{
    const { categoria_id } = req.params;

    const localidades = await Localidade.findAll({
      where: {
        categoria_id
      },
      include: [
        { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'categoria_id', 'municipio_id' ]
      },
      order: [
        ['nome', 'ASC'],
        ['createdAt', 'ASC'],
      ]
    });

    return res.json(localidades);
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

listByCity = async ( req, res ) => {
  try{
    const { municipio_id } = req.params;

    const localidades = await Localidade.findAll({
      where: {
        municipio_id
      },
      include: [
        { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'categoria_id', 'municipio_id' ]
      },
      order: [
        ['nome', 'ASC'],
        ['createdAt', 'ASC'],
      ]
    });

    return res.json(localidades);
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

store = async (req, res) => {
  try{
    const { categoria_id, municipio_id } = req.params;
    const { nome, codigo } = req.body;
    const userId = req.userId;

    const allow = await allowFunction( req.userId, 'manter_localidade' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const categoria = await Categoria.findByPk(categoria_id);

    if(!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    const municipio = await Municipio.findByPk(municipio_id);

    if(!municipio) {
      return res.status(400).json({ error: 'Município não encontrada' });
    }

    const nomeMunicipio = municipio.dataValues.nome

    if( await localAlreadyExist(null, nome, municipio_id) ){
      return res.status(400).json({ 
        error: 'Já existe uma localidade de nome "'+nome+'" no municipio "'+nomeMunicipio+'"',
        alreadyExist: true
      });
    }

    const localidade = await Localidade.create({ 
      nome,
      codigo,
      ativo: 1,
      categoria_id,
      municipio_id
    });

    const result = await Localidade.findByPk( localidade.id, {
      include: [
        { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'categoria_id', 'municipio_id' ]
      },
    } );

    return res.status(201).json(result);
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

update = async (req, res) => {
  try{
    const { id } = req.params;
    const userId = req.userId;
    const { categoria_id, municipio_id, nome } = req.body;

    var [nomeMunicipio, idMunicipio, nomeLocal] = [null, municipio_id, nome]

    const allow = await allowFunction( req.userId, 'manter_localidade' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const localidade = await Localidade.findByPk( id, {
      include: { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    });

    if( !localidade ) {
      return res.status(400).json({ error: 'Localidade não encontrada' });
    }

    nomeMunicipio = localidade.dataValues.municipio.nome
    idMunicipio   = localidade.dataValues.municipio.id

    if(!nomeLocal)
      nomeLocal = localidade.dataValues.nome

    if( categoria_id ) {
      const categoria = await Categoria.findByPk( categoria_id );
      if( !categoria ) {
        return res.status(400).json({ error: 'Categoria não encontrada' });
      }
    }

    if( municipio_id ) {
      const municipio = await Municipio.findByPk( municipio_id );
      if( !municipio ) {
        return res.status(400).json({ error: 'Município não encontrada' });
      }
      nomeMunicipio = municipio.dataValues.nome
      idMunicipio   = municipio_id
    }

    const teste = await localAlreadyExist(id, nomeLocal, idMunicipio) 

    if(teste){
      return res.status(400).json({ 
        error: 'Já existe uma localidade de nome "'+nomeLocal+'" no municipio "'+nomeMunicipio+'"',
        alreadyExist: true
      });
    }

    req.body.id = undefined;
    req.body.createdAt = undefined;
    req.body.updatedAt = undefined;

    const { isRejected } = await Localidade.update(
      req.body,
      {
        where: {
          id
        },
        include: [
          { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
          { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
        ],
        attributes: {
          exclude: [ 'categoria_id', 'municipio_id' ]
        }
      }
    );

    if( isRejected ){
      return res.status(400).json({ error: 'Não foi possível atualizar usuário' });
    }

    const result = await Localidade.findByPk( id,  {
      include: [
        { association: 'categoria', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }, 
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'categoria_id', 'municipio_id' ]
      }
    });

    return res.json( result );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

async function localAlreadyExist(id , nome, municipio_id) {
  var query = null
  var variaveis = null
  var filtro = {nome: nome}

  if(id)
    filtro.id = {[Op.ne]: id}
 
  const localidade = await Localidade.findOne({
    include: {
      association: 'municipio',
      where: {
        id: municipio_id,
      },
    },
    where:{
      ...filtro
    }
  })

  /* const localidade = await Localidade.sequelize.query(
    query, 
    {
      bind: variaveis,
      //logging: console.log,
      plain: true,
      model: Localidade,
      mapToModel: true
    }
  ); */
  
  
  if(localidade) {
    return true;
  }

  return false;

}

const router = express.Router();
router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getById);
router.get('/:categoria_id/categorias', listByCategory);
router.get('/:municipio_id/municipios', listByCity);
router.post('/:categoria_id/categorias/:municipio_id/municipios', store);
router.put('/:id', update);

module.exports = app => app.use('/localidades', router);