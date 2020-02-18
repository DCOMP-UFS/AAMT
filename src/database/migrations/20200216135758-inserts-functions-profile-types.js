'use strict';

const createPermission = ( id, funcao_id, tipo_perfil_id ) => {
  return { funcao_id, tipo_perfil_id, created_at: new Date(), updated_at: new Date() }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('funcoes_tipos_perfis', [
      // COORDENADOR GERAL
      createPermission( 8, 8, 1 ),

      // COORDENADOR
      createPermission( 13, 1, 2 ),
      createPermission( 14, 2, 2 ),
      createPermission( 15, 3, 2 ),
      createPermission( 16, 4, 2 ),
      createPermission( 17, 5, 2 ),
      createPermission( 18, 6, 2 ),
      createPermission( 19, 7, 2 ),
      createPermission( 20, 9, 2 ),
      createPermission( 21, 10, 2 ),
      createPermission( 22, 11, 2 ),
      createPermission( 23, 12, 2 ),

      // SUPERVISOR
      createPermission( 24, 5, 3 ),
      createPermission( 25, 6, 3 ),
      createPermission( 26, 7, 3 ),
      createPermission( 27, 10, 3 ),
      createPermission( 28, 11, 3 ),
      createPermission( 29, 12, 3 ),

      // AGENTE
      createPermission( 30, 5, 4 ),
      createPermission( 31, 6, 4 ),
      createPermission( 32, 7, 4 ),
      createPermission( 33, 10, 4 ),
      createPermission( 34, 11, 4 ),

      // LABORATORIALISTA
      createPermission( 35, 12, 5 ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('funcoes_tipos_perfis', Sequelize.or({ id: [1, 23] }));
  }
};
