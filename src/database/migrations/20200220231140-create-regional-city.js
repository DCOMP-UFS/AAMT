'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'regionais_municipios', { 
        regional_saude_id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'regionais_saude', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        municipio_id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'municipios', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        vinculado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('regionais_municipios');
  }
};
