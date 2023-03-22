const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Atividade = require('../models/Atividade');
const Ciclo = require('../models/Ciclo');
const Municipio = require('../models/Municipio');
const Localidade = require('../models/Localidade');
const Zona = require('../models/Zona');
const Quarteirao = require('../models/Quarteirao');
const Estrato = require('../models/Estrato');
const SituacaoQuarteirao = require('../models/SituacaoQuarteirao');
const Equipe = require('../models/Equipe');
const EquipeQuarteirao = require('../models/EquipeQuarteirao');
const Membro = require('../models/Membro');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario')

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
  try{
    const { ciclo_id, municipio_id } = req.params;

    const municipio = await Municipio.findByPk( municipio_id );
    if( !municipio )
      return res.status(400).json({ message: "Município não existe" });

    const atividades = await Atividade.findAll({
      where: {
        municipio_id,
        ciclo_id
      },
      include: [
        {
          association: 'metodologia',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'objetivo',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        }
      ]
    });

    return res.json( atividades );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getById = async ( req, res ) => {
  try{
    const { id } = req.params;

    const atividade = await Atividade.findByPk( id, {
      include: [
        {
          association: 'metodologia',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'objetivo',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        }
      ]
    });
    
    return res.json( atividade );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getActivitiesOfCity = async ( req, res ) => {
  try{
    const { regionalSaude_id, ciclo_id } = req.params;
    
    let current_date = new Date();
    current_date.setHours(0,0,0,0);

    const ciclo = await Ciclo.findByPk(ciclo_id)

    /* const ciclo = await Ciclo.findOne({
      where: {
        regional_saude_id: regionalSaude_id,
        [Op.and]: [
          {
            dataInicio: {
              [Op.lte]: current_date
            }
          },
          {
            dataFim: {
              [Op.gte]: current_date
            }
          }
        ]
      }
    }); */

    if( !ciclo )
      return res.status(200).json({ message: "Não foi encontrado o ciclo com id="+ciclo_id });

    const municipios = await Municipio.findAll({
      where: {
        regional_saude_id: regionalSaude_id
      },
      include: {
        association: 'atividades',
        where: {
          ciclo_id: ciclo.id
        },
        include: [
          {
            association: 'metodologia',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
          },
          {
            association: 'objetivo',
            attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
          }
        ]
      }
    });

    return res.json( municipios );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

// Esta rota não contém quarteirões e estratos associados

getAllUserActivities = async ( req, res ) => {
  const { usuario_id } = req.params;

  const usuario = await Usuario.findByPk( usuario_id, {
    include: {
      association: "atuacoes"
    }
  });
  if( !usuario )
    return res.status(400).json({ error: "Usuário não existe" });

  let regionalSaude_id = -1;
  const escopo = usuario.atuacoes[0].escopo;

  if( escopo === 1 ) { // Regional
    regionalSaude_id = usuario.atuacoes[0].local_id;
  } else if( escopo === 2 ) { // Municipal
    const regional = await Municipio.findByPk( usuario.atuacoes[0].local_id, {
      include: { association: "regional" }
    });
    
    regionalSaude_id = regional.id;
  } else { // Laboratório

  }

  const ciclo = await Ciclo.findOne({
    where: {
      regional_saude_id: regionalSaude_id,
    }
  });

  if( !ciclo ) {
    return res.json([]);
  }

  let atividades = await Atividade.findAll({
    where: {
      ciclo_id: ciclo.id
    },
    include: [
      {
        association: "equipes",
        include: [
          {
            association: "membros",
            attributes: [ "tipo_perfil" ],
            include: { 
              association: "usuario",
              attributes: [ "id", "nome", "usuario" ], 
            }
          },
        ]
      },
      {
        association: 'metodologia',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
      },
      {
        association: 'objetivo',
        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
      }
    ]
  });

  atividades = atividades.filter( a => {
    const atividade = a.dataValues;
    let isActivity = false;
    
    atividade.equipes.forEach( e => {
      e.membros.forEach( m => {
        const usuario = m.dataValues.usuario.dataValues;
        if( usuario.id === parseInt( usuario_id ) )
          isActivity = true;
      });
    });

    return isActivity;
  });

  return res.status(200).json(atividades);
}


getUserActivities = async ( req, res ) => {
  try{
    const { usuario_id } = req.params;

    const usuario = await Usuario.findByPk( usuario_id, {
      include: {
        association: "atuacoes"
      }
    });
    if( !usuario )
      return res.status(400).json({ error: "Usuário não existe" });

    let regionalSaude_id = -1;
    const escopo = usuario.atuacoes[0].escopo;

    if( escopo === 1 ) { // Regional
      regionalSaude_id = usuario.atuacoes[0].local_id;
    } else if( escopo === 2 ) { // Municipal
      const regional = await Municipio.findByPk( usuario.atuacoes[0].local_id, {
        include: { association: "regional" }
      });
      
      regionalSaude_id = regional.id;
    } else { // Laboratório

    }

    // Pegando o ciclo em aberto
    let current_date = new Date();
    current_date.setHours(0,0,0,0);

    const ciclo = await Ciclo.findOne({
      where: {
        regional_saude_id: regionalSaude_id,
        [Op.and]: [
          {
            dataInicio: {
              [Op.lt]: current_date
            }
          },
          {
            dataFim: {
              [Op.gt]: current_date
            }
          }
        ]
      }
    });

    if( !ciclo ) {
      return res.json([]);
    }

    let atividades = await Atividade.findAll({
      where: {
        ciclo_id: ciclo.id
      },
      include: [
        {
          association: "equipes",
          include: [
            {
              association: "membros",
              attributes: [ "tipo_perfil" ],
              include: { 
                association: "usuario",
                attributes: [ "id", "nome", "usuario" ], 
              }
            },
            {
              association: "quarteiroes"
            }
          ]
        },
        {
          association: "estratos",
          include: { association: "quarteiroes", attributes: [ "id", "numero" ] },
          attributes: [ 'id' ]
        },
        {
          association: 'metodologia',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'objetivo',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        }
      ]
    });

    atividades = atividades.filter( a => {
      const atividade = a.dataValues;
      let isActivity = false;
      
      atividade.equipes.forEach( e => {
        e.membros.forEach( m => {
          const usuario = m.dataValues.usuario.dataValues;
          if( usuario.id === parseInt( usuario_id ) )
            isActivity = true;
        });
      });

      return isActivity;
    });

    return res.json( atividades );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getLocations = async ( req, res ) => {
  try{
    const { abrangencia_id, municipio_id } = req.params;
    const { ativo } = req.query;
    let locais = [];

    switch ( abrangencia_id ) {
      case "1": //Localidade/bairro
        locais = await Localidade.findAll({
          where: {
            ...(ativo ? {
              municipio_id,
              ativo: ativo === 'sim' ? 1 : 0
            } : { municipio_id})
          }
        }).then( localidades => {
          return localidades.map( localidade => ({ id: localidade.id, nome: localidade.nome, tipo: "localidade" }));
        });
        break;
      case "2"://Zona
        locais = await Zona.findAll({
          where: {
            ...(ativo ? {
              municipio_id,
              ativo: ativo === 'sim' ? 1 : 0
            } : { municipio_id})
          }
        }).then( zonas => {
          return zonas.map( zona => ({ id: zona.id, nome: zona.nome, tipo: "zona" }));
        });
        break;
    
      default://Quarteirão
        locais = await Quarteirao.findAll({
          where: {
            ...(ativo ? {
              ativo: ativo === 'sim' ? 1 : 0
            } : {})
          },
          include: {
            association: "localidade",
            where: {
              municipio_id,
            }
          },
          order: [[ "numero", "asc" ]]
        }).then( quarteiroes => {
          return quarteiroes.map( quarteirao => ({ id: quarteirao.id, nome: quarteirao.numero, tipo: "quarteirao" }));
        });
        break;
    }

    return res.json( locais );
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
      abrangencia, 
      objetivoAtividade, 
      flTodosImoveis,
      responsabilidade,
      ciclo_id,
      municipio_id,
      metodologia_id, 
      objetivo_id
    } = req.body;

    const allow = await allowFunction( req.userId, 'manter_atividade', 'manter_atividade_municipio' );
    if( !allow )
      return res.status(403).json({ error: 'Acesso negado' });

    const ciclo = await Ciclo.findByPk( ciclo_id );
    if( !ciclo )
      return res.status(400).json({ error: "Ciclo não existe" });

    let current_date = new Date();
    current_date.setHours(0,0,0,0);
    if( current_date > ciclo.dataFim )
      return res.status(400).json({ error: "Não é permitido cadastrar atividade em ciclos finalizados" });

    const atividade = await Atividade.create({
      abrangencia, 
      objetivoAtividade, 
      flTodosImoveis,
      situacao: 1,
      responsabilidade,
      ciclo_id,
      municipio_id,
      metodologia_id, 
      objetivo_id
    });

    return res.status(201).json( atividade );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

plain = async ( req, res ) => {
  try{
    const { id } = req.params;
    const { equipes, abrangencia_id } = req.body;

    const allow = await allowFunction( req.userId, "manter_atividade_municipio" );
    if( !allow )
      return res.status(403).json({ error: 'Acesso negado' });

    const atividade = await Atividade.findByPk( id );
    if( !atividade )
      return res.status(400).json({ message: "Atividade não existe" });

    equipes.forEach( async eq => {
      //estrato da equipe sempre é uma lista com um unico elemento
      const estrato_equipe = eq.estrato[0]

      const est = await Estrato.create({
        atividade_id: id
      });

      switch ( abrangencia_id ) {
        case 1: // Localidade
          estrato_equipe.locais.forEach( async l => {
            await Quarteirao.findAll({
              include: {
                association: 'localidade',
                where: {
                  id: l.id
                }
              }
            }).then( quarteiroes => {
              quarteiroes.forEach( async q => {
                // Vinculando os quarteirões aos estratos
                await SituacaoQuarteirao.create({
                  situacaoQuarteiraoId: 1,
                  estrato_id: est.id,
                  quarteirao_id: q.id
                });
              });
            });
          });
        
          break;
        case 2: // Zona
          estrato_equipe.locais.forEach( async l => {
            await Quarteirao.findAll({
              include: {
                association: 'zona',
                where: {
                  id: l.id
                }
              }
            }).then( quarteiroes => {
              quarteiroes.forEach( async q => {
                await SituacaoQuarteirao.create({
                  situacaoQuarteiraoId: 1,
                  estrato_id: est.id,
                  quarteirao_id: q.id
                });
              });
            });
          });
          break;
      
        default: // Quarteirão
          estrato_equipe.locais.forEach( async l => {
            await SituacaoQuarteirao.create({
              situacaoQuarteiraoId: 1,
              estrato_id: est.id,
              quarteirao_id: l.id
            });
          });
          break;
      }
    });

    equipes.forEach( async equipe => {

      //estrato da equipe sempre é uma lista com um unico elemento
      const estrato_equipe = equipe.estrato[0]

      const e = await Equipe.create({
        atividade_id: id
      });
    
      // Vinculando os quarteirões de responsabilidade da equipe
      estrato_equipe.locais.forEach( async l => {
        switch ( abrangencia_id ) {
          case 1:// Localidade
            await Quarteirao.findAll({
              include: {
                association: 'localidade',
                where: {
                  id: l.id
                }
              }
            }).then( quarteiroes => {
              quarteiroes.forEach( async q => {
                await EquipeQuarteirao.create({
                  equipe_id: e.id,
                  quarteirao_id: q.id
                });
              });
            });
            break;
    
          case 2:// Zona
            await Quarteirao.findAll({
              include: {
                association: 'zona',
                where: {
                  id: l.id
                }
              }
            }).then( quarteiroes => {
              quarteiroes.forEach( async q => {
                await EquipeQuarteirao.create({
                  equipe_id: e.id,
                  quarteirao_id: q.id
                });
              });
            });
            break;
        
          default:// Quarteirão
            await EquipeQuarteirao.create({
              equipe_id: e.id,
              quarteirao_id: l.id
            });
            break;
        }
      });

      equipe.membros.forEach( async membro => {
        let tipoPerfil_id = 4;// Agente
        if( membro.id === equipe.supervisor.id ) {
          tipoPerfil_id = 3;
        }

        await Membro.create({
          tipoPerfil: tipoPerfil_id,
          equipe_id: e.id,
          usuario_id: membro.id
        });
      });
    });

    atividade.situacao = 2;
    await atividade.save();

    return res.json( atividade );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

getResponsibilityActivities = async ( req, res ) => {
  try{
    const { user_id, cycle_id } = req.params;

    const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
    if( !allow )
      return res.status( 403 ).json( { error: 'Acesso negado' } );

    if( parseInt( user_id ) !== req.userId )
      return res.status( 403 ).json( { error: 'Acesso negado' } );

    const supervisor = await Usuario.findByPk( user_id, {
      include: {
        association: "atuacoes"
      }
    } );
    if( !supervisor )
      return res.status( 400 ).json( { error: "Usuário não existe" } );

    if( supervisor.atuacoes[ 0 ].escopo !== 2 )
      return res.json( [] );

    const activities = await Atividade.findAll( {
      where: {
        ciclo_id: cycle_id,
        municipio_id: supervisor.atuacoes[ 0 ].local_id
      },
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [
        {
          association: 'metodologia',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'objetivo',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        },
        {
          association: 'equipes',
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
          include: [
            {
              association: 'membros',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              include: {
                association: 'usuario',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] } 
              }
            },
            {
              association: 'quarteiroes',
              include: [
                {
                  association: 'lados',
                  attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                  include: {
                    association: 'rua',
                    attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                  },
                },
                {
                  association: 'localidade',
                  attributes: { exclude: [ 
                    'createdAt', 'updatedAt','ativo', 
                    'municipio_id', 'categoria_id'
                  ] },
                },
                {
                  association: 'zona',
                  attributes: { exclude: [ 'createdAt', 'updatedAt', 'ativo', 'municipio_id' ] },
                }
              ]
            }
          ]
        }
      ]
    } );

    const [ m, d, Y ]           = new Date().toLocaleDateString( 'en-US' ).split( '/' );
    const current_date          = `${ Y }-${ m }-${ d }`;

    const responsabilityActivities = [];

    //Filtrando as equipes não lideradas pelo supervisor com o id informado na requisição
    for ( var activity of activities) {
      let act = activity;

      let teams = activity.equipes.filter( team => {
        let fl_team = false;

        team.membros.forEach( member => {
          if( member.usuario_id === supervisor.id && member.tipoPerfil === 3 )
            fl_team = true;
        } );

        return fl_team;
      } );

      act.dataValues.equipes = teams;
   
      if( teams.length > 0 ){

        for(var i = 0; i < teams.length; i++) {

          const equipe_id = teams[i].dataValues.id

          //Para cada membro de cada equipe, será verificado se o membro possui uma trabalho diario
          //agendado para hoje
          for(var j = 0; j < teams[i].dataValues.membros.length; j++) {
          
            const usuario_id = teams[i].dataValues.membros[j].dataValues.usuario_id
            
            var trabalhoDiarioHoje = await TrabalhoDiario.findOne( {
              where: {
                equipe_id,
                usuario_id,
                data: current_date
              },
              attributes: { exclude: [ 
                'createdAt', 
                'updatedAt',
                'supervisor_id',
                'usuario_id',
                'equipe_id',
               ] }
            } )

            if(!trabalhoDiarioHoje)
              trabalhoDiarioHoje = {}

            act.dataValues.equipes[i].dataValues.membros[j].dataValues.trabalhoDiarioHoje = trabalhoDiarioHoje
          }
          
          let localidadesEquipe = [] // array contem todas as localidades que a equipe está trabalhando
          let zonasEquipe = [] // array contem todas as zonas em que a equipe está trabalhando

          //Aqui será populado os arrays localidadesEquipe e zonasEquipe
          for(var k = 0; k < teams[i].dataValues.quarteiroes.length; k++) {

            const localidade = teams[i].dataValues.quarteiroes[k].dataValues.localidade
            const zona = teams[i].dataValues.quarteiroes[k].dataValues.zona

            if( localidadesEquipe.length == 0)
              localidadesEquipe.push(localidade)
            else{
              const isLocalidadeRepetida = localidadesEquipe.find( loc => loc.id == localidade.id)
              if(!isLocalidadeRepetida)
                localidadesEquipe.push(localidade)
            }

            if( zonasEquipe.length == 0 && zona != null)
              zonasEquipe.push(zona)
            else if(zona != null){
              const isZonaRepetida = zonasEquipe.find( z => ( z.id == zona.id ))
              if(!isZonaRepetida)
                zonasEquipe.push(zona)
            }
          }

          act.dataValues.equipes[i].dataValues.localidadesEquipe = localidadesEquipe
          act.dataValues.equipes[i].dataValues.zonasEquipe = zonasEquipe

        }
        responsabilityActivities.push( act );
      }
    };

    return res.json( responsabilityActivities );
  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

//Finalizar uma atividade cujo o flTodosImoveis == false
finish = async ( req, res ) => {
  try{
    const { id } = req.params;

    const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
    if( !allow )
      return res.status( 403 ).json( { error: 'Acesso negado' } );
    
    const atividade = await Atividade.findByPk( id );
    if( !atividade )
      return res.status(400).json({ message: "Atividade não existe" });

    if(atividade.flTodosImoveis)
      return res.status(400).json({ message: "Essa rota não permite encerrar uma atividade que deve trabalhar com todos os imóveis" });
    
    const isTrabalhoPendente = await isTrabalhoDiarioPendenteHoje(id)
    if( isTrabalhoPendente ){
      return res.status(400).json({ 
        finishDenied:true,
        message: "Não foi possivel encerrar a atividade, existe ao menos um trabalho diario que deve ser finalizado hoje"  
      });
    }

    const { isRejected } = await Atividade.update(
      {
        situacao: 3,
      },{
        where: {
          id
        }
      }
    );

    if( isRejected ){
      return res.status(400).json({ 
        message: "Não é possivel encerrar a atividade, houve problema ao atualizar a situação da atividade pra encerrado"  
      });
    }

    return res.json({ message: "Atividade encerrada com sucesso" })


  } catch (error) {
    return res.status( 400 ).send( { 
      status: 'unexpected error',
      mensage: 'Algum problema inesperado ocorreu nesta rota da api',
    } );
  }
}

/**
 * Função recebe o id de uma atividade e verifica se existe algum trabalho diario na data atual
 * que não foi finalizado. Retorna true caso exista pelo menos 1 trabalho pendente e false caso contrario
 * 
 * */
 async function isTrabalhoDiarioPendenteHoje(atividade_id ) {

  let data_atual = new Date();
  data_atual.setHours(0,0,0,0)

  const trabalhosDiariosPendentesHoje = await TrabalhoDiario.sequelize.query(
    'SELECT ' +
      'td.id as "id", ' +
      'td.data as "data", ' +
      'td.hora_fim as "hora_fim", ' +
      'td.equipe_id as "equipe_id", ' +
      'td.supervisor_id as "supervisor_id", ' +
      'td.usuario_id as "agente_id" ' +
    'FROM ' +
      'trabalhos_diarios as td ' +
      'JOIN equipes as e ON( e.id = td.equipe_id ) ' +
      'JOIN atividades as a ON( a.id = e.atividade_id ) ' +
    'WHERE ' +
      'a.id = $1 ' +
      'AND td.data = $2 '+
      'AND td.hora_fim IS NULL '+ 
    'ORDER BY '+
      'td.data', 
    {
      bind: [ atividade_id, data_atual ],
      logging: console.log,
    }
  );

  /* const trabalhos = trabalhosDiariosPendentesHoje[ 1 ].rows.map( i => ({
    id: i.id,
    data: i.data,
    hora_fim: i.hora_fim,
    equipe_id: i.equipe_id,
    supervisor_id: i.supervisor_id,
    agente_id: i.agente_id
  }));
 */

  if(trabalhosDiariosPendentesHoje[ 1 ].rows.length == 0) return false

  return true

}

/**
 * Função recebe id de um quarteirão e retorna a quantidade de imoveis
 * do quarteirão que estão ativos e que não são do tipo Ponto Estrategicos
**/
async function quantidadeImoveisValidosQuarteirao( quarteirao_id){
  let sql_quarteiroes = 
    'SELECT ' +
      'q.id, ' +
      'count( l.* ) ' +
    'FROM ' +
      'quarteiroes as q ' +
      'JOIN lados as l ON (l.quarteirao_id = q.id) ' +
      'JOIN imoveis as i ON (i.lado_id = l.id) ' +
    'WHERE ' +
      'q.id = ' + quarteirao_id +
      ' AND i.tipo_imovel != 4' +
      ' AND i.ativo = TRUE' +
    ' GROUP BY ' +
      'q.id';
  
  const quarteiroes = await Quarteirao.sequelize.query( sql_quarteiroes );
  const totalImoveisQuarteirao    = quarteiroes[ 1 ].rows[0].count;
  return totalImoveisQuarteirao;
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', getById);
router.get('/:ciclo_id/ciclos/:municipio_id/municipios', index);
router.get('/:regionalSaude_id/regionaisSaude/:ciclo_id/ciclo', getActivitiesOfCity);
router.get('/abertas/:usuario_id/usuarios', getUserActivities);
router.get('/todas/:usuario_id/usuarios', getAllUserActivities);
router.get('/locais/:abrangencia_id/abrangencia/:municipio_id/municipios', getLocations);
router.post('/', store);
router.post('/planejar/:id', plain);
router.get('/supervisor/:user_id/responsavel/:cycle_id/ciclos', getResponsibilityActivities);
router.put('/encerrar/:id', finish);

module.exports = app => app.use('/atividades', router);