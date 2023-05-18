const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Municipio = require('../models/Municipio');
const Zona = require('../models/Zona');
const Localidade = require('../models/Localidade');
const Quarteirao = require('../models/Quarteirao');
const Rua = require('../models/Rua');
const Lado = require('../models/Lado');
const Imovel= require(  '../models/Imovel' );
const { Op } = require("sequelize");
// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  try{
    const { id } = req.params;

    const quarteirao = await Quarteirao.findByPk( id, {
      include: [
        { 
          association: 'zona', 
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        },
        { 
          association: 'localidade', 
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        },
        { 
          association: 'lados',
          attributes: { exclude: [ 'rua_id', 'createdAt', 'updatedAt' ] },
          order: [[ 'numero', 'asc' ]],
          include: [
            {
              association: 'rua',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            },
            {
              association: 'imoveis',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              order: [[ 'numero', 'asc' ]],
            }
          ]
        }
      ],
      attributes: {
        exclude: [ 'zona_id' ]
      }
    });

    if( !quarteirao ) 
      return res.status(400).json({ error: "Quarteirão não existe" });

    var result = {
      ativo: -1,
      createdAt: "",
      id: -1,
      lados:[],
      localidade: null,
      localidade_id:-1,
      numero:-1,
      sequencia: null,
      quarteirao_id:null,
      updatedAt:"",
      zona:null
    }

    result.ativo         = quarteirao.ativo
    result.createdAt     = quarteirao.createdAt
    result.id            = quarteirao.id
    result.lados         = quarteirao.lados
    result.localidade    = quarteirao.localidade
    result.localidade_id = quarteirao.localidade_id
    result.numero        = quarteirao.numero
    result.sequencia     = quarteirao.sequencia
    result.quarteirao_id = quarteirao.quarteirao_id
    result.updatedAt     = quarteirao.updatedAt
    result.zona          = quarteirao.zona

    //Filtrar todos os lados inativos
    result.lados = result.lados.filter( l => l.ativo == true)

    //Array que ira armazena os lados com a lista de imoveis filtrados
    //Apenas serão pegos os imoveis ativos
    var lados= []
    
    result.lados.forEach(l => {
      var lado = {
        ativo: l.ativo,
        id: l.id,
        numero: l.numero,
        quarteirao_id: l.quarteirao_id,
        rua: l.rua
      }
      var imoveis = []
      l.imoveis.forEach( i => {
        if(i.ativo)
          imoveis.push(i)
      })

      imoveis.sort( (a,b) => {
        if(a.numero == b.numero){
          if( a.sequencia == null )
            return 0 - b.sequencia
          else if( b.sequencia == null )
            return a.sequencia - 0
          else
            return a.sequencia - b.sequencia
        }
        else
          return a.numero - b.numero
      } )
      
      lado.imoveis = imoveis;
      lados.push(lado)
    })
    
    result.lados = lados
    return res.json( result );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getBlockByCity = async (req, res) => {
  try{
    const { municipio_id }  = req.params;
    const whereAtivo        = req.query.ativo == '1' || req.query.ativo == '0' ? 
      { ativo: parseInt( req.query.ativo ) } : 
      {};

    const municipio = await Municipio.findOne({
      where: {
        id: municipio_id
      },
      include: {
        association: 'localidades',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: {
          where: whereAtivo,
          association: 'quarteiroes',
          include: [
            {
              association: 'localidade',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            },
            {
              association: 'zona',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            }
          ]
        }
      }
    });

    if( !municipio ) {
      return res.status(400).json({ error: "Município não existe" });
    }

    let quarteirao = [];
    municipio.localidades.forEach( localidade => {
      quarteirao = [ ...localidade.quarteiroes, ...quarteirao ];
    });

    quarteirao.sort( (a,b) => a.numero - b.numero)

    return res.json( quarteirao );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getBlockByLocality = async (req, res) => {
  try{
    const { localidade_id }  = req.params;
    const onde        = req.query.ativo == '1' || req.query.ativo == '0' ? 
      { ativo: parseInt( req.query.ativo ), localidade_id: localidade_id } : 
      { localidade_id: localidade_id };

    const quarteiroes = await Quarteirao.findAll({
      where: onde,
      include: [
        {
          association: 'localidade',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        },
        {
          association: 'zona',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        }
      ]
      
    });


    if( !quarteiroes ) {
      return res.status(400).json({ error: "Localidade informada não existe" });
    }

    let result = []
    if(quarteiroes.length > 0)
      result = [ ...quarteiroes];
    
    result.sort( (a,b) => {
      if( a.numero != b.numero || a.sequencia == null && b.sequencia == null)
        return a.numero - b.numero
      else{
        if( a.sequencia != null && b.sequencia != null)
          return  a.sequencia - b.sequencia
        else if( a.sequencia == null)
          return -1
        else {
          return 1
        }
      }
    })

    return res.json( result );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}


const createSide = async (numero, quarteirao_id, rua_id) => {
  const lado = await Lado.create({ numero, quarteirao_id, rua_id });

  return lado;
}

const findOrCreateStreet = async ( nome, municipio_id, cep ) => {
  const [ rua ] = await Rua.findOrCreate({
    where: {
      nome,
      municipio_id,
      ativo:true
    },
    defaults: { 
      nome,
      cep,
      municipio_id
    }
  });

  return rua;
}

const updateSide = async ( id, numero, quarteirao_id, rua_id ) => {
  const { isRejected } = await Lado.update(
    {
      id,
      numero,
      quarteirao_id,
      rua_id
    },
    {
      where: {
        id
      }
    }
  );

  return isRejected;
}

store = async ( req, res ) => {
  try{
    const { numero, sequencia, localidade_id, zona_id, quarteirao_id, lados } = req.body;
    const userId = req.userId;

    if(!numero) return res.status(400).json({ erro: "Informe o nuemro da quarteirão" });
    if(!localidade_id) return res.status(400).json({ erro: "Informe o id de localidade do quarteirão" });
    if(!lados) return res.status(400).json({ erro: "Informe a lados do quarteirão" });

    const allow = await allowFunction( userId, 'manter_quarteirao' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const localidade = await Localidade.findByPk( localidade_id, {
      include: {
        association: 'municipio',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      }
    });
    if( !localidade ) {
      return res.status(400).json({ error: 'Localidade não existe' });
    }
    
    const municipio_id = localidade.dataValues.municipio_id
    const localidade_nome = localidade.dataValues.nome

    //Verifica se ja existe um quarteirão na mesma localidade
    //com o mesmo número e sequencia
    const quarteiraoExiste = await Quarteirao.findOne({
      include: {
          association: 'localidade',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      },
      where: {
        numero,
        localidade_id,
        sequencia,
        ativo: 1
      }
    });
   
    if( quarteiraoExiste ) {
      let msg = ""
      if(sequencia != null )
        msg = `Já existe quarteirão com o número ${numero} e sequência ${sequencia} registrado na localidade ${localidade_nome}`
      else
        msg = `Já existe quarteirão com o número ${numero} registrado na localidade ${localidade_nome}`

      return res.status(400).json({
        alreadyExist:true,
        error: msg
      });
    }

    if( quarteirao_id ) {
      const quarteiraoFather = await Quateirao.findByPk( quarteirao_id );

      if( !quarteiraoFather ) {
        return res.status(400).json({
          fragmentFail:true, 
          error: `Não foi possível fragmentar o quarteirão pois o quarterião nº ${ quarteirao_id } não existe` 
        });
      }
    }

    if( zona_id ) {
      const zona = await Zona.findByPk( zona_id );
      if( !zona ) {
        return res.status(400).json({ error: 'Zona não existe' });
      }
    }

    const quarteirao = await Quarteirao.create({
      numero,
      sequencia,
      localidade_id,
      zona_id,
      quarteirao_id
    });

    for ( const l of lados ) {
      if( l.rua_id ) {
        await createSide( l.numero, quarteirao.id, l.rua_id );
      } else {
        const rua = await Rua.create({
          nome: l.logradouro,
          cep: l.cep,
          municipio_id: municipio_id
        });

        await createSide( l.numero, quarteirao.id, rua.id );
      }
    }
    
    const quarteiraoFind = await Quarteirao.findByPk( quarteirao.id, {
      include: [
        { association: 'zona', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
        { association: 'localidade', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
      ],
      attributes: {
        exclude: [ 'zona_id', 'localidade_id' ]
      }
    });

    return res.status(201).json( quarteiraoFind );
  } catch (error) {
    console.log(error)
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

update = async ( req, res ) => {
  try{
    const { numero, sequencia, zona_id, ativo, quarteirao_id, lados, localidade_id } = req.body;
    const { id } = req.params;

    const userId = req.userId;

    if(!numero) return res.status(400).json({ erro: "Informe o numero da quarteirão" });
    if(ativo == null) return res.status(400).json({ erro: "Informe se o quarteirão é ativo ou não" });
    if(!localidade_id) return res.status(400).json({ erro: "Informe o id de localidade do quarteirão" });
    if(!lados) return res.status(400).json({ erro: "Informe os lados do quarteirão, mesmo que seja uma lista vazia" });

    const allow = await allowFunction( userId, 'manter_quarteirao' );
    if( !allow ) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    if( quarteirao_id ) {
      const quarteiraoFather = await Quateirao.findByPk( quarteirao_id );

      if( !quarteiraoFather ) {
        return res.status(400).json({ 
          error: `Não foi possível fragmentar o quarteirão pois o quarterião nº ${ quarteirao_id } não existe` 
        });
      }
    }

    if( zona_id ) {
      const zona = await Zona.findByPk( zona_id );
      if( !zona )
        return res.status(400).json({ error: 'Zona não existe' });
    }

    //Procura localidade e o municipio do quarteirão
    const localidade = await Localidade.findByPk( localidade_id, {
      include: {
        association: 'municipio',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      }
    });
    if( !localidade ) {
      return res.status(400).json({ error: 'Localidade não existe' });
    }
    
    const municipio_id = localidade.dataValues.municipio_id
    const localidade_nome = localidade.dataValues.nome

    //Verifica se ja existe um quarteirão na mesma localidade
    //com o mesmo numero e sequencia
    const quarteiraoExiste = await quarteiraoExistente(id,localidade_id, numero, sequencia)
    if( quarteiraoExiste ) {
      let msg = ""
      if(sequencia != null )
        msg = `Já existe quarteirão com o número ${numero} e sequência ${sequencia} registrado na localidade ${localidade_nome}`
      else
        msg = `Já existe quarteirão com o número ${numero} registrado na localidade ${localidade_nome}`

      return res.status(400).json({
        alreadyExist:true,
        error: msg
      });
    }
    
    const { isRejected } = await Quarteirao.update(
      {
        numero,
        sequencia,
        zona_id,
        ativo,
        quarteirao_id: null
      },{
        where: {
          id
        }
      }
    );

    if( isRejected ){
      return res.status(400).json({ error: 'Não foi possível atualizar o quarteirão' });
    }

    lados.forEach(async l => {
      // Lado já existente
      if (l.id) {
        // Lado com rua já cadastrada
        if (l.rua_id) {
          await updateSide( l.id, l.numero, id, l.rua_id );
        } else {
          // Lado sem rua cadastrada
          const rua = await findOrCreateStreet(
            l.logradouro,
            municipio_id,
            l.cep
          );
          await updateSide(l.id, l.numero, id, rua.id);
        }
      // Lado a ser cadastrado
      } else {
        // Lado com rua já cadastrada
        if( l.rua_id ) {
          await createSide( l.numero, id, l.rua_id );
        } else {
          // Lado sem rua cadastrada
          const rua = await findOrCreateStreet(
            l.logradouro,
            municipio_id,
            l.cep
          );
          await createSide(l.numero, id, rua.id);
        }
      }
    });

    const quarteirao = await Quarteirao.findByPk( id, {
      include: [
        { association: 'zona' },
        { 
          association: 'lados',
          exclude: [ 'rua_id' ],
          include: {
            association: 'rua',
          } 
        }
      ],
      attributes: { exclude: [ 'zona_id' ] }
    });

    const quarteiraoFind = await Quarteirao.findByPk( quarteirao.id, {
      include: [
        { association: 'zona', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
      ],
      attributes: {
        exclude: [ 'zona_id' ]
      }
    });

    return res.json( quarteiraoFind );
  } catch (error) {
    console.log(error)
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

disabled = async ( req, res ) => {
  try{
    const { id } = req.params;

    const userId = req.userId;

    const allow = await allowFunction( userId, 'manter_quarteirao' );
    if( !allow )
      return res.status(403).json({ error: 'Acesso negado' });

    const quarteirao = await Quarteirao.findByPk( id );
    if( !quarteirao )
      return res.status( 400 ).json({ error: 'Quarteirão não existe!' });
    
    const { isRejected } = await Quarteirao.update(
      {
        ativo: 0,
      },{
        where: {
          id
        }
      }
    );

    if( isRejected )
      return res.status(400).json({ error: 'Não foi possível atualizar o quarteirão' });

    const quarteiraoFind = await Quarteirao.findByPk( id, {
      include: [
        { association: 'zona', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } },
      ],
      attributes: {
        exclude: [ 'zona_id' ]
      }
    });

    return res.json( quarteiraoFind );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Consulta os lados de um quarteirão.
 * 
 * @params integer id
 * @return array lados
 */
getLadosQuarteirao = async ( req, res ) => {
  try{
    const { id } = req.params;

    // Checando se o ID existe
    const quarteirao = await Quarteirao.findByPk( id );

    if( !quarteirao )
      return res.status( 400 ).json({ error: 'Quarteirão não existe' });

    const lados = await Lado.findAll({
      where: {
        quarteirao_id: id
      },
      include: {
        association: 'rua'
      }
    });

    res.json( lados );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Excluir um lado do quarteirão e atribuir seus imóveis a outro lado
 * Na visão do usuario parece uma exclusão, mas na verdade ocorre  uma inativação
 * @params integer id
 * @return array lados
 */
 excluirLadoPorId = async ( req, res ) => {
  try{
    const { excluirLadoId }       = req.params;
    const { addImovelLadoId, isUltimoLado }     = req.body;

    // Checando se o ID existe
    const excluirLado = await Lado.findByPk( excluirLadoId, {include: {association: 'quarteirao'}} );

    //Significa que o usuario além de excluir o lado,
    //deseja excluir todos os imoveis do lado
    if(addImovelLadoId == -1){
      if( !excluirLado )
        return res.status( 400 ).json( { error: 'Não é possível excluir o lado, ja que ele não existe' } );
      
      //Encontrar o id dos imoveis que não possuem nenhuma vistorias
      //e que pertencem ao lado que será inativado
      let sql = `SELECT i.id FROM imoveis as i 
              LEFT OUTER JOIN vistorias as v ON i.id = v.imovel_id
              WHERE i.lado_id = $1 AND v.imovel_id is NULL`

      const result = await Imovel.sequelize.query( sql, 
        {
          bind: [ excluirLado.id ],
          logging: console.log,
        }
      );
      let idImoveis = []
      result[ 1 ].rows.forEach( i => idImoveis.push(i.id))

      //Deleta todos os imoveis do lado que não tem vistorias
      if(idImoveis.length > 0){
        await Imovel.destroy({
          where:{ id: { [Op.in]: idImoveis} }
        })
      }

      //Desativa os imoveis restantes
      sql = `UPDATE imoveis SET ativo = false WHERE lado_id = $1`;
      await Imovel.sequelize.query( sql, 
        {
          bind: [ excluirLado.id ],
          logging: console.log,
        }
      );
    }
    //Siginifica que o imoveis do lado que será inativado serão
    //transferidos para outro lado
    else{
      const addLado     = await Lado.findByPk( addImovelLadoId );

      if( !excluirLado && !addLado )
        return res.status( 400 ).json( { error: 'Não é possível excluir o lado, um dos lados não existe' } );

      if( excluirLado.quarteirao_id !== addLado.quarteirao_id )
        return res.status( 400 ).json( { error: 'Não é permitido adicionar imóveis a um quarteirão diferente' } );

      //Tranferir todos os imoveis do lado que será inativado para
      //o outro lado
      let sql = `UPDATE imoveis SET lado_id = $1 WHERE lado_id = $2`;
      await Lado.sequelize.query( sql, 
        {
          bind: [ addLado.id, excluirLado.id ],
          logging: console.log,
        }
      );
    }

    //Inativa o lado
    let sql = `UPDATE lados SET ativo = false WHERE id = $1`;
    await Lado.sequelize.query( sql, 
      {
        bind: [ excluirLado.id ],
        logging: console.log,
      }
    );
    
    //Caso o ultimo lado for inativado
    if(isUltimoLado){
      sql = `UPDATE quarteiroes SET ativo = 0 WHERE id = $1`;
      await Quarteirao.sequelize.query( sql, {
        bind: [ excluirLado.quarteirao_id ],
        logging: console.log,
      })
    }

    return res.json( { mensage: 'Lado removido com sucesso' } );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }

}

async function quarteiraoExistente(id,localidade_id, numero, sequencia){

  var filtro = {
    numero: numero, 
    sequencia: sequencia, 
    localidade_id: localidade_id,
    ativo: 1
  }
  if(id)
    filtro.id = {[Op.ne]: id}
  
  //Verifica se ja existe um quarteirão na mesma localidade
  //com o mesmo numero e sequencia
  const quarteiraoExiste = await Quarteirao.findOne({
    include: {
        association: 'localidade',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
    },
    where: {...filtro}
  });
  if( quarteiraoExiste ) return true
  
  return false
  
}

getBlockByCityWithouZone = async (req, res) => {
  try{
    const { municipio_id }  = req.params;

    const municipio = await Municipio.findOne({
      where: {
        id: municipio_id
      },
      include: {
        association: 'localidades',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
        include: {
          where: {
            ativo: 1,
            zona_id: null
          },
          association: 'quarteiroes',
          include: [
            {
              association: 'localidade',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            },
            {
              association: 'zona',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            }
          ]
        }
      }
    });

    if( !municipio ) {
      return res.status(400).json({ error: "Município não existe" });
    }

    let quarteirao = [];
    municipio.localidades.forEach( localidade => {
      quarteirao = [ ...localidade.quarteiroes, ...quarteirao ];
    });

    quarteirao.sort((a,b) => a.numero - b.numero)

    return res.json( quarteirao );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

insertBlockInZone = async (req, res) => {
  try{
    const { id, zona_id }  = req.params;

    const quarteirao = await Quarteirao.findOne({where: {id}})

    if( !quarteirao ) {
      return res.status(400).json({ error: "Quarteirão não existe" });
    }

    const zona = await Zona.findOne({where: {id:zona_id}})

    if( !zona ) {
      return res.status(400).json({ error: "Zona não existe" });
    }

    const {isRejected} = Quarteirao.update(
      {zona_id:zona_id},
      {where: {id}}
    )

    if(isRejected)
      return res.status(400).json({ error: "Erro ao associar quarteirão à zona" });

    return res.json( quarteirao );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

removeBlockInZone = async (req, res) => {
  try{
    const { id }  = req.params;

    const quarteirao = await Quarteirao.findOne({where: {id}})

    if( !quarteirao ) {
      return res.status(400).json({ error: "Quarteirão não existe" });
    }

    const {isRejected} = Quarteirao.update(
      {zona_id:null},
      {where: {id}}
    )

    if(isRejected)
      return res.status(400).json({ error: "Erro ao retirar quarteirão da zona" });

    return res.json( quarteirao );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

const router = express.Router();
router.use( authMiddleware );

router.get( '/:id', index );
router.get(  '/lados/:id', getLadosQuarteirao  );
router.get( '/:municipio_id/municipios', getBlockByCity );
router.get( '/:localidade_id/localidades', getBlockByLocality );
router.get( '/semZona/:municipio_id/municipios', getBlockByCityWithouZone );
router.post( '/', store );
router.put( '/:id/desativar', disabled );
router.put( '/:id', update );
router.put( '/:id/zona/:zona_id', insertBlockInZone );
router.put( '/:id/removerDaZona', removeBlockInZone );
router.post( '/excluirLado/:excluirLadoId', excluirLadoPorId );

module.exports = app => app.use( '/quarteiroes', router );