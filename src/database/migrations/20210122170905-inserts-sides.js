'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'lados', [
      {
        numero: 1,
        rua_id: 1,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 2,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 3,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 4,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 1,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 5,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 3,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 2,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 6,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 7,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 8,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 9,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 6,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 10,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 8,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 7,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 11,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 12,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 13,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 14,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 11,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 15,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 13,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 12,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 16,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 17,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 18,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 19,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 16,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 20,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 18,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 17,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 21,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 22,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 23,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 24,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 23,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 22,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 25,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 24,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 26,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 27,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 28,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 29,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 26,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 30,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 28,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 27,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'lados', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};