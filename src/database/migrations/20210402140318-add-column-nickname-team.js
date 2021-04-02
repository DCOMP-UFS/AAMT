'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('equipes', 'apelido', {
        type: Sequelize.STRING,
        allawNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('equipes', 'apelido'),
    ]);
  }
};
