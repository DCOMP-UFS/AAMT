'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    const date = new Date();

    return queryInterface.bulkInsert( 'ciclos', [
      {
        id: 1,
        ano: date.getFullYear(),
        data_inicio: `${ date.getFullYear() }-01-01`,
        data_fim: `${ date.getFullYear() }-03-01`,
        sequencia: 1,
        created_at: new Date(),
        updated_at: new Date(),
        regional_saude_id: 1
      },
      {
        id: 2,
        ano: date.getFullYear(),
        data_inicio: `${ date.getFullYear() }-03-02`,
        data_fim: `${ date.getFullYear() }-05-01`,
        sequencia: 2,
        created_at: new Date(),
        updated_at: new Date(),
        regional_saude_id: 1
      },
      {
        id: 3,
        ano: date.getFullYear(),
        data_inicio: `${ date.getFullYear() }-05-02`,
        data_fim: `${ date.getFullYear() }-07-01`,
        sequencia: 3,
        created_at: new Date(),
        updated_at: new Date(),
        regional_saude_id: 1
      },
      {
        id: 4,
        ano: date.getFullYear(),
        data_inicio: `${ date.getFullYear() }-07-02`,
        data_fim: `${ date.getFullYear() }-09-01`,
        sequencia: 4,
        created_at: new Date(),
        updated_at: new Date(),
        regional_saude_id: 1
      },
      {
        id: 5,
        ano: date.getFullYear(),
        data_inicio: `${ date.getFullYear() }-09-02`,
        data_fim: `${ date.getFullYear() }-11-01`,
        sequencia: 5,
        created_at: new Date(),
        updated_at: new Date(),
        regional_saude_id: 1
      },
      {
        id: 6,
        ano: date.getFullYear(),
        data_inicio: `${ date.getFullYear() }-11-02`,
        data_fim: `${ date.getFullYear() }-12-31`,
        sequencia: 6,
        created_at: new Date(),
        updated_at: new Date(),
        regional_saude_id: 1
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'ciclos', null, {});
  }
};