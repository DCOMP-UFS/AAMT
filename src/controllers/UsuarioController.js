const express = require('express');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth');
const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');

const router = express.Router();

index = async (req, res) => {
  const usuarios = await Usuario.findAll({
    include: { association: 'municipio' },
    attributes: {
      exclude: [ 'municipio_id' ]
    }
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
router.post('/:municipio_id/municipios', store);
router.put('/:id', update);

module.exports = app => app.use('/usuarios', router);