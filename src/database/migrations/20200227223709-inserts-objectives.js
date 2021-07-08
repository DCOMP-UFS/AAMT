'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('objetivos', [
      {
        id: 1,
        sigla: 'LI',
        descricao: 'LI - Levantamento de Índice',
        numero: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        sigla: 'LI+T',
        descricao: 'LI+T - Levantamento de Índice + Tratamento',
        numero: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        sigla: 'PE',
        descricao: 'PE - Ponto Estratégico',
        numero: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        sigla: 'T',
        descricao: 'T - Tratamento',
        numero: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        sigla: 'DF',
        descricao: 'DF - Delimitação de Foco',
        numero: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        sigla: 'PVE',
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
