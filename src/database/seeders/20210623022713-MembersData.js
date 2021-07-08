'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'membros', [
      {
        // LIRAa Simão Dias
        tipo_perfil: 3, // Supervisor
        equipe_id: 1,
        usuario_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Simão Dias
        tipo_perfil: 4, // Agente
        equipe_id: 1,
        usuario_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        tipo_perfil: 3, // Supervisor
        equipe_id: 2,
        usuario_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        tipo_perfil: 4, // Agente
        equipe_id: 2,
        usuario_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Aracaju
        tipo_perfil: 3, // Supervisor
        equipe_id: 3,
        usuario_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Aracaju
        tipo_perfil: 4, // Agente
        equipe_id: 3,
        usuario_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        tipo_perfil: 3, // Supervisor
        equipe_id: 4,
        usuario_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        tipo_perfil: 4, // Agente
        equipe_id: 4,
        usuario_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'membros', null, {});
  }
};
