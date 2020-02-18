'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'usuarios', 'tipo_perfil' );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'usuarios',
      'tipo_perfil',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  }
};
