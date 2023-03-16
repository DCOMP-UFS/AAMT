const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Rua = require('../models/Rua');
const Localidade = require('../models/Localidade');
const Municipio = require('../models/Municipio');
const { Op } = require("sequelize");
const Lado = require('../models/Lado');

getStreetByCity = async ( req, res ) => {
  try{
    const { municipio_id } = req.params;

    if( !municipio_id ) {
      return res.status(404).json({ erro: "Id do município não foi informado" });
    }

    const municipio = await Municipio.findByPk( municipio_id );

    if( !municipio ) {
      return res.status(400).json({ error: "Município não existe" });
    }

    const ruas = await Rua.findAll({
      where: {
        municipio_id: municipio_id,
        ativo:true
      },
      include: {
        association: 'municipio',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      },
      attributes: {
        exclude: [ 'municipio_id' ]
      },
      order: [[ 'nome', 'asc' ]]
    });

    return res.json( ruas );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

store = async ( req, res ) => {
  const { nome, cep, municipio_id } = req.body;

  try{

    if(!nome) return res.status(400).json({ erro: "Informe o nome da rua" });
    if(!cep) return res.status(400).json({ erro: "Informe o cep da rua" });
    if(!municipio_id) return res.status(400).json({ erro: "Informe o municipio da rua" });
    
    const municipio = await Municipio.findByPk( municipio_id );
    if( !municipio ) {
      return res.status(400).json({ error: "Municipio com id="+municipio_id+" não existe" });
    }

   /*  const {sameCEP} = await ruaExistente(null,cep)
    if(sameCEP){
      return res.status(400).json({
        error:"Não foi possivel criar a rua, a regra de cep único não foi respeitada",
        sameCEP,
      });
    } */
    
    //As linhas comentadas acima serviam para verificar ser está sendo criado uma rua com um cep ja utilizado
    //Ela foi comentada pq existem municipios em que todas as ruas possuem o mesmo cep

    const rua = await Rua.create({
      nome,
      cep,
      municipio_id
    })
   
    const result = await Rua.findByPk(rua.id, {
      include: {
        association: 'municipio',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      },
      attributes: {
        exclude: [ 'municipio_id' ]
      }
    });
  
    return res.status(201).json( result );

  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

update = async ( req, res ) => {
  const { nome, cep } = req.body;
  const { id } = req.params;

  try{

    if(!id) return res.status(400).json({ erro: "Informe o id da rua" });
    if(!nome) return res.status(400).json({ erro: "Informe o nome da rua" });
    if(!cep) return res.status(400).json({ erro: "Informe o cep da rua" });

    let rua = await Rua.findByPk( id, {
      include: {
        association: 'municipio',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      }
    });

    if( !rua ) {
      return res.status(400).json({ error: "Rua não encontrada" });
    }
  
    /* const {sameCEP} = await ruaExistente(id,cep)
    if(sameCEP){
      return res.status(400).json({
        error:"Não foi possivel atualizar a rua, a regra de cep único não foi respeitada",
        sameCEP,
      });
    } */

    //As linhas comentadas acima serviam para verificar ser está sendo criado uma rua com um cep ja utilizado
    //Ela foi comentada pq existem municipios em que todas as ruas possuem o mesmo cep

    const { isRejected } = await Rua.update(
      req.body,
      {
        where: {
          id
        }
      }
    );

    if( isRejected ){
      return res.status(400).json({ error: 'Não foi possível atualizar a rua' });
    }

    rua = await Rua.findByPk( id, {
      include: {
        association: 'municipio',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      },
      attributes: {
        exclude: [ 'municipio_id' ]
      }
    });

    return res.json( rua );

  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

destroy = async ( req, res ) => {
  const { id } = req.params;

  try {
    if(!id) return res.status(400).json({ erro: "Informe o id da rua" });

    const rua = await Rua.findByPk(id)
    if(!rua)
      return res.status(404).json({ message: "Rua não encontrado" });

    //Procura todos os lados ativos associados a rua
    const lados = await Lado.findAll({
      where:{
        ativo:true,
        rua_id:id
      },
      include: [
        {
          association: 'quarteirao',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
      ]
    })
    
    //Não existem lados associados
    if(lados.length == 0){
      await Rua.update(
        {ativo:false},
        {where: { id } }
      );
    
      return res.json({ message: "Rua deletada" });
    }
    else{
      var numQuarteiroes = []
      lados.forEach(l => {
        if(numQuarteiroes.indexOf(l.quarteirao.numero) == -1)
          numQuarteiroes.push(l.quarteirao.numero)
      })
      return res.status(409).json({ 
        error: "Verifique se existem quarteirões associados a essa rua antes de exclui-la" ,
        numQuarteiroes
      });
    }
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
},

streetExist = async ( req, res ) => {
  const {id, cep} = req.query

  try{
  
    if(!cep) return res.status(400).json({ error: `Por favor informe o cep da rua` });

    const {sameCEP} = await ruaExistente(id,cep)
    return res.json({sameCEP});

  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

//verifica se ja existe uma rua ativa com com determinado cep
//No caso dessa função ser usada em uma rota de atualização dos dados da rua, é precisso irforma o id da
//rua para evitar que ela se compare consigo mesma
async function ruaExistente(id,cep){
  var sameCEP = null

  var filtro2 = {cep: cep, ativo:true}

  if(id){
    filtro2.id = {[Op.ne]: id}
  }

  const ruaMesmoCEP = await Rua.findOne({
    include: {
      association: 'municipio',
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      },
    },
    where: {
      ...filtro2
    },
  });

  ruaMesmoCEP  ? sameCEP  = true : sameCEP  = false

  const result = {sameCEP}
  return result
}

const router = express.Router();
router.use(authMiddleware);

router.get('/existe', streetExist);
router.get('/:municipio_id/municipios', getStreetByCity);
router.post('/', store);
router.delete('/:id', destroy);
router.put('/:id', update);

module.exports = app => app.use('/ruas', router);