'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'laboratorios_municipios', [
      {
        cnpj: 102,
        municipio_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 1213,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 3198,
        municipio_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 1094,
        municipio_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 872,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 297,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 446,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      
      {
        cnpj:821,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj:933,
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