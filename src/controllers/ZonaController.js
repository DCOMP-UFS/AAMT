const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');
const {QueryTypes, where} = require('sequelize');
const { Op } = require("sequelize");

// UTILITY
const allowFunction = require('../util/allowFunction');
const sequelize = require('sequelize');
const Quarteirao = require('../models/Quarteirao');

getByCityId = async (req, res) => {
  try{
    const { municipio_id } = req.params;
    const { ativo } = req.query

    const municipio = await Municipio.findByPk( municipio_id );

    if( !municipio ) {
      return res.status(400).json({ error: "Município não existe" });
    }

    const zonas = await Zona.findAll({
      where: {
        ...(ativo ? {
          municipio_id,
          ativo: ativo === 'sim' ? 1 : 0
        } : {municipio_id})
      },
      attributes: {
        exclude: [ 'municipio_id' ]
      },
      order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
    });

    return res.json( zonas );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getById = async (req, res) => {
  try{
    const { id } = req.params;

    const zona = await Zona.findByPk( id, {
      include: [
        { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
      ],
      attributes: {
        exclude: [ 'municipio_id' ]
      }
    });

    if( !zona ) {
      return res.status(400).json({ error: "Zona não existe" });
    }

    const quarteiroes_zona = await Quarteirao.findAll(
      {
        where:{zona_id: zona.id},
        order:[['numero','asc']]
      }
    )

    return res.json( {zona, quarteiroes_zona} );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

store = async (req, res) => {
  try{
    const { municipio_id, nome, quarteiroes_id } = req.body;
    const userId = req.userId;

    const allow = await allowFunction( userId, 'manter_zona' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const municipio = await Municipio.findByPk(municipio_id);

    if(!municipio) {
      return res.status(400).json({ error: 'Município não encontrada' });
    }

    const nomeMunicipio = municipio.dataValues.nome

    if(!nome)
      return res.status(400).json({ error: 'Por favor informe o nome da zona' });

    //Verifica se ja existe zona com mesmo nome e municipio
    if( await zoneAlreadyExist(null, nome, municipio_id) ){
      return res.status(400).json({ 
        error: 'Já existe uma zona de nome "'+nome+'" no municipio "'+nomeMunicipio+'"',
        alreadyExist: true
      });
    }

    const zona = await Zona.create({ 
      nome,
      municipio_id,
      ativo: 1
    });

    for(const id of quarteiroes_id){
      const { isRejected } = await Quarteirao.update(
        {zona_id: zona.id},
        {where:{id}}
      )

      if(isRejected){
        return res.status(400).json({ error: 'Não foi possível adicionar o quarteirao de id='+id+' na zona' });
      }
    }

    const result = await Zona.findByPk( zona.id, {
      include: { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
      attributes: {
        exclude: [ 'municipio_id' ]
      }
    });

    return res.status(201).json(result);
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
    const userId = req.userId;
    const { municipio_id, nome, ativo} = req.body; 

    var [nomeMunicipio, idMunicipio, nomeZona] = [null, municipio_id, nome]

    const allow = await allowFunction( userId, 'manter_zona' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const zona = await Zona.findByPk(id, {
      include: { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    });

    if( !zona ) {
      return res.status(400).json({ error: 'Zona não encontrada' });
    }
    
    //Antes não era possivel mudar o nome da zona
    //Para evitar que quebre alguma pagina que utiliza essa rota
    //foi considerado um parametro opcional
    if( !nomeZona ) 
      nomeZona = zona.dataValues.nome

    nomeMunicipio = zona.dataValues.municipio.nome
    idMunicipio   = zona.dataValues.municipio.id
    
    //Essa condicional ja estava aqui antes do commit
    //Ela serve no caso de alguem querer mudar o municipio da zona?
    if( municipio_id ) {
      const municipio = await Municipio.findByPk( municipio_id );
      if( !municipio ) {
        return res.status(400).json({ error: 'Município não encontrada' });
      }
      nomeMunicipio = municipio.dataValues.nome
      idMunicipio   = municipio_id
    }

    //Verifica se ja existe zona com mesmo nome e municipio
    if( await zoneAlreadyExist(id, nomeZona, idMunicipio) ){
      return res.status(400).json({ 
        error: 'Já existe uma zona de nome "'+nomeZona+'" no municipio "'+nomeMunicipio+'"',
        alreadyExist: true
      });
    }

    else{
        req.body.id = undefined;
        req.body.createdAt = undefined;
        req.body.updatedAt = undefined;

        const { isRejected } = await Zona.update(
          req.body,
          {
            where: {
              id
            }
          }
        );

        if( isRejected ){
          return res.status(400).json({ error: 'Não foi possível atualizar a zona' });
        }

        if(ativo == 0){
          const { isRejected } = await Quarteirao.update(
            {zona_id: null},
            {where: {zona_id: zona.id}}
          )
          if( isRejected ){
            return res.status(400).json({ error: 'Não foi possivel desvincular os quarteirões da zona recem-excluida' });
          }
        }

        const result = await Zona.findByPk( id,  {
          include: [
            { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
          ],
          attributes: {
            exclude: [ 'municipio_id' ]
          }
        });

        return res.json( result );
    }
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

//Verifica se ja existe uma zona ativa como nome x dentro de um municipio y
//Função é usada para evitar que seja criado uma zona com nome repetido ou alterar o nome da zona por um ja existente
//Para criação de uma zona, essa função deve receber o nome e o id do municipio
//Para a alteração de zona, essa função tambem deve receber o id da zona alterada, pois é necessario desconsidera-la
//na verificação de existencia
async function zoneAlreadyExist(id , nome, municipio_id) {
  var query = null
  var variaveis = null
  var filtro = {nome: nome, ativo:1}

  if(id)
    filtro.id = {[Op.ne]: id}
  
  const zona = await Zona.findOne({
    include: {
      association: 'municipio',
      where: {
        id: municipio_id,
      },
    },
    where:{
      ...filtro
    }
  })
  
  if(zona) {
    return true;
  }

  return false;

}

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', getById);
router.get('/:municipio_id/municipios', getByCityId);
router.post('/', store);
router.put('/:id', update);


module.exports = app => app.use('/zonas', router);