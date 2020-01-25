'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'usuarios',
      'municipio_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'municipios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'usuarios',
      'municipio_id'
    );
  }
};
