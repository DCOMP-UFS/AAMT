'use strict';
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'equipes', [
      {
        // LIRAa Simão Dias
        atividade_id: 1,
        apelido: faker.lorem.word(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        atividade_id: 2,
        apelido: faker.lorem.word(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Aracaju
        atividade_id: 3,
        apelido: faker.lorem.word(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        atividade_id: 4,
        apelido: faker.lorem.word(),
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'equipes', null, {});
  }
};
