'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('vistorias', 'sequencia', {
        type: Sequelize.INTEGER,
        allawNull: false
      }),
      queryInterface.addColumn('depositos', 'sequencia', {
        type: Sequelize.INTEGER,
        allawNull: false
      }),
      queryInterface.addColumn('amostras', 'sequencia', {
        type: Sequelize.INTEGER,
        allawNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('vistorias', 'sequencia'),
      queryInterface.removeColumn('depositos', 'sequencia'),
      queryInterface.removeColumn('amostras', 'sequencia')
    ]);
  }
};
