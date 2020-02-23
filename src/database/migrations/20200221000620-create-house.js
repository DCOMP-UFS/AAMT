'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'imoveis', { 
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
          allowNull: true,
        },
        responsavel: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        complemento: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        tipo_imovel: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lado_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'lados', key: 'id' },
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
    return queryInterface.dropTable('imoveis');
  }
};
