'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'exemplares', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        quantidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        fase: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        amostra_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'amostras', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        mosquito_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'mosquitos', key: 'id' },
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
    return queryInterface.dropTable('exemplares');
  }
};
