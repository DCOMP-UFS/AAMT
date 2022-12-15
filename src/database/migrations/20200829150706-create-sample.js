'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'amostras', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        situacao_amostra: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        data_encaminhamento: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        data_examinado: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        deposito_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'depositos', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        laboratorio_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'laboratorios', key: 'id' },
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
    return queryInterface.dropTable('amostras');
  }
};