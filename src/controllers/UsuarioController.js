const express = require('express');
const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');

const authMiddleware = require('../middlewares/auth');
const Atuacao = require('../models/Atuacao');
const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');

// UTILITY
const allowFunction = require('../util/allowFunction');
const getLocationByOperation = require('../util/getLocationByOperation');
const checkLocationByOperation = require('../util/checkLocationByOperation');

const router = express.Router();

index = async (req, res) => {
  const allow = await allowFunction( req.userId, 'manter_usuario' );

  if( !allow ) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  const usuarios = await Usuario.findAll({
    include: { 
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    },
    order: [
      [ 'ativo', 'desc' ], 
      [ 'nome', 'asc' ], 
      [ 'createdAt', 'asc' ]
    ]
  });

  return res.json( usuarios );
}

getUserById = async ( req, res ) => {
  const { id } = req.params;
  const userId = req.userId
  const allow = await allowFunction( req.userId, 'manter_usuario' );

  if( userId !== parseInt(id) && !allow ) 
    return res.status(403).json({ error: 'Acesso negado' });

  const usuario = await Usuario.findByPk( id, { 
    include: { 
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    }
  });
  
  if(!usuario) 
    return res.status(400).send({ error: 'Usuário não encontrado' });

  usuario.senha = undefined;

  // Consultando os locais do usuário de acordo com sua atuação
  const locais = await getLocationByOperation( usuario.atuacoes );

  res.send({ 
    id: usuario.id,
    nome: usuario.nome,
    cpf: usuario.cpf,
    rg: usuario.rg,
    email: usuario.email,
    usuario: usuario.usuario,
    ativo: usuario.ativo,
    ...locais,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
    atuacoes: usuario.atuacoes
  });
}

listByCity = async ( req, res ) => {
  const { municipio_id } = req.params;

  const municipio = await Municipio.findByPk( municipio_id, {
    attributes: { exclude: [ 'createdAt', 'updatedAt' ] } 
  });

  const usuarios = await Usuario.findAll({
    include: { 
      where: {
        escopo: 2,
        local_id: municipio_id
      },
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    },
    attributes: {
      exclude: [ 'senha' ]
    },
    order: [
      [ 'ativo', 'desc' ], 
      [ 'nome', 'asc' ], 
      [ 'createdAt', 'asc' ]
    ]
  });

  const users = usuarios.map( u => {    
    return { 
      id: u.id,
      nome: u.nome,
      cpf: u.cpf,
      rg: u.rg,
      email: u.email,
      usuario: u.usuario,
      ativo: u.ativo,
      municipio,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    };
  });
  
  return res.json(users);
}

store = async (req, res) => {
  const { 
    nome,
    cpf,
    rg,
    celular,
    email,
    usuario,
    senha,
    atuacoes
  } = req.body;

  const checkLocation = await checkLocationByOperation( atuacoes );

  if( !checkLocation )
    return res.status(400).json({ error: 'Local não existe, cheque as localidades das atuações!' });

  const salt = bcrypt.genSaltSync(10);
  const senhaHash = bcrypt.hashSync(senha, salt);
  let user = {};
  
  try {

    user = await Usuario.create({ 
      nome,
      cpf,
      rg,
      celular,
      email,
      usuario,
      senha: senhaHash,
      ativo: 1
    });

  }catch(e) {
    return res.status(400).json({ error: "Usuário, CPF, RG ou e-mail já existe na base" });
  }

  let at = [];
  for (atuacao of atuacoes) {
    const { tipoPerfil, local_id } = atuacao;
    let escopo = 3;
    switch (tipoPerfil) {
      case 1:
        escopo = 1;
        break;
    
      default:
        escopo = 2;
        break;
    }

    const result = await Atuacao.create({
      usuario_id: user.id,
      tipoPerfil,
      local_id,
      escopo
    });
    result.dataValues.usuario_id = undefined;
    result.dataValues.createdAt = undefined;
    result.dataValues.updatedAt = undefined;

    at.push( result );
  }

  user.dataValues.atuacoes = at;

  return res.status(201).json(user);
}

update = async (req, res) => {
  const { id } = req.params;
  const { atuacoes, ...body } = req.body;
  const userId = req.userId;
  const allow = await allowFunction( req.userId, 'manter_usuario' );

  if( userId !== parseInt(id) && !allow ) 
    return res.status(403).json({ error: 'Acesso negado' });
    
  const userUpdate = await Usuario.findByPk( id );

  if( !userUpdate ) {
    return res.status(400).json({ error: 'Usuário não existe' });
  }

  req.body.id = undefined;
  req.body.senha = undefined;
  req.body.createdAt = undefined;
  req.body.updatedAt = undefined;

  const { isRejected } = await Usuario.update(
    body,
    {
      where: {
        id
      }
    }
  );

  if( isRejected )
    return res.status(400).json({ error: 'Não foi possível atualizar usuário' });

  if( atuacoes ) {
    await Atuacao.destroy({
      where: {
        usuario_id: id
      }
    });

    for (atuacao of atuacoes) {
      const { tipoPerfil, local_id } = atuacao;
      let escopo = 3;
      switch (tipoPerfil) {
        case 1:
          escopo = 1;
          break;
      
        default:
          escopo = 2;
          break;
      }
  
      const result = await Atuacao.create({
        usuario_id: id,
        tipoPerfil,
        local_id,
        escopo
      });
    }
  }

  const result = await Usuario.findByPk( id, {
    include: { 
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    }
  });

  const locais = await getLocationByOperation( result.dataValues.atuacoes );

  return res.json({
    id: result.id,
    nome: result.nome,
    cpf: result.cpf,
    rg: result.rg,
    email: result.email,
    usuario: result.usuario,
    ativo: result.ativo,
    ...locais,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    atuacoes: result.atuacoes
  });
}

router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getUserById);
router.get('/:municipio_id/municipios', listByCity);
router.post('/', store);
router.put('/:id', update);

module.exports = app => app.use('/usuarios', router);