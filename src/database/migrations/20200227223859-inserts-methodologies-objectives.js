'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('metodologias_objetivos', [
      {
        metodologia_id: 1,
        objetivo_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        metodologia_id: 2,
        objetivo_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        metodologia_id: 2,
        objetivo_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        metodologia_id: 2,
        objetivo_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        metodologia_id: 2,
        objetivo_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        metodologia_id: 2,
        objetivo_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        metodologia_id: 2,
        objetivo_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('metodologias_objetivos', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};