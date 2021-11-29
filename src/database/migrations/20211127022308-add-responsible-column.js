'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('vistorias', 'responsavel', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('vistorias', 'responsavel'),
    ]);
  }
};
