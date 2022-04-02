'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'laboratorios_municipios', [
      {
        laboratorio_id: 1,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        laboratorio_id: 2,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        laboratorio_id: 3,
        municipio_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        laboratorio_id: 4,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        laboratorio_id: 5,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        laboratorio_id: 6,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        laboratorio_id: 7,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      
      {
        laboratorio_id: 8,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        laboratorio_id: 9,
        municipio_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'laboratorios_municipios', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};