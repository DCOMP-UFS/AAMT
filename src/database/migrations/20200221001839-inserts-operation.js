'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('atuacoes', [
      {
        usuario_id: 1,
        tipo_perfil: 1,
        escopo: 1,
        local_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 2,
        tipo_perfil: 2,
        escopo: 2,
        local_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 3,
        tipo_perfil: 3,
        escopo: 2,
        local_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 4,
        tipo_perfil: 4,
        escopo: 2,
        local_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 5,
        tipo_perfil: 5,
        escopo: 3,
        local_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 6,
        tipo_perfil: 2,
        escopo: 2,
        local_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 7,
        tipo_perfil: 3,
        escopo: 2,
        local_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 8,
        tipo_perfil: 4,
        escopo: 2,
        local_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 9,
        tipo_perfil: 5,
        escopo: 3,
        local_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('atuacoes', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
