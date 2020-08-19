const authMiddleware = require('../middlewares/auth');
const express = require('express');
const { Op } = require('sequelize');
const Usuario = require('../models/Usuario');
const TrabalhoDiario = require('../models/TrabalhoDiario');
const Rota = require('../models/Rota');

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

  return res.json({
    usuario_id, 
    data,
    userId,
    userRequest
  });
}

plain = async ( req, res ) => {
  const { planejamento } = req.body;
  const userId = req.userId;

  // Iniciando validação
  const userRequest = await Usuario.findByPk( userId, {
    include: {
      association: "atuacoes"
    }
  });

  let fl_supervisor = false;
  userRequest.atuacoes.forEach( at => {
    if( at.tipoPerfil === 3 )
      fl_supervisor = true;
  });

  if( !fl_supervisor )
    return res.status(400).json({ error: "Acesso negado" });
  // Fim validação

  // en-GB: Britânico, d/m/Y
  const [ d, m, Y ]  = new Date().toLocaleDateString('en-GB').split('/');
  const current_date = `${Y}-${m}-${d}`;

  planejamento.forEach( async p => {
    await p.rotas.forEach( async rota => {
      const td = await TrabalhoDiario.findOne({
        where: {
          [Op.and]: [
            {
              data: {
                [Op.lt]: current_date
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
          supervisor_id: userRequest.id,
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

const router = express.Router();
router.use(authMiddleware);

router.get('/:usuario_id/usuarios/:data/data', getRoute);
router.post('/planejamento/', plain);

module.exports = app => app.use('/rotas', router);