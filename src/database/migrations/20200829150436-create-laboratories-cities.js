'use-strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'laboratorios_municipios', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                cnpj: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    unique: true,
                    references: {model: 'laboratorios', key: 'cnpj'},
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                municipio_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {model: 'municipios', key: 'id'},
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

        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('laboratorios_municipios');    
    }
}