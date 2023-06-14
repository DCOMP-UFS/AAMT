const express = require('express');
const { Op }  = require( 'sequelize' );
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Usuario = require('../models/Usuario');
const RegionalSaude = require('../models/RegionalSaude');
const RegionalMunicipio = require('../models/RegionalMunicipio');
const connection = require('../database/index')

// UTILITY
const allowFunction = require('../util/allowFunction');

const router = express.Router();

index = async ( req, res ) => {
  try{
    const municipios = await Municipio.findAll({
      order: [
        [ 'ativo', 'desc' ],
        [ 'nome', 'asc' ], 
        [ 'codigo', 'asc' ]
      ]
    });
    const municipios_ids = municipios.map( m => m.id)
    
    const regionalMunicipio = await RegionalMunicipio.findAll({
      where:{
        municipio_id:{
          [Op.in]: municipios_ids
        },
        vinculado:true
      },
      include:{
        association:"regional",
        attributes:["id","nome"]
      }
    })
    
    let lista_municipios = []
    for( let i=0; i < municipios_ids.length; i++ ){
      let municipio = {...municipios[i].dataValues}
      let reg_muni = regionalMunicipio.find( rm => rm.municipio_id == municipio.id)

      let regional = {}

      //Caso o municipio não tenha regional vinculdo
      //NUNCA DEVERIA ENTRA AQUI, POIS MUNICIPIO SEMPRE
      //DEVE ESTÁ VINCULADO À UMA REGIONAL
      if(reg_muni == undefined)
        regional = { id: 0, nome: ""}
      else
        regional = reg_muni.regional

      municipio.regional = regional
      lista_municipios.push(municipio)
    }

    return res.json( lista_municipios );

  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getCityByState = async ( req, res ) => {
  try{

    const { estado_id } = req.params;

    const regionaisEstado = await RegionalSaude.findAll(
      {where:{ estado_id } }
    )

    const regionaisEstado_ids = regionaisEstado.map( r => r.id)

    const regionaisMuncipios = await RegionalMunicipio.findAll({
      where:{
        regional_saude_id:{
          [Op.in]: regionaisEstado_ids
        },
        vinculado:true
      },
      include:[
        {association: "regional", attributes: ["id","nome"]},
        {association: "municipio"}
      ]
    })

    let municipios = []
    regionaisMuncipios.forEach( rm => {
      let municipio = { ...rm.dataValues.municipio.dataValues}
      municipio.regional = rm.regional
      municipios.push(municipio)
    })

    municipios.sort( (a,b) => {
      if( a.ativo != b.ativo){
        return (b.ativo - a.ativo)
      }
      else{
        return a.nome.localeCompare(b.nome)
      }
    } )

    return res.json( municipios );

  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getCityById = async ( req, res ) => {
  try{
    const { id } = req.params;

    const municipio = await Municipio.sequelize.query(
      'SELECT ' +
        'm.*, ' +
        'rs.id AS regional_saude_id, ' +
        'rs.nome AS regional_saude_nome, ' +
        'e.id AS estado_id, ' +
        'r.id AS regiao_id, ' + 
        'p.id AS pais_id  ' +
      'FROM  ' +
        'municipios as m  ' +
        'JOIN "regionais_municipios" as rm ON( m.id = rm.municipio_id  ) '+
        'JOIN "regionais_saude" as rs ON( rm.regional_saude_id = rs.id ) ' +
        'JOIN estados as e ON( rs.estado_id = e.id ) ' +
        'JOIN regioes as r ON( e.regiao_id = r.id ) ' +
        'JOIN paises as p ON( r.pais_id = p.id ) ' +
      'WHERE ' +
        'm.id = $1 '+
        'AND rm.vinculado = TRUE', 
      {
        bind: [id],
        logging: console.log,
        plain: true,
        model: Municipio,
        mapToModel: true
      }
    );

    // const municipio = await Municipio.findByPk( id, {
    //   include: {
    //       association: 'regional'
    //   },
    //   attributes: {
    //     exclude: [ 'regionalSaude_id' ]
    //   }
    // });

    if( !municipio ) {
      return res.status(400).json({ error: 'Município não encontrado' });
    }

    return res.json( municipio );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getCityByRegionalHealth = async ( req, res ) => {
  try{
    const { regionalSaude_id } = req.params;
    const { vinculado, municipioAtivo } = req.query

    const regional = await RegionalSaude.findByPk( regionalSaude_id );

    if( !regional ) {
      return res.status(400).json({ error: "Regional não existe" });
    }

    let where = {regional_saude_id: regionalSaude_id}
    if(vinculado == "true" || vinculado == "false")
      where.vinculado = vinculado

    const regionalMunicipio = await RegionalMunicipio.findAll({
      where: where,
      attributes: {
        exclude: [ 'id' ]
      },
    })

    const municipios_ids = regionalMunicipio.map( rm => rm.municipio_id )
  
    let whereMuncipio = { id: { [Op.in]: municipios_ids }}
    if(municipioAtivo == "true" || municipioAtivo == "false")
      whereMuncipio.ativo = municipioAtivo ? 1 : 0

    const municipios = await Municipio.findAll({
      where: whereMuncipio,
      order: [[ 'nome', 'asc' ]]
    });

    return res.json( municipios );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

listUser = async (req, res) => {
  try{
    const { municipio_id } = req.params;

    const municipioFind = await Municipio.findByPk(municipio_id);

    if( !municipioFind ) {
      return res.status(400).json({ error: 'Município não encontrado' });
    }

    const user = await Usuario.findByPk( req.userId, {include: { association: 'municipio' }} );

    if( !user ) {
      return res.status(401).json({ error: 'Usuário não existe' });
    }

    if( user.tipoPerfil !== "C" || user.municipio.id !== parseInt(municipio_id) ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const municipio = await Municipio.findByPk(municipio_id, {
      include: {
        association: 'usuarios'
      }
    });

    return res.json(municipio.usuarios);
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

store = async (req, res) => {
  let transaction

  try{
    const { codigo, nome, regionalSaude_id } = req.body;

    const allow = await allowFunction( req.userId, 'manter_municipio' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    transaction = await connection.transaction()

    const municipio = await Municipio.create({ 
      codigo,
      nome,
      ativo: 1
    }, {transaction});
    
    const regionalMunicipio = await RegionalMunicipio.create({
      regional_saude_id: regionalSaude_id,
      municipio_id: municipio.id
    }, {transaction})

    const regional = await RegionalSaude.findByPk(
      regionalSaude_id,
      {attributes: ["id","nome"]}
    )

    let municip = {...municipio.dataValues}
    municip.regional = regional

    await transaction.commit()

    return res.status(201).json(municip);
  } catch (error) {
    await transaction.rollback()
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

update = async (req, res) => {

  let transaction
  try{

    transaction = await connection.transaction()

    const userId = req.userId;
    const { id } = req.params;
    const { regionalSaude_id, ativo } = req.body

    const allow = await allowFunction( req.userId, 'manter_municipio' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const municipio = await Municipio.findByPk( id );
    if( !municipio ) {
      return res.status(400).json({ error: 'Município não existe' });
    }

    if( regionalSaude_id == null || regionalSaude_id == undefined ){
      return res.status(400).json({ error: 'É necessario informar a regional de saúde do municipio' });
    }

    const municipio_id = id
    const nova_regional_saude_id = req.body.regionalSaude_id
  
    //Encontrar a regional que o municipio está atualmente vinculado
    const regionalMunicipioAtual = await RegionalMunicipio.findOne({
      where:{
        municipio_id,
        vinculado: true
      }
    })

    const antiga_regional_saude_id = regionalMunicipioAtual.regional_saude_id

    //Siginifica que o municipio mudou para outra regional
    if( nova_regional_saude_id != antiga_regional_saude_id){

      if(!ativo)
        return res.status(400).json({ 
          muncipioInativo: true,
          error: 'Um município inativo não pode ser atribuido para outra regional de saúde' 
        });

      //Aqui será feita a desvinculação do muncipio com a regional antiga
      await RegionalMunicipio.update(
        {vinculado: false},
        {
          where: {
            municipio_id,
            regional_saude_id: antiga_regional_saude_id
          },
          transaction
        }
      )

      //Vai verificar se o municipio ja foi vinculado alguma vez com à nova regional
      const reg_mun = await RegionalMunicipio.findOne({
        where:{
          municipio_id,
          regional_saude_id: nova_regional_saude_id,
          vinculado: false
        }
      })
      //Significa que é a primeira vez que o municipio será vinculado a nova regional
      if(reg_mun == null){
        await RegionalMunicipio.create({
          municipio_id,
          regional_saude_id: nova_regional_saude_id,
        }, {transaction})
      }
      else{
        await RegionalMunicipio.update(
          {vinculado: true},
          {
            where: {
              municipio_id,
              regional_saude_id: nova_regional_saude_id
            },
            transaction
          }
        )
      }
    }

    req.body.id = undefined;
    req.body.regionalSaude_id= undefined;
    req.body.createdAt = undefined;
    req.body.updatedAt = undefined;

    const { isRejected } = await Municipio.update(
      req.body,
      {
        where: {
          id
        },
        transaction
      }
    );

    if( isRejected ){
      return res.status(400).json({ error: 'Não foi possível atualizar o município' });
    }

    const muni = await Municipio.findByPk( id );
    const reg = await RegionalSaude.findByPk( 
      nova_regional_saude_id,
      {attributes: ["id","nome"]}
    )

    let result = {...muni.dataValues}
    result.regional = reg

    await transaction.commit();

    return res.json( result );
  } catch (error) {
      await transaction.rollback();
      return res.status( 400 ).send( { 
        status: 'unexpected error',
        mensage: 'Algum problema inesperado ocorreu nesta rota da api',
      } );
  }
}

changeCityRegional = async (req, res) => {

  let transaction
  try{

    transaction = await connection.transaction()
    const { id, regionalSaude_id } = req.params;

    let reg_mun = await RegionalMunicipio.findOne({
      where:{
        municipio_id: id,
        vinculado: true
      }
    })

    if( reg_mun == null )
      return res.status( 400 ).send({ error: 'Municipio informado não está vinculado a nenhuma regional, tem algo errado' })

    //Desvincula o municipio à regional antiga
    await RegionalMunicipio.update(
      {vinculado: false},
      {
        where:{
          municipio_id: id,
          vinculado: true
        },
        transaction
      },
    )
    
    //Verifica se o municipio ja foi vinculado à nova regional
    reg_mun = await RegionalMunicipio.findOne({
      where:{
        municipio_id: id,
        regional_saude_id: regionalSaude_id,
      }
    })

    //Siginifica que é a primeira fez que o municipio será vinculado à nova regional
    if(reg_mun == null){
      await RegionalMunicipio.create({
        municipio_id: id,
        regional_saude_id: regionalSaude_id,
      }, {transaction})
    }
    else{
      await RegionalMunicipio.update(
        {vinculado: true},
        {
          where:{
            municipio_id: id,
            regional_saude_id: regionalSaude_id,
          },
          transaction
        }
      )
    }

    await transaction.commit()
    return res.json( {mensage: " Municipio foi transferido para outra regional com sucesso "} );

  } catch (error) {
    console.log(error)
    await transaction.rollback();
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

destroy = async ( req, res ) => {
  try{
    const { id } = req.params;

    const result = await Municipio.destroy({
      where: {
        id
      }
    });

    return res.json( result );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

router.use(authMiddleware);

router.get('/', index);
router.get('/:id', getCityById);
router.get('/:municipio_id/usuarios', listUser);
router.get('/:estado_id/estados', getCityByState);
router.get('/:regionalSaude_id/regionaisSaude', getCityByRegionalHealth);
router.post('/', store);
router.put('/:id', update);
router.put('/:id/regionalSaude/:regionalSaude_id', changeCityRegional)
router.delete('/:id', destroy);

module.exports = app => app.use('/municipios', router);