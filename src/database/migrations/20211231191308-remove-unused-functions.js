'use strict';
const { Op } = require( 'sequelize' );

module.exports = {
  up: async ( queryInterface, Sequelize ) => {    
    return queryInterface.bulkDelete('funcoes', {
      [ Op.or ]: [
        { nome: "trabalho_diario" }, 
        { nome: "planejar_atividade" },
      ]
    } );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('funcoes', [
      {
        nome: 'trabalho_diario',// 16
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'planejar_atividade',// 17
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  }
};
