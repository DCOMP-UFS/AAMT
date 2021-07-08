'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('imoveis', 'ativo', {
        type: Sequelize.BOOLEAN,
        allawNull: false,
        defaultValue: true
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('imoveis', 'ativo'),
    ]);
  }
};
