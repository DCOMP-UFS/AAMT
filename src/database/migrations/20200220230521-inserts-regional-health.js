'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('regionais_saude', [
      {
        nome: 'Secretaria de Estado da Saúde - SES',
        endereco : 'Av. Augusto Franco, 3150 - Ponto Novo, Aracaju - SE, 49097-670',
        estado_id: 25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Teste Regional - SES',
        endereco : 'Fiction 1',
        estado_id: 25,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('regionais_saude', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
