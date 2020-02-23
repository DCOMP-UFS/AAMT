'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('estados', [
      {
        sigla : "AC",
        nome: "Acre",
        regiao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "AL",
        nome: "Alagoas",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "AM",
        nome: "Amazonas",
        regiao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "AP",
        nome: "Amapá",
        regiao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "BA",
        nome: "Bahia",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "CE",
        nome: "Ceará",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "DF",
        nome: "Distrito Federal",
        regiao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "ES",
        nome: "Espírito Santo",
        regiao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "GO",
        nome: "Goiás",
        regiao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "MA",
        nome: "Maranhão",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "MG",
        nome: "Minas Gerais",
        regiao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "MS",
        nome: "Mato Grosso do Sul",
        regiao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "MT",
        nome: "Mato Grosso",
        regiao_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "PA",
        nome: "Pará",
        regiao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "PB",
        nome: "Paraíba",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "PE",
        nome: "Pernambuco",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "PI",
        nome: "Piauí",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "PR",
        nome: "Paraná",
        regiao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "RJ",
        nome: "Rio de Janeiro",
        regiao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "RN",
        nome: "Rio Grande do Norte",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "RO",
        nome: "Rondônia",
        regiao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "RR",
        nome: "Roraima",
        regiao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "RS",
        nome: "Rio Grande do Sul",
        regiao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "SC",
        nome: "Santa Catarina",
        regiao_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "SE",
        nome: "Sergipe",
        regiao_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "SP",
        nome: "São Paulo",
        regiao_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sigla : "TO",
        nome: "Tocantins",
        regiao_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('estados', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
