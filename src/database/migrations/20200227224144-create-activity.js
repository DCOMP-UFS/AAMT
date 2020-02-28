'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'atividades', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        abrangencia: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        situacao: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        responsabilidade: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        ciclo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'ciclos', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        metodologia_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'metodologias', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        objetivo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'objetivos', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        municipio_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'municipios', key: 'id' },
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
    return queryInterface.dropTable('atividades');
  }
};
