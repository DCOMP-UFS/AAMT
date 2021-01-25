'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'quarteiroes', [
      {
        numero: 1,
        ativo: 1,
        localidade_id: 1, // PASTINHO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        ativo: 1,
        localidade_id: 1, // PASTINHO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        ativo: 1,
        localidade_id: 2, // TRIUNFO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        ativo: 1,
        localidade_id: 2, // TRIUNFO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 5,
        ativo: 1,
        localidade_id: 3, // FEIRINHA
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 6,
        ativo: 1,
        localidade_id: 3, // FEIRINHA
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 7,
        ativo: 1,
        localidade_id: 4, // MATA DO PERU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 8,
        ativo: 1,
        localidade_id: 4, // MATA DO PERU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        ativo: 1,
        localidade_id: 10, // SÃO CONRADO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        ativo: 1,
        localidade_id: 10, // SÃO CONRADO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 3,
        ativo: 1,
        localidade_id: 11, // FAROLÂNDIA
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 4,
        ativo: 1,
        localidade_id: 11, // FAROLÂNDIA
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'quarteiroes', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
