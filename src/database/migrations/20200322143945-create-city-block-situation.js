'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'situacao_quarteiroes', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        data_conclusao: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        situacao_quarteirao_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        estrato_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'estratos', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        quarteirao_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'quarteiroes', key: 'id' },
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
    return queryInterface.dropTable('situacao_quarteiroes');
  }
};
