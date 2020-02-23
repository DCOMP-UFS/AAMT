'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('objetivos', [
      {
        id: 1,
        descricao: 'LI - Levantamento de Índice',
        numero: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        descricao: 'LI+T - Levantamento de Índice + Tratamento',
        numero: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        descricao: 'PE - Ponto Estratégico',
        numero: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        descricao: 'T - Tratamento',
        numero: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        descricao: 'DF - Delimitação de Foco',
        numero: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        descricao: 'PVE - Pesquisa Vetorial Especial',
        numero: 6,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('objetivos', Sequelize.or({ id: [1, 2, 3, 4, 5, 6] }));
  }
};
