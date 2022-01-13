'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('funcoes', [
      {
        nome: 'visualizar_amostra',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'encaminhar_amostra',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_atividade_municipio',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_usuario_municipio',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'relatorio_meu_boletim',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'relatorio_boletim_diario',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'relatorio_boletim_diario_equipe',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'relatorio_boletim_semanal',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'relatorio_por_atividade',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'relatorio_por_atividade_da_equipe',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('funcoes', {
      [ Op.or ]: [
        { nome: "visualizar_amostra" }, 
        { nome: "encaminhar_amostra" },
        { nome: "manter_atividade_municipio" },
        { nome: "manter_usuario_municipio" },
        { nome: "relatorio_boletim_diario" },
        { nome: "relatorio_boletim_diario_equipe" },
        { nome: "relatorio_boletim_semanal" },
        { nome: "relatorio_por_atividade" },
        { nome: "relatorio_por_atividade_da_equipe" },
      ]
    } );
  }
};
