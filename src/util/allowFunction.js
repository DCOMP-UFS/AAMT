const Usuario = require('../models/Usuario');
const TipoPerfil = require('../models/TipoPerfil');
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

module.exports = async ( userId, action ) => {
  const usuario = await Usuario.findByPk( userId, {
    include: { association: 'tipos_perfis' }
  });

  const tiposPerfis = usuario.tipos_perfis.map(( tipoPerfil ) => {
    const tp = tipoPerfil.dataValues;
    return tp.id
  });

  let strBind = "";
  tiposPerfis.forEach(( tp, index ) => {
    if(index === tiposPerfis.length - 1)
      strBind = strBind + `ftp.tipo_perfil_id = $${ index + 1 }`;
    else
      strBind = strBind + `ftp.tipo_perfil_id = $${ index + 1 } OR `;
  });
  
  const funcoes = await TipoPerfil.sequelize.query(
    'SELECT DISTINCT ' +
      'f.nome ' +
    'FROM ' +
      'funcoes_tipos_perfis AS ftp ' +
      'INNER JOIN funcoes AS f ON( ftp.funcao_id = f.id ) ' +
    'WHERE ' +
      strBind, 
    {
      bind: tiposPerfis,
      logging: console.log,
      plain: false,
      type: QueryTypes.SELECT
    }
  );

  const result = funcoes.find(( f ) => f.nome === action);
  
  if( result )
    return true;
  else
    return false;
}

