const authMiddleware  = require('../middlewares/auth');
const express         = require('express');
const { Op }          = require('sequelize');
const Usuario         = require('../models/Usuario');
const TrabalhoDiario  = require('../models/TrabalhoDiario');
const Rota            = require('../models/Rota');
const Lado            = require('../models/Lado');
const Quarteirao      = require('../models/Quarteirao');
const Vistoria        = require('../models/Vistoria');
const Deposito        = require('../models/Deposito');
const Tratamento      = require('../models/Tratamento');
const Amostra         = require('../models/Amostra');
const Imovel          = require('../models/Imovel');
const Equipe          = require('../models/Equipe');
const Atividade       = require('../models/Atividade');

// UTILITY
const allowFunction = require('../util/allowFunction');

getRoute = async ( req, res ) => {
  const { usuario_id, data } = req.params;
  const userId = req.userId;

  // Iniciando validação
  const userRequest = await Usuario.findByPk( userId, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_agente = false;
  userRequest.atuacoes.forEach( at => {
    if( at.tipoPerfil === 4 )
      fl_agente = true;
  });

  if( fl_agente && parseInt( usuario_id ) !== userRequest.id )
    return res.status(400).json({ error: "Acesso negado" });

  const usuario = await Usuario.findByPk( usuario_id );

  if( !usuario )
    return res.status(400).json({ error: "Usuário não existe" });
  // Fim validação

  const td = await TrabalhoDiario.findOne({
    where: {
      usuario_id: usuario.id,
      data: `${ data }`
    },

    include: {
      association: 'equipe',
      include: { 
        association: 'atividade',
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
    }
  });

  if( !td )
    return res.json({});


  let rota = await Quarteirao.findAll({
    include: {
      association: 'lados',
      include: [
        {
          association: 'imoveis'
        },
        {
          association: 'rota',
          where: {
            id: td.id
          }
        },
        { association: 'rua' }
      ]
    }
  });

  rota = rota.filter( r => r.lados.length > 0);

  let equipe = {
    id: td.equipe.id,
    atividade_id: td.equipe.atividade_id
  };

  let trabalhoDiario = {
    id: td.id,
    data: td.data,
    horaInicio: td.horaInicio,
    horaFim: td.horaFim,
    usuario_id: td.usuario_id,
    supervisor_id: td.supervisor_id,
    equipe_id: td.supervisor_id,
    equipe: equipe,
    atividade: td.equipe.atividade
  }

  return res.json({
    trabalhoDiario,
    rota
  });
}

planejarRota = async ( req, res ) => {
  const { supervisor_id, usuario_id, equipe_id, lados } = req.body;
  const userId = req.userId;

  // Iniciando validação
  const usuario_req = await Usuario.findByPk( userId );

  const allow = await allowFunction( usuario_req.id, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const supervisor = await Usuario.findByPk( supervisor_id, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_supervisor = false;
  supervisor.atuacoes.forEach( at => {
    if( at.tipoPerfil === 3 )
      fl_supervisor = true;
  });

  if( !fl_supervisor )
    return res.status(400).json({ error: "Usuário informado não é um supervisor!" });

  const usuario = await Usuario.findByPk( usuario_id );
  if( !usuario )
    return res.status(400).json({ error: "Usuário não existe" });

  const equipe = await Equipe.findByPk( equipe_id, {
    include: {
      association: 'membros',
      where: {
        usuario_id
      }
    }
  });
  if( !equipe )
    return res.status(400).json({ error: "Equipe não existe ou usuário não pertence a esta equipe" });
  // Fim validação

  // en-GB: d/m/Y
  const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
  const current_date = `${ Y }-${ m }-${ d }`;

  const td = await TrabalhoDiario.findOne({
    where: {
      [Op.and]: [
        {
          data: {
            [Op.eq]: current_date
          }
        },
        { usuario_id },
        { equipe_id }
      ]
    }
  });

  let trabalho_diario = {};
  if( !td ) {
    trabalho_diario = await TrabalhoDiario.create({
      data: current_date,
      supervisor_id,
      usuario_id,
      equipe_id
    });
  } else {
    trabalho_diario = td;

    await Rota.destroy({
      where: {
        trabalho_diario_id: trabalho_diario.id
      }
    });
  }

  const rota = lados.map( lado_id => ({
    lado_id,
    trabalho_diario_id: trabalho_diario.id
  }));

  Rota.bulkCreate( rota );

  return res.json( trabalho_diario );
}

getPlain = async ( req, res ) => {
  const { usuario_id } = req.params;
  const userId = req.userId;
  
  const supervisor = await Usuario.findByPk( userId );

  const allow = await allowFunction( supervisor.id, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const usuario = await Usuario.findByPk( usuario_id, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_supervisor = false;
  usuario.atuacoes.forEach( at => {
    if( at.tipoPerfil === 3 )
      fl_supervisor = true;
  });

  if( !fl_supervisor )
    return res.status(400).json({ error: "Usuário informado não é um supervisor!" });

  const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
  const current_date = `${Y}-${m}-${d}`;
  const planejamento = await TrabalhoDiario.findAll({
    where: {
      [Op.and]: [
        {
          data: {
            [Op.eq]: current_date
          }
        },
        { supervisor_id: usuario.id }
      ]
    },
    include: [
      {
        association: 'equipe',
        include: [ 
          { association: 'membros', include: { association: 'usuario' } },
          { 
            association: 'quarteiroes',
            include: { 
              association: 'lados', 
              include: { association: 'rua' }
            } 
          }
        ]
      },
      {
        model: Lado,
        as: 'rota',
        attributes: [ 'id', 'numero', 'rua_id', 'quarteirao_id' ],
        include: { association: 'rua' }
      }
    ],
  });

  // formatando o array planejamento por equipe para ser compatível com a tela de planejamento.
  plainTeam = [];
  planejamento.forEach( p => {
    let index = plainTeam.findIndex( pt => p.equipe_id === pt.idEquipe );

    if( index !== -1 ) {//Existe
      p.rota.forEach( r => {
        plainTeam[ index ].quarteiroes.forEach(( q, qIndex ) => {
          let found = false;
          q.lados.forEach(( l, lIndex ) => {
            if( r.id === l.id ) {
              plainTeam[ index ].quarteiroes[ qIndex ].lados[ lIndex ].dataValues.rotaIndex = plainTeam.length;
              found = true;
              return;
            }
          });

          if( found )
            return;
        });
      });

      plainTeam[ index ].rotas.push({
        usuario_id: p.usuario_id,
        lados: p.rota
      });
    } else {//Nova equipe
      let plain = {
        idEquipe: p.equipe_id,
        membros: p.equipe.membros,
        quarteiroes: p.equipe.quarteiroes
      }

      p.rota.forEach( r => {
        plain.quarteiroes.forEach(( q, qIndex ) => {
          let found = false;
          q.lados.forEach(( l, lIndex ) => {
            if( r.id === l.id ) {
              plain.quarteiroes[ qIndex ].lados[ lIndex ].dataValues.rotaIndex = 0;
              found = true;
              return;
            }
          });

          if( found )
            return;
        });
      });

      plain.rotas = [{
        usuario_id: p.usuario_id,
        lados: p.rota
      }];

      plainTeam.push( plain );
    }
  });

  return res.json( plainTeam );
}

startRoute = async ( req, res ) => {
  const { trabalhoDiario_id } = req.body;
  const userId = req.userId;

  // Validando
  const td = await TrabalhoDiario.findByPk( trabalhoDiario_id );
  if( !td ) 
    res.json({
      status: 'error',
      mensage: 'Impossível iniciar a rota, trabalho diário informado não existe!'
    });

  const userRequest = await Usuario.findByPk( userId, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_agente = false;
  userRequest.atuacoes.forEach( at => {
    if( at.tipoPerfil === 4 )
      fl_agente = true;
  });

  if( fl_agente && td.usuario_id !== userRequest.id )
    return res.json({ 
      status: 'error',
      mensage: 'Acesso negado'
    });
  // Validando

  // Iniciando a rota
  if( td.horaInicio === null ) {
    const { horaInicio } = req.body;
    const [ result ] = await TrabalhoDiario.update(
      {
        horaInicio
      },
      {
        where: {
          id: trabalhoDiario_id
        }
      }
    );  
  
    if( !result ) 
      return res.json({ 
        status: 'error',
        mensage: 'Falha ao tentar iniciar a rota, por favor, aguarde e tente novamente.'
      });
  }
  // Iniciando a rota

  let rota = await Quarteirao.findAll({
    include: {
      association: 'lados',
      include: [
        {
          association: 'imoveis'
        },
        {
          association: 'rota',
          where: {
            id: td.id
          }
        },
        { association: 'rua' }
      ]
    }
  });

  rota = rota.filter( r => r.lados.length > 0);

  return res.json( rota );
}

endRoute = async ( req, res ) => {
  const { trabalhoDiario_id, horaFim, vistorias } = req.body;
  const userId = req.userId;

  // Validando
  const td = await TrabalhoDiario.findByPk( trabalhoDiario_id );
  if( !td ) 
    res.json({
      status: 'error',
      mensage: 'Impossível finalizar a rota, trabalho diário informado não existe!'
    });

  const userRequest = await Usuario.findByPk( userId, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_agente = false;
  userRequest.atuacoes.forEach( at => {
    if( at.tipoPerfil === 4 )
      fl_agente = true;
  });

  if( fl_agente && td.usuario_id !== userRequest.id )
    return res.json({ 
      status: 'error',
      mensage: 'Acesso negado'
    });
  // Validando

  // Apagando dados desatualizados
  await Vistoria.destroy({
    where: {
      trabalho_diario_id: trabalhoDiario_id
    }
  });
  // Apagando dados desatualizados

  // Salvando as vistorias  
  let vists = [];
  vistorias.forEach(async v => {
    let vistoria = { ...v }
    await Vistoria.create({
      situacaoVistoria: v.situacaoVistoria,
      horaEntrada: v.horaEntrada,
      pendencia: v.pendencia,
      sequencia: v.sequencia,
      justificativa: v.justificativa,
      imovel_id: v.imovel.id,
      trabalho_diario_id: v.trabalhoDiario_id
    })
    .then(function( result ) {
      vistoria.id = result.dataValues.id;
    });

    await Imovel.update({
      numero: vistoria.imovel.numero,
      sequencia: vistoria.imovel.sequencia,
      responsavel: vistoria.imovel.responsavel,
      complemento: vistoria.imovel.complemento,
      tipoImovel: vistoria.imovel.tipoImovel
    }, { where: { id: vistoria.imovel.id } } );

    vistoria.recipientes.forEach(async r => {
      let recipiente = { ...r };
      await Deposito.create({
        fl_comFoco: recipiente.fl_comFoco,
        fl_tratado: recipiente.fl_tratado,
        fl_eliminado: recipiente.fl_eliminado,
        tipoRecipiente: recipiente.tipoRecipiente,
        sequencia: recipiente.sequencia,
        vistoria_id: vistoria.id
      })
      .then(function( result ) {
        recipiente.id = result.dataValues.id;
      });

      if( recipiente.fl_tratado ) {
        await Tratamento.create({
          quantidade: recipiente.tratamento.quantidade,
          tecnica: recipiente.tratamento.tecnica,
          deposito_id: recipiente.id,
          inseticida_id: 2
        });
      }

      if( recipiente.fl_comFoco ) {
        recipiente.amostras.forEach(async a => {
          await Amostra.create({
            situacaoAmostra: a.situacao,
            sequencia: a.sequencia,
            deposito_id: recipiente.id,
            laboratorio_id: null
          });
        });
      }
    });
  });
  // Salvando as vistorias

  // Finalizar rota
  const [ result ] = await TrabalhoDiario.update(
    {
      horaFim
    },
    {
      where: {
        id: trabalhoDiario_id
      }
    }
  );  

  if( !result ) 
    return res.json({ 
      status: 'error',
      mensage: 'Falha ao tentar finalizara rota, por favor, aguarde e tente novamente.'
    });
  // Finalizar rota

  // Salvando Vistorias
  // Salvando Vistorias

  return res.json({ 
    status: 'success',
    mensage: 'Vistorias registradas com sucesso!'
  })
}

isStarted = async ( req, res ) => {
  const { trabalhoDiario_id } = req.params;
  const userId = req.userId;

  // Validando
  const td = await TrabalhoDiario.findByPk( trabalhoDiario_id );
  if( !td ) 
    res.json({
      status: 'error',
      mensage: 'Trabalho diário informado não existe!'
    });

  const userRequest = await Usuario.findByPk( userId, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_agente = false;
  userRequest.atuacoes.forEach( at => {
    if( at.tipoPerfil === 4 )
      fl_agente = true;
  });

  if( fl_agente && td.usuario_id !== userRequest.id )
    return res.json({ 
      status: 'error',
      mensage: 'Acesso negado'
    });
  // Validando

  if( td.horaInicio === null )
    return res.json( false );

  return res.json( true );
}

/**
 * Esta rota consulta as rotas já planejadas de uma equipe e retorna
 * um array de quarteirões com seus lados e a situação de cada lado.
 * 
 * @param int equipe_id
 * @returns array quarteiroes
 */
const getOpenRouteByTeam = async ( req, res ) => {
  const { equipe_id } = req.params;

  // Consultando quarteirões de responsabilidade da equipe.
  const quarteirao_equipe = await Equipe.findByPk(equipe_id, {
    include: {
      association: 'quarteiroes'
    }
  }).then( equipe => {
    return equipe.quarteiroes;
  });

  let sql = 
    'SELECT ' +
      'q.*, ' +
      'l.id AS lado_id, ' +
      'l.numero AS lado_numero, ' +
      'l.rua_id AS lado_rua_id, ' +
      'l.quarteirao_id AS lado_quarteirao_id, ' +
      'r.id AS rua_id, ' +
      'r.nome AS rua_nome, ' +
      'r.cep AS rua_cep, ' +
      'r.localidade_id AS rua_localidade_id, ' +
      'CAST( ' +
        '(SELECT COUNT(*) FROM imoveis WHERE lado_id = l.id) ' +
      ' AS INTEGER ) AS imoveis, ' +
      'CAST( ' +
        '( ' +
          'SELECT ' +
            'COUNT(*) ' +
          'FROM ' +
            'vistorias AS v ' +
            'JOIN imoveis AS i ON(v.imovel_id = i.id) ' +
            'JOIN trabalhos_diarios AS td ON( v.trabalho_diario_id = td.id ) ' +
          'WHERE ' +
            'i.lado_id = l.id ' +
            'AND v.pendencia IS NULL ' +
            'AND td.equipe_id = ' + equipe_id +
        ') ' +
      ' AS INTEGER ) AS vistorias ' +
    'FROM ' +
      'quarteiroes AS q ' +
      'JOIN lados AS l ON(q.id = l.quarteirao_id) ' +
      'JOIN ruas AS r ON(l.rua_id = r.id) ' +
    'WHERE ';
      // 'q.id = 1 ' +
      // 'OR q.id = 2';

  const q = quarteirao_equipe.map((quarteirao, index) => {
    if( index === 0 )
      sql += 'q.id = $' + ( index + 1 ) + ' ';
    else
      sql += 'OR q.id = $' + ( index + 1 ) + ' ';

    return quarteirao.id;
  });

  // Consultando quarteirões e verificando a situação dos lados.
  let quarteirao_situacao = await Quarteirao.sequelize.query(
    sql, 
    {
      bind: q,
      logging: console.log,
    }
  ).then( data => {
    const [ rows ] = data;

    let rota          = [],
        quarteirao_id = rows[ 0 ].id,
        quarteirao    = {
          id: rows[ 0 ].id,
          numero: rows[ 0 ].numero,
          ativo: rows[ 0 ].ativo,
          localidade_id: rows[ 0 ].localidade_id,
          zona_id: rows[ 0 ].zona_id,
          lados: []
        };
    
    rows.forEach(row => {
      if( row.id !== quarteirao_id ) {
        rota.push( quarteirao );
        quarteirao_id = row.id;
        quarteirao    = {
          id: row.id,
          numero: row.numero,
          ativo: row.ativo,
          localidade_id: row.localidade_id,
          zona_id: row.zona_id,
          lados: []
        };
      }

      quarteirao.lados.push({
        id: row.lado_id,
        numero: row.lado_numero,
        rua_id: row.lado_rua_id,
        quarteirao_id: row.lado_quarteirao_id,
        rua: {
          id: row.rua_id,
          nome: row.rua_nome,
          cep: row.rua_cep,
          localidade_id: row.rua_localidade_id
        },
        imoveis: row.imoveis,
        vistorias: row.vistorias,
        situacao: row.imoveis === row.vistorias ? 3 : ( row.vistorias > 0 ? 2 : 1 )
      });
    });

    return rota;
  });

  // Consultando lados já planejando do dia de uma equipe.
  const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
  const current_date = `${Y}-${m}-${d}`;

  const rotas = await Rota.findAll({
    include: {
      association: "trabalhoDiario",
      where: {
        data: current_date,
        equipe_id
      }
    }
  });

  quarteirao_situacao = quarteirao_situacao.map(quarteirao => {
    let q = quarteirao;

    q.lados = quarteirao.lados.map(lado => {
      rotas.forEach(r => {
        if( lado.id === r.lado_id ) {
          if( lado.situacao !== 3 )
            lado.situacao = 4;
          lado.usuario_id = r.trabalhoDiario.usuario_id
        }
      });

      return lado;
    });

    return q;
  });

  return res.json( quarteirao_situacao );
}

/**
 * Retorna um array de atividades com as equipes com todas as rotas planejadas
 * da equipe do dia.
 */
const consultarRotasPlanejadas = async ( req, res ) => {
  const { usuario_id, ciclo_id } = req.params;

  const allow = await allowFunction( req.userId, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const supervisor = await Usuario.findByPk( usuario_id, {
    include: {
      association: "atuacoes"
    }
  });
  if( !supervisor )
    return res.status(400).json({ error: "Usuário não existe" });

  if( supervisor.atuacoes[ 0 ].escopo !== 2 )
    return res.json([]);

  const atividades = await Atividade.findAll({
    where: {
      ciclo_id,
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
          }
        ]
      }
    ]
  });

  const atividadesSupervisor = [];

  const promise_atividades = atividades.map(async atividade => {
    let act = atividade;

    let teams = act.equipes.filter( (team, index) => {
      let fl_team = false;
      
      team.membros.forEach( member => {
        if( member.usuario_id === supervisor.id && member.tipoPerfil === 4 )
          fl_team = true;
      });

      return fl_team;
    });

    if( teams.length > 0 ) {
      const [ m, d, Y ]  = new Date().toLocaleDateString( 'en-US' ).split('/');
      const current_date = `${ Y }-${ m }-${ d }`;

      let equipes = [];
      const promises = teams.map( async equipe => {
        let e = equipe;
        
        e.dataValues.rota = await TrabalhoDiario.findAll({
          where: {
            equipe_id: equipe.id,
            data: current_date
          },
          include: [
            {
              association: 'usuario',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
            },
            {
              association: 'rota',
              attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
              include: {
                association: 'imoveis',
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                include: {
                  association: 'vistorias',
                  attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
                }
              }
            }
          ]
        });

        e.dataValues.membros = undefined;
        equipes.push( e );
      });

      await Promise.all( promises );
      
      act.dataValues.equipes = equipes;
      atividadesSupervisor.push( act );
    }
  });

  await Promise.all( promise_atividades );

  return res.json( atividadesSupervisor );
}

const router = express.Router();
router.use(authMiddleware);

router.get('/:usuario_id/usuarios/:data/data', getRoute);
router.get('/planejamento/:usuario_id/usuarios', getPlain);
router.post('/planejamento', planejarRota);
router.post('/iniciar', startRoute);
router.post('/finalizar', endRoute);
router.get('/check/:trabalhoDiario_id/trabalhoDiario', isStarted);
router.get('/abertas/:equipe_id/equipes', getOpenRouteByTeam);
router.get('/planejadas/:ciclo_id/ciclo/:usuario_id/supervisor', consultarRotasPlanejadas);

module.exports = app => app.use('/rotas', router);