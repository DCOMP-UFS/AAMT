'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'quarteiroes', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        numero: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        sequencia: {
          type: Sequelize.INTEGER,
          defaultValue: null
        },
        ativo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        localidade_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'localidades', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        zona_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'zonas', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        quarteirao_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'quarteiroes', key: 'id' },
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
    return queryInterface.dropTable('quarteiroes');
  }
};
