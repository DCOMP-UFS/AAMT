'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('metodologias', [
      {
        id: 1,
        nome: 'Levantamento de Índice Rápido do Aedes Aegypti',
        sigla: 'LIRAa',
        fl_estrato: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        nome: 'Programa Nacional de Controle da Dengue',
        sigla: 'PNCD',
        fl_estrato: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('metodologias', Sequelize.or({ id: [1, 2] }));
  }
};
