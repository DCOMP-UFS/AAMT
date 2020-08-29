'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tratamentos', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        quantidade: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        tecnica: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        deposito_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'depositos', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        inseticida_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'inseticidas', key: 'id' },
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
    return queryInterface.dropTable('tratamentos');
  }
};
