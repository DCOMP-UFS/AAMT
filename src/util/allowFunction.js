const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

const Usuario = require('../models/Usuario');
const getPermissionByOperation = require('./getPermissionByOperation');

module.exports = async ( userId, action ) => {
  const usuario = await Usuario.findByPk( userId, { 
    include: { 
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    }
  });

  if(!usuario) 
    return false;

  const permissoes = await getPermissionByOperation( usuario.atuacoes );

  const result = permissoes.find(( p ) => ( p.nome === action ));
  
  if( result )
    return true;
  else
    return false;
}

