const express = require( 'express' );
const router  = express.Router();
const jwt     = require( 'jsonwebtoken' );
const bcrypt  = require( 'bcryptjs' );

const authConfig                = require( '../config/auth' );
const Usuario                   = require( '../models/Usuario' );
const getLocationByOperation    = require( '../util/getLocationByOperation' );
const getPermissionByOperation  = require( '../util/getPermissionByOperation' );
const getPermissoesVariaveis    = require( '../util/getPermissoesVariaveis' );

/**
 * Esta função gera o token de autenticação definindo os valores armazenados 
 * no token e seu tempo de expiração.
 * 
 * @param {Object} params parametros para serem armazenados na criptografia do token
 * @returns {String}
 */
function generateToken( params = {} ) {
  return jwt.sign( params, authConfig.secret, {
    expiresIn: 86400, // 1 dia em segundos
  } );
}

/**
 * Função responsável por checar o login e senha do usuário
 * 
 * @body {string} usuario
 * @body {string} senha
 */
authenticate = async ( req, res ) => {
  const { usuario, senha } = req.body;

  const user = await Usuario.findOne( { 
    where: {
      usuario,
      ativo: 1
    },
    include: { 
      association: 'atuacoes',
      attributes: { exclude: [ 'createdAt', 'updatedAt', 'usuario_id' ] } 
    }
  } );
  
  if(!user) 
    return res.status( 400 ).send( { 
      status: 'error',
      mensage: 'Usuário ou senha incorreta'
    } );
  
  if( !bcrypt.compareSync( senha, user.senha ) )
    return res.status( 400 ).send( { 
      status: 'error',
      mensage: 'Usuário ou senha incorreta',
      error: 'Usuário ou senha incorreta' 
    } );

  user.senha = undefined;

  // Consultando as funções que usuário pode acessar de acordo com a atuação
  let permissoes = await getPermissionByOperation( user.atuacoes );

  // Consultando o direito a permissões variáveis do usuário
  let permissoesVariaveis = await getPermissoesVariaveis( user.id );

  // Filtrando as permissões já existentes
  permissoesVariaveis = permissoesVariaveis.filter( pv => { 
    const fl_existe = permissoes.findIndex( p => p == pv );

    return fl_existe == -1;
  } );

  permissoes = [ ...permissoes, ...permissoesVariaveis ];

  // Consultando os locais do usuário de acordo com sua atuação
  const locais = await getLocationByOperation( user.atuacoes );

  res.send( {
    user: {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      usuario: user.usuario,
      ativo: user.ativo,
      ...locais,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      atuacoes: user.atuacoes,
      permissoes
    },
    token: generateToken( { id: user.id } )
  } );
}

router.post( '/authenticate', authenticate );

module.exports = app => app.use( '/auth', router );