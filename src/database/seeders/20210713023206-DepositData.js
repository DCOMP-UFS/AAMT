'use strict';
const faker = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data          = [];
    let recipiente    = [ 'A1', 'A2', 'B', 'C', 'D1', 'D2', 'E' ];
    let fl_tratado    = true;
    let fl_eliminado  = false;
    let amount;
    
    for( let i = 1; i <= 6000; i++ ) {
      amount = 10;
      while( amount-- ) {
        fl_tratado    = faker.datatype.number( { max: 100, min: 1 } ) > 90 ? true : false;
        fl_eliminado  = !fl_tratado;

        data.push({
          fl_com_foco: Boolean( faker.datatype.number( { max: 1, min: 0 } ) ),
          fl_tratado: fl_tratado,
          fl_eliminado: fl_eliminado,
          tipo_recipiente: recipiente[ faker.datatype.number( { max: 6, min: 0 } ) ],
          vistoria_id: i,
          sequencia: amount,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    return queryInterface.bulkInsert( 'depositos', data );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'depositos', null, {});
  }
};