'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('metodologias', [
      {
        nome: 'Levantamento de Índice Rápido do Aedes Aegypti',
        sigla: 'LIRAa',
        fl_estrato: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Programa Nacional de Controle da Dengue',
        sigla: 'PNCD',
        fl_estrato: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('metodologias', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
