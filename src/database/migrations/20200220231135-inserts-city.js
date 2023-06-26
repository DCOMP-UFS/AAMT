'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('municipios', [
      {
        codigo: 2807105,
        nome: 'Simão Dias',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2800308,
        nome: 'Aracaju',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2800506,
        nome: 'Areia Branca',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2802908,
        nome: 'Itabaiana',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2804805,
        nome: 'Nossa Senhora do Socorro',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2806701,
        nome: 'São Cristóvão',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2805901,
        nome: 'Riachuelo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 2803609,
        nome: 'Laranjeiras',
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
