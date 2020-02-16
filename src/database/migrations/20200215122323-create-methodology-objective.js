'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'metodologias_objetivos', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        metodologia_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'metodologias', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        objetivo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'objetivos', key: 'id' },
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
    ).then(() => {
      return queryInterface.addConstraint('metodologias_objetivos', ['metodologia_id', 'objetivo_id'], {
        type: 'unique',
        name: 'metodologias_objetivos_unique'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('metodologias_objetivos');
  }
};
