'use strict';
const { Op } = require('sequelize');

const createPermission = ( funcao_id, tipo_perfil ) => {
  return { funcao_id, tipo_perfil, created_at: new Date(), updated_at: new Date() }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissoes', [
      createPermission( 1, 1 ),
      createPermission( 2, 1 ),
      createPermission( 3, 1 ),
      createPermission( 3, 2 ),
      createPermission( 4, 2 ),
      createPermission( 5, 2 ),
      createPermission( 6, 1 ),
      createPermission( 6, 2 ),
      createPermission( 7, 2 ),
      createPermission( 9, 3 ),
      createPermission( 10, 3 ),
      createPermission( 11, 3 ),
      createPermission( 12, 4 ),
      createPermission( 13, 4 ),
      createPermission( 14, 5 ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissoes', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
