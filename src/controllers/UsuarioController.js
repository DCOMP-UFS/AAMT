const express = require('express');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth');
const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

const router = express.Router();

index = async (req, res) => {
  const usuarios = await Usuario.findAll({
    include: { association: 'municipio' },
    attributes: {
      exclude: [ 'municipio_id' ]
    },
    order: [
      [ 'ativo', 'desc' ], 
      [ 'nome', 'asc' ], 
      [ 'createdAt', 'asc' ]
    ]
  });

  return res.json(usuarios);
}

getUserById = async ( req, res ) => {
  const { id } = req.params;

  const usuario = await Usuario.sequelize.query(
    'SELECT ' +
      'u.*, ' +
      'rs.id AS regional_saude_id, ' +
      'e.id AS estado_id, ' +
      'r.id AS regiao_id, ' + 
      'p.id AS pais_id  ' +
    'FROM  ' +
      'usuarios as u  ' +
      'JOIN municipios as m ON( u.municipio_id = m.id ) ' +
      'JOIN "regionaisSaude" as rs ON( m.regional_saude_id = rs.id ) ' +
      'JOIN estados as e ON( rs.estado_id = e.id ) ' +
      'JOIN regioes as r ON( e.regiao_id = r.id ) ' +
      'JOIN paises as p ON( r.pais_id = p.id ) ' +
    'WHERE ' +
      'u.id = $1', 
    {
      bind: [id],
      logging: console.log,
      plain: true,
      model: Usuario,
      mapToModel: true,
      type: QueryTypes.SELECT
    }
  );

  const municipio = await Municipio.findByPk( usuario.municipio_id );
  usuario.municipio_id = undefined;

  // const usuario = await Usuario.findByPk( id, {
  //   include: { association: 'municipio' },
  //   attributes: {
  //     exclude: [ 'municipio_id' ]
  //   }
  // });

  if( !usuario ) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  usuario.senha = undefined;

  return res.json({ 
    id: usuario.id,
    nome: usuario.nome,
    cpf: usuario.cpf,
    rg: usuario.rg,
    celular: usuario.celular ,
    email: usuario.email,
    usuario: usuario.usuario,
    ativo: usuario.ativo,
    regionalSaude_id: usuario.dataValues.regional_saude_id,
    estado_id: usuario.dataValues.estado_id,
    regiao_id: usuario.dataValues.regiao_id,
    pais_id: usuario.dataValues.pais_id,
    tipoPerfil: usuario.tipoPerfil,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
    municipio
  });
}

listByCity = async ( req, res ) => {
  const { municipio_id } = req.params;

  const usuarios = await Usuario.findAll({
    where: {
      municipio_id
    },
    include: { association: 'municipio' },
    attributes: {
      exclude: [ 'municipio_id', 'senha' ]
    },
    order: [
      [ 'ativo', 'desc' ], 
      [ 'nome', 'asc' ], 
      [ 'createdAt', 'asc' ]
    ]
  });

  return res.json(usuarios);
}

store = async (req, res) => {
  const { municipio_id } = req.params;
  const { 
    nome,
    cpf,
    rg,
    celular,
    email,
    usuario,
    senha,
    tipoPerfil
  } = req.body;

  const municipio = await Municipio.findByPk(municipio_id);

  if(!municipio) {
    return res.status(400).json({ error: 'Município não encontrado' });
  }

  const salt = bcrypt.genSaltSync(10);
  const senhaHash = bcrypt.hashSync(senha, salt);

  const user = await Usuario.create({ 
    nome,
    cpf,
    rg,
    celular,
    email,
    usuario,
    senha: senhaHash,
    tipoPerfil,
    ativo: 1,
    municipio_id
  },{
    include: { association: 'municipio' },
    attributes: {
      exclude: [ 'municipio_id' ]
    }
  });

  return res.status(201).json(user);
}

update = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const userReq = await Usuario.findByPk( userId );
  const userUpdate = await Usuario.findByPk( id );

  if( !userUpdate ) {
    return res.status(400).json({ error: 'Usuário não existe' });
  }

  if( id !== userReq.id && userReq.tipoPerfil !== "C" ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  if( userReq.municipio_id !== userUpdate.municipio_id ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  req.body.id = undefined;
  req.body.senha = undefined;
  req.body.createdAt = undefined;
  req.body.updatedAt = undefined;

  const { isRejected } = await Usuario.update(
    req.body,
    {
      where: {
        id
      }
    }
  );

  if( isRejected ){
    return res.status(400).json({ error: 'Não foi possível atualizar usuário' });
  }

  const result = await Usuario.findByPk( id );

  return res.json( result );
}

router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getUserById);
router.get('/:municipio_id/municipios', listByCity);
router.post('/:municipio_id/municipios', store);
router.put('/:id', update);

module.exports = app => app.use('/usuarios', router);