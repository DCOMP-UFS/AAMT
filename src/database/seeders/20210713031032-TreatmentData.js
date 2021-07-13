'use strict';
const faker = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    
    for( let i = 1; i <= 2000; i++ ) {
      data.push({
        quantidade: faker.datatype.number( { max: 4, min: 1 } ),
        tecnica: 1,
        deposito_id: i,
        inseticida_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert( 'tratamentos', data );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'tratamentos', null, {});
  }
};