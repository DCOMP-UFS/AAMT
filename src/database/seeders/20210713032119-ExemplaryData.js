'use strict';
const faker = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    
    for( let i = 1; i <= 1000; i++ ) {
      for( let j = 1; j <= 5; j++ ) {
        data.push({
          quantidade: faker.datatype.number( { max: 50, min: 0 } ),
          fase: j,
          amostra_id: i,
          mosquito_id: faker.datatype.number( { max: 2, min: 1 } ),
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    return queryInterface.bulkInsert( 'exemplares', data );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'exemplares', null, {});
  }
};