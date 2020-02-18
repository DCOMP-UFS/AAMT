'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('funcoes', [
      {
        id: 1,
        nome: 'manter_usuario',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        nome: 'manter_localidade',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        nome: 'manter_zona',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        nome: 'manter_municipio',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        nome: 'manter_imovel',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        nome: 'manter_rua',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        nome: 'manter_quarteirao',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        nome: 'manter_ciclo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        nome: 'manter_atividade',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        nome: 'manter_trabalho_diario',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 11,
        nome: 'realizar_vistoria',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 12,
        nome: 'realizar_exame',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('funcoes', Sequelize.or({ id: [1, 12] }));
  }
};
