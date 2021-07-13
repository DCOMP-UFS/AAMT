'use strict';
const faker = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data  = [];
    let fl    = false;
    
    for( let i = 1; i <= 2000; i++ ) {
      fl = !fl;
      if( fl ) {      
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