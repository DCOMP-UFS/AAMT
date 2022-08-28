const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Rua = require('../models/Rua');
const Localidade = require('../models/Localidade');
const { Op } = require("sequelize");

getStreetByLocality = async ( req, res ) => {
  const { localidade_id } = req.params;

  if( !localidade_id ) {
    return res.status(404).json({ erro: "Localidade não existe1" });
  }

  const localidade = await Localidade.findByPk( localidade_id );

  if( !localidade ) {
    return res.status(400).json({ error: "Localidade não existe" });
  }

  const ruas = await Rua.findAll({
    where: {
      localidade_id
    },
    include: {
      association: 'localidade',
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    },
    attributes: {
      exclude: [ 'localidade_id' ]
    },
    order: [[ 'nome', 'asc' ]]
  });

  return res.json( ruas );
}

store = async ( req, res ) => {
  const { nome, cep, localidade_id } = req.body;

  try{

    if(!nome) return res.status(400).json({ erro: "Informe o nome da rua" });
    if(!cep) return res.status(400).json({ erro: "Informe o cep da rua" });
    if(!localidade_id) return res.status(400).json({ erro: "Informe a localidade da rua" });
    
    const localidade = await Localidade.findByPk( localidade_id );
    if( !localidade ) {
      return res.status(400).json({ error: "Localidade com id="+localidade_id+" não existe" });
    }
    const {sameName, sameCEP} = await ruaExistente(null,nome,cep,localidade_id)
    if(sameName || sameCEP){
      return res.status(400).json({
        error:"Não foi possivel criar a rua, a regra de nome único na localidade e/ou cep único não foi respeitada",
        sameName,
        sameCEP,
      });
    }
  
    const rua = await Rua.create({
      nome,
      cep,
      localidade_id
    })
   
    const result = await Rua.findByPk(rua.id, {
      include: {
        association: 'localidade',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      }
    });
  
    return res.status(201).json( result );

  } catch(e) {
    return res.status(400).json({ error: 'Não foi possivel criar nova rua, falha no banco'});
  }
}

update = async ( req, res ) => {
  const { nome, cep, localidade_id } = req.body;
  const { id } = req.params;

  try{

    if(!id) return res.status(400).json({ erro: "Informe o id da rua" });
    if(!nome) return res.status(400).json({ erro: "Informe o nome da rua" });
    if(!cep) return res.status(400).json({ erro: "Informe o cep da rua" });
    if(!localidade_id) return res.status(400).json({ erro: "Informe a localidade da rua" });

    let rua = await Rua.findByPk( id, {
      include: {
        association: 'localidade',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      }
    });

    if( !rua ) {
      return res.status(400).json({ error: "Rua não encontrada" });
    }

    if( localidade_id ) {
      const localidade = await Localidade.findByPk( localidade_id );
      if( !localidade ) {
        return res.status(400).json({ error: "Localidade não encontrada" });
      }
    }
  
    const {sameName, sameCEP} = await ruaExistente(id,nome,cep,localidade_id)

    if(sameName || sameCEP){
      return res.status(400).json({
        error:"Não foi possivel atualizar a rua, a regra de nome e/ou de cep único não foi respeitada",
        sameName,
        sameCEP,
      });
    }

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
        association: 'localidade',
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      },
      attributes: {
        exclude: [ 'localidade_id' ]
      }
    });

    return res.json( rua );

  }catch(e){
    return res.status(400).json({ error: 'Não foi possível atualizar a rua, falha no banco' });
  }
}

destroy = async ( req, res ) => {
  const { id } = req.params;

  try {

    if(!id) return res.status(400).json({ erro: "Informe o id da rua" });
   
    const deleted = await Rua.destroy({
      where: {
        id
      }
    });
  
    if( deleted )
      return res.json({ message: "Rua deletada" });
  
    return res.status(404).json({ message: "Rua não encontrado" });
  }
  catch (e) {
    return res.status(409).json({ error: "Verifique se existem quarteirões associados a essa rua antes de exclui-la" });
  }
}

async function ruaExistente(id,nome,cep,localidade_id){
  var sameName = null
  var sameCEP = null

  var filtro1 = {nome: nome}
  var filtro2 = {cep: cep}

  if(id){
    filtro1.id = {[Op.ne]: id}
    filtro2.id = {[Op.ne]: id}
  }

  const ruaMesmoNome = await Rua.findOne({
    include: {
      association: 'localidade',
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      },
      where: {
        id: localidade_id,
      },
    },
    where: {
      ...filtro1
    },
  });

  const ruaMesmoCEP = await Rua.findOne({
    include: {
      association: 'localidade',
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      },
    },
    where: {
      ...filtro2
    },
  });

  ruaMesmoNome ? sameName = true : sameName = false
  ruaMesmoCEP  ? sameCEP  = true : sameCEP  = false

  const result = {sameName,sameCEP}
  return result
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:localidade_id/localidades', getStreetByLocality);
router.post('/', store);
router.delete('/:id', destroy);
router.put('/:id', update);

module.exports = app => app.use('/ruas', router);