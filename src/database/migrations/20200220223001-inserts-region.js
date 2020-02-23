'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('regioes', [
      { 
        nome: "Centro-Oeste",
        sigla: "CO",
        pais_id: 30, 
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Nordeste",
        sigla: "NE",
        pais_id: 30, 
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Norte",
        sigla: "N",
        pais_id: 30, 
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Sudeste",
        sigla: "SE",
        pais_id: 30, 
        created_at: new Date(),
        updated_at: new Date()
      },
      { 
        nome: "Sul",
        sigla: "S",
        pais_id: 30, 
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('regioes', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
