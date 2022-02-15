'use strict';
const faker = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data  = [];
    
    for( let i = 1; i <= 60000; i++ ) {
      if( faker.datatype.number( { max: 100, min: 1 } ) > 90 ) {
        data.push({
          situacao_amostra: faker.datatype.number( { max: 4, min: 1 } ),
          deposito_id: i,
          laboratorio_id: null,
          sequencia: 1,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    return queryInterface.bulkInsert( 'amostras', data );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'amostras', null, {});
  }
};