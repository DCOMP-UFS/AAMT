'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'lados', [
      {
        numero: 1,
        rua_id: 723,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 724,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 725,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 726,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 727,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 728,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 729,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 730,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 731,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 732,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 733,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 734,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 735,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 736,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 737,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 738,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 739,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 740,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 741,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 742,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 723,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 744,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 745,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 746,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 812,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 813,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 814,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 815,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 816,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 817,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 818,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 819,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 820,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 821,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 822,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 823,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 824,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 825,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 826,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 827,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 828,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 829,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 830,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 831,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        rua_id: 832,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        rua_id: 833,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        rua_id: 834,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        rua_id: 835,
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