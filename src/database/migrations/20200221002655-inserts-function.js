'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('funcoes', [
      {
        nome: 'definir_ciclo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_municipio',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_usuario',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_localidade',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_zona',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_atividade',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_laboratorio',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'planejar_atividade',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_rua',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_quarteirao',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'manter_imovel',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'trabalho_diario',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'realizar_vistoria',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'realizar_exame',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('funcoes', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
