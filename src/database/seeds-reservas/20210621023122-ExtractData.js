'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const date = new Date();

    return queryInterface.bulkInsert( 'estratos', [
      {
        atividade_id: 1, // LIRAa Simão Dias
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        atividade_id: 2, // PNCD Simão Dias
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        atividade_id: 3, // LIRAa Aracaju
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        atividade_id: 4, // PNCD Aracaju
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'estratos', null, {});
  }
};