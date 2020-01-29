const Usuario = require('../models/Usuario');

module.exports = async userId => {
  const user = await Usuario.findByPk( userId );

  if( user.tipoPerfil !== "C" ) {
    return false;
  }else {
    return true
  }
}