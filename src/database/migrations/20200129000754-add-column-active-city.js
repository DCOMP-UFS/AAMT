'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'municipios',
      'ativo',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'municipios',
      'ativo'
    );
  }
};
