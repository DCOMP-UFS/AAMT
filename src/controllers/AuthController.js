const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, // 1 dia em segundos
  });
}

authenticate = async (req, res) => {
  const { usuario, senha } = req.body;
  
  const user = await Usuario.findOne({ 
    where: {
      usuario
    },
    include: [
      { association: 'municipio' },
      { association: 'tiposPerfis' }
    ],
    attributes: { exclude: [ 'municipio_id' ] }
  });
  
  let perfil = {};
  if( user.tiposPerfis.length > 1) {
    perfil = user.tiposPerfis.map(( tipoPerfil ) => {
      const tp = tipoPerfil.dataValues;
      return { id: tp.id, descricao: tp.descricao }
    });
  } else {
    perfil = { 
      id: user.tiposPerfis[0].dataValues.id, 
      descricao: user.tiposPerfis[0].dataValues.descricao, 
      sigla: user.tiposPerfis[0].dataValues.sigla 
    }
  }
  
  if(!user) 
    return res.status(400).send({ error: 'User not found' });
  
  if( !bcrypt.compareSync(senha, user.senha) )
    return res.status(400).send({ error: 'Invalid password' });

  user.senha = undefined;

  res.send({ 
    user: {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      rg: user.rg,
      email: user.email,
      usuario: user.usuario,
      ativo: user.ativo,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      municipio: user.municipio,
      tipoPerfil: perfil
    },
    token: generateToken({ id: user.id }) 
  });
}

router.post('/authenticate', authenticate);

module.exports = app => app.use('/auth', router);