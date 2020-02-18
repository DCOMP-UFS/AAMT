'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'atuacoes', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        local_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'usuarios', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        tipo_perfil_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'tipos_perfis', key: 'id' },
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
      }
    ).then(() => {
      return queryInterface.addConstraint('atuacoes', ['usuario_id', 'tipo_perfil_id'], {
        type: 'unique',
        name: 'atuacoes_unique'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('atuacoes');
  }
};
