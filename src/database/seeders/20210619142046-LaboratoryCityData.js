'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'laboratorios_municipios', [
      {
        cnpj: 78453081000172,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 29610703000113,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 15030150000115,
        municipio_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 33617595000188,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 28463728000179,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 14374767000131,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 99113312000179,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      
      {
        cnpj: 92037785000195,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 42469396000160,
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