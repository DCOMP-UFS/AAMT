const express = require( 'express' );
const router  = express.Router();
const jwt     = require( 'jsonwebtoken' );
const bcrypt  = require( 'bcryptjs' );
const nodemailer = require( 'nodemailer' )

const authConfig                = require( '../config/auth' );
const smtpConfig                = require( '../config/smtp' );
const Usuario                   = require( '../models/Usuario' );
const getLocationByOperation    = require( '../util/getLocationByOperation' );
const getPermissionByOperation  = require( '../util/getPermissionByOperation' );
const getPermissoesVariaveis    = require( '../util/getPermissoesVariaveis' );

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  auth:{
    user: smtpConfig.user,
    pass: smtpConfig.pass
  },
})

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
  try {
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
      token: generateToken( { id: user.id } )
    } );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

recoverUserPassword = async (req, res) => {
  try{
    const { email } = req.body;
    const url_web = process.env.URL_PLATAFORMA_WEB

    const user = await Usuario.findOne({
      where:{
        email:email
      }
    })

    if(!user){
      return res.status( 400 ).send({
        userNotFound:true,
        mensage: 'Não foi encontrado usuario com email '+email
      })
    }

    const token = jwt.sign( { email: user.email, id:user.id }, authConfig.secret, {expiresIn: "5m"} )
    const link = url_web+"alterarSenha/"+`${token}`

    const mailSent = await transporter.sendMail({
      text: link,
      subject: "Recuperação de senha",
      to: email,
      html: `
      <html>
      <body>
        Segue abaixo o link para a recuperação da senha, sendo que ele é válido por 5 minutos.
        <br>
        <br>
        ${link}
      </body>
      </html>
      `
    })

    return res.send({  mensage: "Link de recuperação foi enviado para email informado" })

  }catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

validateTokenRecoverUserPassword = async (req, res) => {
  try{

    const { token } = req.params;

    try {
      const verify = jwt.verify(token, authConfig.secret)
      return res.send({
        tokenValido:true,
        mensage: 'Token para alteração de senha ainda é válido'
      })
    } catch (error) {
      return res.status(400).send({
        tokenValido:false,
        mensage: 'Token para alteração não é mais válido'
      })
    }

  }catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

alterateUserPassword = async (req, res) => {
  try{

    const { senha, token } = req.body;

    try {
      const verify = jwt.verify(token, authConfig.secret)
    } catch (error) {
      return res.status(400).send({
        tokenValido:false,
        mensage: 'Token para alteração não é mais válido'
      })
    }
    const salt      = bcrypt.genSaltSync( 10 );
    const senhaHash = bcrypt.hashSync( senha, salt );

    const user_id = jwt.decode( token, authConfig.secret ).id

    await Usuario.update(
      {
        senha: senhaHash,
      },
      {
        where: {
          id:user_id
        }
      }
    );

    return res.send({mensage:"Senha alterada com sucesso"})

  }catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

router.post( '/authenticate', authenticate );
router.post( '/recoverUserPassword', recoverUserPassword );
router.get( '/validateTokenRecoverUserPassword/:token', validateTokenRecoverUserPassword)
router.post('/alterateUserPassword', alterateUserPassword)

module.exports = app => app.use( '/auth', router );