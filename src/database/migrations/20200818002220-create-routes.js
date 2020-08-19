'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'rotas', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        lado_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'lados', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        trabalho_diario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'trabalhos_diarios', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rotas');
  }
};
