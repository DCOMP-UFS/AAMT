'use strict';
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'equipes_quarteiroes', [
      {
        // LIRAa Simão Dias
        equipe_id: 1,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Simão Dias
        equipe_id: 1,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Simão Dias
        equipe_id: 1,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Simão Dias
        equipe_id: 1,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        equipe_id: 2,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Aracaju
        equipe_id: 3,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Aracaju
        equipe_id: 3,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        equipe_id: 4,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        equipe_id: 4,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        equipe_id: 4,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        equipe_id: 4,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'equipes_quarteiroes', null, {});
  }
};
