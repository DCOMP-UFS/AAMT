'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'regioes', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sigla: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pais_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'paises', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        ativo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
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
    return queryInterface.dropTable('regioes');
  }
};
