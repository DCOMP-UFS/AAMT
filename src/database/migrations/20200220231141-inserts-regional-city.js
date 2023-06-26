'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('regionais_municipios', [
      {
        regional_saude_id: 1,
        municipio_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        regional_saude_id: 1,
        municipio_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        regional_saude_id: 1,
        municipio_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        regional_saude_id: 1,
        municipio_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        regional_saude_id: 1,
        municipio_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        regional_saude_id: 2,
        municipio_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        regional_saude_id: 2,
        municipio_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        regional_saude_id: 2,
        municipio_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('regionais_municipios', {
    regional_saude_id: {
        [Op.gt]: 0
      }
    });
  }
};
