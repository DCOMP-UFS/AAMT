const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');
const {QueryTypes} = require('sequelize');

// UTILITY
const allowFunction = require('../util/allowFunction');
const sequelize = require('sequelize');

getByCityId = async (req, res) => {
  const { municipio_id } = req.params;

  const municipio = await Municipio.findByPk( municipio_id );

  if( !municipio ) {
    return res.status(400).json({ error: "Município não existe" });
  }

  const zonas = await Zona.findAll({
    where: {
      municipio_id
    },
    attributes: {
      exclude: [ 'municipio_id' ]
    },
    order: [['ativo', 'desc'], ['nome', 'asc'], ['createdAt', 'asc']]
  });

  return res.json( zonas );
}

getById = async (req, res) => {
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

  return res.json( zona );
}

store = async (req, res) => {
  const { municipio_id, nome } = req.body;
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

  const result = await Zona.findByPk( zona.id, {
    include: { association: 'municipio', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
    attributes: {
      exclude: [ 'municipio_id' ]
    }
  });

  return res.status(201).json(result);
}

update = async (req, res) => {
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
}

//Verifica se ja existe uma zona ativa como nome x dentro de um municipio y
//Função é usada para evitar que seja criado uma zona com nome repetido ou alterar o nome da zona por um ja existente
//Para criação de uma zona, essa função deve receber o nome e o id do municipio
//Para a alteração de zona, essa função tambem deve receber o id da zona alterada, pois é necessario desconsidera-la
//na verificação de existencia
async function zoneAlreadyExist(id , nome, municipio_id) {
  var query = null
  var variaveis = null
  var filtro = {nome: nome}

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