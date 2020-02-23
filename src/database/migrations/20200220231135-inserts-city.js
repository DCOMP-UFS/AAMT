'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('municipios', [
      {
        codigo: 2807105,
        nome: 'Simão Dias',
        regional_saude_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2800308,
        nome: 'Aracaju',
        regional_saude_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('municipios', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
