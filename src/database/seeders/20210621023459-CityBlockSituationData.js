'use strict';
const { Op }  = require( 'sequelize' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'situacao_quarteiroes', [
      {
        // LIRAa Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 1,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 1,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 1,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 1,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 6,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Simão Dias
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 2,
        quarteirao_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Aracaju
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 3,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // LIRAa Aracaju
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 3,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 4,
        quarteirao_id: 9,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 4,
        quarteirao_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 4,
        quarteirao_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // PNCD Aracaju
        data_conclusao: null,
        situacao_quarteirao_id: 1,
        estrato_id: 4,
        quarteirao_id: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'situacao_quarteiroes', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
