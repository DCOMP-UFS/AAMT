'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'funcoes_tipos_perfis', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        funcao_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'funcoes', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        tipo_perfil_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'tipos_perfis', key: 'id' },
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
    ).then(() => {
      return queryInterface.addConstraint('funcoes_tipos_perfis', ['funcao_id', 'tipo_perfil_id'], {
        type: 'unique',
        name: 'funcoes_tipos_perfis_unique'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('funcoes_tipos_perfis');
  }
};
