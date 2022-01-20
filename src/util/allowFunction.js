const Usuario                   = require( '../models/Usuario' );
const getPermissionByOperation  = require( './getPermissionByOperation' );
const getPermissoesVariaveis    = require( './getPermissoesVariaveis' );

module.exports = async ( userId, ...actions ) => {
  const usuario = await Usuario.findByPk( userId, { 
    include: { 
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    }
  } );

  if( !usuario ) 
    return false;

  const permissoes          = await getPermissionByOperation( usuario.atuacoes );
  const permissoesVariaveis = await getPermissoesVariaveis( usuario.id );

  const result          = permissoes.filter( p => actions.includes( p ) );
  const resultVariavel  = permissoesVariaveis.filter( p => actions.includes( p ) );
  
  if( result.length > 0 || resultVariavel.length > 0 )
    return true;
  else
    return false;
}

