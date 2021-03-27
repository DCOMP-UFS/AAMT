'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('vistorias', 'justificativa', {
        type: Sequelize.STRING,
        allawNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('vistorias', 'justificativa'),
    ]);
  }
};
