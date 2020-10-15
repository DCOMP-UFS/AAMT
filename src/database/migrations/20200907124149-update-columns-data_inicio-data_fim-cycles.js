'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.changeColumn('ciclos', 'data_inicio', {
        type: Sequelize.DATEONLY
      }),
      queryInterface.changeColumn('ciclos', 'data_fim', {
        type: Sequelize.DATEONLY
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([ 
      queryInterface.changeColumn('ciclos', 'tipo_imovel', {
        type: Sequelize.DATE
      }),
      queryInterface.changeColumn('ciclos', 'data_fim', {
        type: Sequelize.DATE
      })
    ]);
  }
};
