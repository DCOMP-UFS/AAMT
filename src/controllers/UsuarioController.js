const express               = require( 'express' );
const bcrypt                = require( 'bcryptjs' );
const { Op }                = require( 'sequelize' );
const authMiddleware        = require( '../middlewares/auth' );
const Atuacao               = require( '../models/Atuacao' );
const Usuario               = require( '../models/Usuario' );
const Municipio             = require( '../models/Municipio' );
const RegionalSaude         = require( '../models/RegionalSaude' );
const Laboratorio           = require( '../models/Laboratorio' );
const LaboratorioMunicipio  = require( '../models/LaboratorioMunicipio' );



// UTILITY
const allowFunction             = require( '../util/allowFunction' );
const getLocationByOperation    = require( '../util/getLocationByOperation' );
const checkLocationByOperation  = require( '../util/checkLocationByOperation' );
const getAllUsersByRegional     = require( '../util/getAllUsersByRegional' );

const router = express.Router();

index = async ( req, res ) => {
  try{
    const allow = await allowFunction( req.userId, 'manter_usuario' );

    /* if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    } */

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
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getUserById = async ( req, res ) => {
  try{
    const { id } = req.params;
    const userId = req.userId
    const allow = await allowFunction( req.userId, 'manter_usuario' );
    
    /*if( userId !== parseInt(id) && !allow ) 
      return res.status(403).json({ error: 'Acesso negado' }); */

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
      atuacoes: usuario.atuacoes,
      celular: usuario.celular
    });
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getUsersByRegional = async ( req, res ) => {
  try{
    const { regionalSaude_id } = req.params;
    const { incluirLaboratoristas } = req.query;

    const userId = req.userId
    const allow = await allowFunction( userId, 'manter_usuario' );

    if( !allow ) 
      return res.status(403).json({ error: 'Acesso negado' });

    const regionalSaude = await RegionalSaude.findByPk( regionalSaude_id );
    if( !regionalSaude )
      return res.status(400).json({ error: 'Regional de saúde não existe' });

    const municipios = await Municipio.findAll({
      include: {
        association: 'regional',
        where: {
          id: regionalSaude_id
        }
      }
    });

    const usuarios = await getAllUsersByRegional( municipios, regionalSaude, incluirLaboratoristas );

    return res.json( usuarios );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

listByCity = async ( req, res ) => {
  try{
    const { municipio_id } = req.params;
    const { incluirLaboratoristas } = req.query;

    const municipio = await Municipio.findByPk( municipio_id, {
      include: { association: 'regional', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] } 
    });

    var labsId = [-1]
    if(incluirLaboratoristas == '1'){
      const laboratorios = await LaboratorioMunicipio.findAll( { where: { municipio_id : municipio_id } });
      labsId = laboratorios.map(lab => lab.id )
    }

    const usuarios = await Usuario.findAll({
      include: { 
        where: {
          [Op.or]:[
            { escopo: 2, local_id: municipio_id },
            { escopo: 3, local_id: { [Op.in]: labsId} }
          ]
          
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
        atuacoes: u.atuacoes,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      };
    });
    
    return res.json(users);
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

store = async ( req, res ) => {
  try{
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
      return res.status( 400 ).json( { error: 'Local não existe, cheque as localidades das atuações!' } );

    const salt      = bcrypt.genSaltSync( 10 );
    const senhaHash = bcrypt.hashSync( senha, salt );
    let user = {};
    
    const sameCpf = await Usuario.findOne({where:{cpf: cpf},})
    const sameUsuario = await Usuario.findOne({where:{usuario: usuario},})
    const sameEmail = await Usuario.findOne({where:{email: email},})
    
    if(sameCpf || sameUsuario || sameEmail){
      return res.status( 400 ).json( { 
        error: "Usuário, CPF e/ou e-mail já existe na base" ,
        sameCpf:     sameCpf ? true : false,
        sameUsuario: sameUsuario ? true : false,
        sameEmail:   sameEmail ? true : false,
      } );
    }

    try {
      user = await Usuario.create( { 
        nome,
        cpf,
        rg,
        celular,
        email,
        usuario,
        senha: senhaHash,
        ativo: 1
      } );
    } catch( e ) {
      return res.status( 400 ).json( { error: "Usuário, CPF e/ou e-mail já existe na base" } );
    }

    let at = [];
    for( atuacao of atuacoes ) {
      const { tipoPerfil, local_id } = atuacao;
      let escopo = 3;
      switch( tipoPerfil ) {
        case 1:
          escopo = 1;
          break;
        case 5:
          escopo = 3;
          break;
        default:
          escopo = 2;
          break;
      }

      let sequencia_usuario = null;

      if( [ 2, 3, 4 ].includes( tipoPerfil ) ) {
        // Busca os usuários cadastrados naquela mesma localidade
        const agentesCadastrados = await Atuacao.findAll( {
          where: {
            [Op.and]: [
              { local_id },
              { 
                [Op.or]: [
                  { tipoPerfil: 2 },
                  { tipoPerfil: 3 },
                  { tipoPerfil: 4 }
                ] 
              }
            ]
          },
          order: [
            [ 'sequencia_usuario', 'DESC' ]
          ]
        });
        
        // sequencia_usuario = agentesCadastrados.length > 0 ? agentesCadastrados[0].sequencia_usuario + 1 : 1;
        if( agentesCadastrados.length > 0 ) {
          const max = Math.max.apply( Math, agentesCadastrados.map( agente => agente.sequencia_usuario ) )

          sequencia_usuario = max + 1;
        } else {
          sequencia_usuario = 1;
        }
      }

      const result = await Atuacao.create( {
        usuario_id: user.id,
        tipoPerfil,
        local_id,
        escopo,
        sequencia_usuario
      } );
      result.dataValues.usuario_id  = undefined;
      result.dataValues.createdAt   = undefined;
      result.dataValues.updatedAt   = undefined;

      at.push( result );
    }

    user.dataValues.atuacoes = at;
    const locais = await getLocationByOperation( user.dataValues.atuacoes );
    user.dataValues.senha = undefined;

    return res.status(201).json({
      ...user.dataValues,
      ...locais,
    });
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

update = async (req, res) => {
  try{
    const { id } = req.params;
    const { atuacoes, ...body } = req.body;
    const userId = req.userId;
    const allow = await allowFunction( req.userId, 'manter_usuario' );

    
  /*  if( userId !== parseInt(id) && !allow ) 
      return res.status(403).json({ error: 'Acesso negado' }); */
  
    const userUpdate = await Usuario.findByPk( id );
  
    if( !userUpdate ) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const sameCpf = await Usuario.findOne(
      {where:{
          id:{[Op.ne]: parseInt(id)},
          cpf: req.body.cpf
      }, })
  
    const sameEmail = await Usuario.findOne(
      {where:{
        id:{[Op.ne]: parseInt(id)},
        email: req.body.email
      },})
    
    let sameUsuario = false
    if(req.body.usuario){
      sameUsuario = await Usuario.findOne(
        {where:{
          id:{[Op.ne]: parseInt(id)},
          usuario: req.body.usuario
        },})
    }

    if(sameCpf || sameEmail || sameUsuario){
      return res.status( 400 ).json( { 
        error: "Usuário, CPF e/ou e-mail já existe na base" ,
        sameCpf:     sameCpf ? true : false,
        sameEmail:   sameEmail ? true : false,
        sameUsuario: sameUsuario ? true : false
      } );
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
          case 5:
            escopo = 3;
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
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getUserById);
router.get('/:municipio_id/municipios', listByCity);
router.get('/:regionalSaude_id/regionaisSaude', getUsersByRegional);
router.post('/', store);
router.put('/:id', update);

module.exports = app => app.use('/usuarios', router);