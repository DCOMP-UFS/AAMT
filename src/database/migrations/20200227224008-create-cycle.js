'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ciclos', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        }, 
        ano: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        data_inicio: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        data_fim: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        sequencia: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        regional_saude_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'regionais_saude', key: 'id' },
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
      return queryInterface.addConstraint('ciclos', ['ano', 'sequencia'], {
        type: 'unique',
        name: 'ciclos_unique'
      });
    });;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ciclos');
  }
};
