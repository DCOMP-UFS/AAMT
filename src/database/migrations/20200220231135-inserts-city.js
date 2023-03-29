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
      {
        codigo: 2800506,
        nome: 'Areia Branca',
        regional_saude_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2802908,
        nome: 'Itabaiana',
        regional_saude_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2804805,
        nome: 'Nossa Senhora do Socorro',
        regional_saude_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2806701,
        nome: 'São Cristóvão',
        regional_saude_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2805901,
        nome: 'Riachuelo',
        regional_saude_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2803609,
        nome: 'Laranjeiras',
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
