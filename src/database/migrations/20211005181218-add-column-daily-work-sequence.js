'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('trabalhos_diarios', 'sequencia', {
        type: Sequelize.INTEGER,
        allawNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('trabalhos_diarios', 'sequencia'),
    ]);
  }
};
