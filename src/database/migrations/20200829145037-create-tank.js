'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'depositos', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        fl_com_foco: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        fl_tratado: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        fl_eliminado: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        tipo_recipiente: {
          type: Sequelize.STRING,
          allowNull: false
        },
        vistoria_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'vistorias', key: 'id' },
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
    return queryInterface.dropTable('depositos');
  }
};
