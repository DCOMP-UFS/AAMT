'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'lados', { 
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
        rua_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'ruas', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        quarteirao_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
    return queryInterface.dropTable('lados');
  }
};