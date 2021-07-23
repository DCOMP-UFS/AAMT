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

// UTILITY
const allowFunction = require('../util/allowFunction');

index = async ( req, res ) => {
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
}

getById = async ( req, res ) => {
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
}

getActivitiesOfCity = async ( req, res ) => {
  const { regionalSaude_id } = req.params;

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

  if( !ciclo )
    return res.status(200).json({ message: "Não há nenhum ciclo em aberto cadastrado" });

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
}

getLocations = async ( req, res ) => {
  const { abrangencia_id, municipio_id } = req.params;
  let locais = [];

  switch ( abrangencia_id ) {
    case "1": //Localidade/bairro
      locais = await Localidade.findAll({
        where: {
          municipio_id
        }
      }).then( localidades => {
        return localidades.map( localidade => ({ id: localidade.id, nome: localidade.nome, tipo: "localidade" }));
      });
      break;
    case "2"://Zona
      locais = await Zona.findAll({
        where: {
          municipio_id
        }
      }).then( zonas => {
        return zonas.map( zona => ({ id: zona.id, nome: zona.nome, tipo: "zona" }));
      });
      break;
  
    default://Quarteirão
      locais = await Quarteirao.findAll({
        include: {
          association: "localidade",
          where: {
            municipio_id
          }
        }
      }).then( quarteiroes => {
        return quarteiroes.map( quarteirao => ({ id: quarteirao.id, nome: quarteirao.numero, tipo: "quarteirao" }));
      });
      break;
  }

  return res.json( locais );
}

store = async ( req, res ) => {
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

  const allow = await allowFunction( req.userId, 'manter_atividade' );
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
}

update = async ( req, res ) => {
  
}

destroy = async ( req, res ) => {
}

plain = async ( req, res ) => {
  const { id } = req.params;
  const { estratos, equipes, abrangencia_id } = req.body;

  const allow = await allowFunction( req.userId, 'manter_atividade' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const atividade = await Atividade.findByPk( id );
  if( !atividade )
    return res.status(400).json({ message: "Atividade não existe" });

  estratos.forEach( async e => {
    const est = await Estrato.create({
      atividade_id: id
    });

    switch ( abrangencia_id ) {
      case 1: // Localidade
        e.locais.forEach( async l => {
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
        e.locais.forEach( async l => {
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
        e.locais.forEach( async l => {
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
    const e = await Equipe.create({
      atividade_id: id
    });
  
    // Vinculando os quarteirões de responsabilidade da equipe
    equipe.locais.forEach( async l => {
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
}

getResponsibilityActivities = async ( req, res ) => {
  const { user_id, cycle_id } = req.params;

  const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  if( parseInt( user_id ) !== req.userId )
    return res.status(403).json({ error: 'Acesso negado' });

  const supervisor = await Usuario.findByPk( user_id, {
    include: {
      association: "atuacoes"
    }
  });
  if( !supervisor )
    return res.status(400).json({ error: "Usuário não existe" });

  if( supervisor.atuacoes[ 0 ].escopo !== 2 )
    return res.json([]);

  const activities = await Atividade.findAll({
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
            include: {
              association: 'lados',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              include: {
                association: 'rua',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              }
            }
          }
        ]
      }
    ]
  });

  const responsabilityActivities = [];

  activities.forEach(( activity ) => {
    let act = activity;

    const teams = activity.equipes.filter( (team, index) => {
      let fl_team = false;
      
      team.membros.forEach( member => {
        if( member.usuario_id === supervisor.id && member.tipoPerfil === 3 )
          fl_team = true;
      });

      return fl_team;
    });

    act.dataValues.equipes = teams;

    if( teams.length > 0 )
      responsabilityActivities.push( act );
  });

  return res.json( responsabilityActivities );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:id', getById);
router.get('/:ciclo_id/ciclos/:municipio_id/municipios', index);
router.get('/:regionalSaude_id/regionaisSaude', getActivitiesOfCity);
router.get('/abertas/:usuario_id/usuarios', getUserActivities);
router.get('/todas/:usuario_id/usuarios', getAllUserActivities);
router.get('/locais/:abrangencia_id/abrangencia/:municipio_id/municipios', getLocations);
router.put('/:id', update);
router.post('/', store);
router.post('/planejar/:id', plain);
router.delete('/:id', destroy);
router.get('/supervisor/:user_id/responsavel/:cycle_id/ciclos', getResponsibilityActivities);

module.exports = app => app.use('/atividades', router);