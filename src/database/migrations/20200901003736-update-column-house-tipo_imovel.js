'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('imoveis', 'tipo_imovel', {
      type: 'INTEGER USING CAST(tipo_imovel AS INTEGER)'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('imoveis', 'tipo_imovel', {
      type: Sequelize.STRING
    });
  }
};
