'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('objetivos', [
      {
        descricao: 'LI - Levantamento de Índice',
        numero: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'LI+T - Levantamento de Índice + Tratamento',
        numero: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'PE - Ponto Estratégico',
        numero: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'T - Tratamento',
        numero: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'DF - Delimitação de Foco',
        numero: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: 'PVE - Pesquisa Vetorial Especial',
        numero: 6,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('objetivos', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
