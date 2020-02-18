'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos_perfis', [
      {
        id: 1,
        descricao: 'Coordenador Geral',
        sigla: 'CG',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        descricao: 'Coordenador',
        sigla: 'C',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        descricao: 'Supervisor',
        sigla: 'S',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        descricao: 'Agente',
        sigla: 'A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        descricao: 'Laboratorialista',
        sigla: 'L',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos_perfis', Sequelize.or({ id: [1, 5] }));
  }
};
