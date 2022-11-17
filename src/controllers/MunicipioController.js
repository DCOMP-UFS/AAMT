const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Usuario = require('../models/Usuario');
const RegionalSaude = require('../models/RegionalSaude');

// UTILITY
const allowFunction = require('../util/allowFunction');

const router = express.Router();

index = async ( req, res ) => {
  try{
    const municipios = await Municipio.findAll({
      order: [
        [ 'ativo', 'desc' ],
        [ 'nome', 'asc' ], 
        [ 'codigo', 'asc' ]
      ]
    });

    res.json( municipios );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getCityById = async ( req, res ) => {
  try{
    const { id } = req.params;

    const municipio = await Municipio.sequelize.query(
      'SELECT ' +
        'm.*, ' +
        'rs.id AS regional_saude_id, ' +
        'e.id AS estado_id, ' +
        'r.id AS regiao_id, ' + 
        'p.id AS pais_id  ' +
      'FROM  ' +
        'municipios as m  ' +
        'JOIN "regionais_saude" as rs ON( m.regional_saude_id = rs.id ) ' +
        'JOIN estados as e ON( rs.estado_id = e.id ) ' +
        'JOIN regioes as r ON( e.regiao_id = r.id ) ' +
        'JOIN paises as p ON( r.pais_id = p.id ) ' +
      'WHERE ' +
        'm.id = $1', 
      {
        bind: [id],
        logging: console.log,
        plain: true,
        model: Municipio,
        mapToModel: true
      }
    );

    // const municipio = await Municipio.findByPk( id, {
    //   include: {
    //       association: 'regional'
    //   },
    //   attributes: {
    //     exclude: [ 'regionalSaude_id' ]
    //   }
    // });

    if( !municipio ) {
      return res.status(400).json({ error: 'Município não encontrado' });
    }

    return res.json( municipio );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getCityByRegionalHealth = async ( req, res ) => {
  try{
    const { regionalSaude_id } = req.params;

    const regional = RegionalSaude.findByPk( regionalSaude_id );

    if( !regional ) {
      return res.status(400).json({ error: "Regional não existe" });
    }

    const municipios = await Municipio.findAll({
      where: {
        regional_saude_id: regionalSaude_id
      },
      order: [[ 'nome', 'asc' ]]
    });

    return res.json( municipios );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

listUser = async (req, res) => {
  try{
    const { municipio_id } = req.params;

    const municipioFind = await Municipio.findByPk(municipio_id);

    if( !municipioFind ) {
      return res.status(400).json({ error: 'Município não encontrado' });
    }

    const user = await Usuario.findByPk( req.userId, {include: { association: 'municipio' }} );

    if( !user ) {
      return res.status(401).json({ error: 'Usuário não existe' });
    }

    if( user.tipoPerfil !== "C" || user.municipio.id !== parseInt(municipio_id) ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const municipio = await Municipio.findByPk(municipio_id, {
      include: {
        association: 'usuarios'
      }
    });

    return res.json(municipio.usuarios);
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

store = async (req, res) => {
  try{
    const { codigo, nome, regionalSaude_id } = req.body;

    const allow = await allowFunction( req.userId, 'manter_municipio' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const municipio = await Municipio.create({ 
      codigo,
      nome,
      regional_saude_id: regionalSaude_id,
      ativo: 1
    });

    return res.status(201).json(municipio);
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

update = async (req, res) => {
  try{
    const userId = req.userId;
    const { id } = req.params;

    const allow = await allowFunction( req.userId, 'manter_municipio' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const municipio = await Municipio.findByPk( id );
    if( !municipio ) {
      return res.status(400).json({ error: 'Município não existe' });
    }

    req.body.id = undefined;
    req.body.createdAt = undefined;
    req.body.updatedAt = undefined;

    const { isRejected } = await Municipio.update(
      req.body,
      {
        where: {
          id
        }
      }
    );

    if( isRejected ){
      return res.status(400).json({ error: 'Não foi possível atualizar o município' });
    }

    const result = await Municipio.findByPk( id );

    return res.json( result );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

destroy = async ( req, res ) => {
  try{
    const { id } = req.params;

    const result = await Municipio.destroy({
      where: {
        id
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

router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getCityById);
router.get('/:municipio_id/usuarios', listUser);
router.get('/:regionalSaude_id/regionaisSaude', getCityByRegionalHealth);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = app => app.use('/municipios', router);