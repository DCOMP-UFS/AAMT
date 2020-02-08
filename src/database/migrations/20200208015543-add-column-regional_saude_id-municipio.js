'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'municipios',
      'regional_saude_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'regionaisSaude', key: 'id' },
        defaultValue: 5,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'municipios',
      'regional_saude_id'
    );
  }
};
