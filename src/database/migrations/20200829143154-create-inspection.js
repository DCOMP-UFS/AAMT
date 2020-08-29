'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'vistorias', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        situacao_vistoria: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        pendencia: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        hora_entrada: {
          type: Sequelize.TIME,
          allowNull: false
        },
        trabalho_diario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'trabalhos_diarios', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        imovel_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'imoveis', key: 'id' },
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
    return queryInterface.dropTable('vistorias');
  }
};
