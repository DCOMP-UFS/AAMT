'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.addConstraint('ciclos', ['metodologia_id', 'objetivo_id'], {
    //   type: 'primary key',
    //   name: 'ciclos_pkey'
    // });
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
        dataInicio: {
          type: Sequelize.DATE,
          allowNull: false
        },
        dataFim: {
          type: Sequelize.DATE,
          allowNull: false
        },
        sequencia: {
          type: Sequelize.INTEGER,
          allowNull: false
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
