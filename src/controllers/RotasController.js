const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Rota = require('../models/Rota');
const Lado = require('../models/Lado');
const Quarteirao = require('../models/Quarteirao');
const Vistoria = require('../models/Vistoria');
const Deposito = require('../models/Deposito');
const Tratamento = require('../models/Tratamento');
const Amostra = require('../models/Amostra');
const Imovel = require('../models/Imovel');

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
      data: `${ data } 00:00:00-03`
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

plain = async ( req, res ) => {
  const { usuario_id } = req.params;
  const { supervisor_id, planejamento } = req.body;
  const userId = req.userId;

  // Iniciando validação
  const supervisor = await Usuario.findByPk( userId );

  const allow = await allowFunction( supervisor.id, 'definir_trabalho_diario' );
  if( !allow )
    return res.status(403).json({ error: 'Acesso negado' });

  const usuario = await Usuario.findByPk( supervisor_id, {
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
  // Fim validação

  // en-GB: Britânico, d/m/Y
  const [ d, m, Y ]  = new Date().toLocaleDateString('en-GB').split('/');
  const current_date = `${Y}-${m}-${d} 00:00:00-03`;

  planejamento.forEach( async p => {
    await p.rotas.forEach( async rota => {
      const td = await TrabalhoDiario.findOne({
        where: {
          [Op.and]: [
            {
              data: {
                [Op.eq]: current_date
              }
            },
            { usuario_id: rota.usuario_id },
            { equipe_id: p.idEquipe }
          ]
        }
      });

      if( !td ) {
        await TrabalhoDiario.create({
          data: current_date,
          supervisor_id: usuario.id,
          usuario_id: rota.usuario_id,
          equipe_id: p.idEquipe
        }).then( trabalho => {
          rota.lados.forEach( async l => {
            await Rota.create({
              lado_id: l.id,
              trabalho_diario_id: trabalho.id
            });
          });
        });
      } else {
        await Rota.destroy({
          where: {
            trabalho_diario_id: td.id
          }
        });

        rota.lados.forEach( async l => {
          await Rota.create({
            lado_id: l.id,
            trabalho_diario_id: td.id
          });
        });
      }
    });
  });

  return res.json({
    planejamento
  });
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

  const [ d, m, Y ]  = new Date().toLocaleDateString('en-GB').split('/');
  const current_date = `${Y}-${m}-${d} 00:00:00-03`;
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

const router = express.Router();
router.use(authMiddleware);

router.get('/:usuario_id/usuarios/:data/data', getRoute);
router.get('/planejamento/:usuario_id/usuarios', getPlain);
router.post('/planejamento', plain);
router.post('/iniciar', startRoute);
router.post('/finalizar', endRoute);
router.get('/check/:trabalhoDiario_id/trabalhoDiario', isStarted);

module.exports = app => app.use('/rotas', router);