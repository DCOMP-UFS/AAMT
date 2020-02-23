'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'municipios', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        codigo: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ativo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        regional_saude_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'regionais_saude', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
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
    return queryInterface.dropTable('municipios');
  }
};
