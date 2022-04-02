'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'laboratorios', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        cnpj: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        endereco: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tipo_laboratorio:{
          type: Sequelize.ENUM( 'sede', 'privado' ),
          allowNull: false,
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
    return queryInterface.dropTable('laboratorios');
  }
};