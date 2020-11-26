const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Rua = require('../models/Rua');
const Localidade = require('../models/Localidade');

getStreetByLocality = async ( req, res ) => {
  const { localidade_id } = req.params;

  if( !localidade_id ) {
    return res.status(404).json({ erro: "Localidade não existe1" });
  }

  const localidade = Localidade.findByPk( localidade_id );

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

  const [ rua, created ] = await Rua.findOrCreate({
    where: {
      nome,
      localidade_id
    },
    defaults: { nome, cep, localidade_id }
  });
  
  if( created )
    return res.status(201).json( rua );  
  
  return res.json( rua );
}

update = async ( req, res ) => {
  const { localidade_id } = req.body;
  const { id } = req.params;

  let rua = await Rua.findByPk( id );
  if( !rua ) {
    return res.status(400).json({ error: "Rua não encontrada" });
  }

  if( localidade_id ) {
    const localidade = await Lado.findByPk( localidade_id );
    if( !localidade ) {
      return res.status(400).json({ error: "Localidade não encontrada" });
    }
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
}

destroy = async ( req, res ) => {
  const { id } = req.params;

  try {
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

const router = express.Router();
router.use(authMiddleware);

router.get('/:localidade_id/localidades', getStreetByLocality);
router.post('/', store);
router.delete('/:id', destroy);
router.put('/:id', update);

module.exports = app => app.use('/ruas', router);