'use strict';

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    const date = new Date();

    return queryInterface.bulkInsert( 'mosquitos', [
      {
        nome: 'Aedes aegypti',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Aedes albopictus',
        created_at: new Date(),
        updated_at: new Date()
      },
    ] );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'mosquitos', null, {} );
  }
};