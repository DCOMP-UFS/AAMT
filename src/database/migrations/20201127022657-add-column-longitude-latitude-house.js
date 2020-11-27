'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.addColumn('imoveis', 'lng', {
        type: Sequelize.DECIMAL,
        allawNull: false,
        defaultValue: 39.807222
      }),
      queryInterface.addColumn('imoveis', 'lat', {
        type: Sequelize.DECIMAL,
        allawNull: false,
        defaultValue: -76.984722
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.removeColumn('imoveis', 'lng'),
      queryInterface.removeColumn('imoveis', 'lat')
    ]);
  }
};
