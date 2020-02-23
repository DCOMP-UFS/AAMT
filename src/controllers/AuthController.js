const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../config/auth');
const Municipio = require('../models/Municipio');
const Permissao = require('../models/Permissao');
const RegionalSaude = require('../models/RegionalSaude');
const Usuario = require('../models/Usuario');
const getLocationByOperation = require('../util/getLocationByOperation');
const getPermissionByOperation = require('../util/getPermissionByOperation');

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
    include: { 
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    }
  });
  
  if(!user) 
    return res.status(400).send({ error: 'Usuário ou senha incorreta' });
  
  if( !bcrypt.compareSync(senha, user.senha) )
    return res.status(400).send({ error: 'Usuário ou senha incorreta' });

  user.senha = undefined;

  // Consultando as funções que usuário pode acessar de acordo com a atuação
  const permissoes = await getPermissionByOperation( user.atuacoes );

  // Consultando os locais do usuário de acordo com sua atuação
  const locais = await getLocationByOperation( user.atuacoes );

  res.send({ 
    user: {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      rg: user.rg,
      email: user.email,
      usuario: user.usuario,
      ativo: user.ativo,
      ...locais,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      atuacoes: user.atuacoes,
      permissoes
    },
    token: generateToken({ id: user.id }) 
  });
}

router.post('/authenticate', authenticate);

module.exports = app => app.use('/auth', router);