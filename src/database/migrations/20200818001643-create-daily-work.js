'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'trabalhos_diarios', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        data: {
          type: Sequelize.DATE,
          allowNull: false
        },
        hora_inicio: {
          type: Sequelize.TIME,
          allowNull: true
        },
        hora_fim: {
          type: Sequelize.TIME,
          allowNull: true
        },
        supervisor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuarios', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuarios', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        equipe_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'equipes', key: 'id' },
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
    return queryInterface.dropTable('trabalhos_diarios');
  }
};
