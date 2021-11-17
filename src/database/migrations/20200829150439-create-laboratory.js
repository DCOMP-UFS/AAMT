'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'laboratorios', { 
        cnpj: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          allowNull: false,
          references: {model: 'laboratorios_municipios', key: 'cnpj'}
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        endereco: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        municipio_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        tipo_laboratorio:{
          type: Sequelize.ENUM('sede', 'privado'),
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
