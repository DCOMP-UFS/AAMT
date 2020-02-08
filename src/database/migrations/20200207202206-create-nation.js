'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'paises', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        sigla: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
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
    return queryInterface.dropTable('paises');
  }
};
