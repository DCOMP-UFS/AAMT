'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('vistorias', 'tipo_imovel_vistoria', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('vistorias', 'tipo_imovel_vistoria'),
    ]);
  }
};
