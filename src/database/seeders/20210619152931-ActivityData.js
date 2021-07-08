'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    const date = new Date();

    return queryInterface.bulkInsert( 'atividades', [
      {
        abrangencia: 3, // 1 - Localidade, 2 - Zona, 3 - Quarteirão
        situacao: 2, // 1 - Aguadando Planejamento, 2 - Em aberto, 3 - Concluída
        fl_todos_imoveis: false,
        objetivo_atividade: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ciclo_id: 3,
        responsabilidade: 1,
        metodologia_id: 1, // 1 - LIRAa, 2 - PNCD
        objetivo_id: 1, // 1 - LI, 2 - LI+T
        municipio_id: 1, // 1 - Simão Dias, 2 - Aracaju
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        abrangencia: 1, // 1 - Localidade, 2 - Zona, 3 - Quarteirão
        situacao: 2, // 1 - Aguadando Planejamento, 2 - Em aberto, 3 - Concluída
        fl_todos_imoveis: true,
        objetivo_atividade: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ciclo_id: 3,
        responsabilidade: 1,
        metodologia_id: 2, // 1 - LIRAa, 2 - PNCD
        objetivo_id: 2, // 1 - LI, 2 - LI+T
        municipio_id: 1, // 1 - Simão Dias, 2 - Aracaju
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        abrangencia: 3, // 1 - Localidade, 2 - Zona, 3 - Quarteirão
        situacao: 2, // 1 - Aguadando Planejamento, 2 - Em aberto, 3 - Concluída
        fl_todos_imoveis: false,
        objetivo_atividade: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ciclo_id: 3,
        responsabilidade: 1,
        metodologia_id: 1, // 1 - LIRAa, 2 - PNCD
        objetivo_id: 1, // 1 - LI, 2 - LI+T
        municipio_id: 2, // 1 - Simão Dias, 2 - Aracaju
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        abrangencia: 1, // 1 - Localidade, 2 - Zona, 3 - Quarteirão
        situacao: 2, // 1 - Aguadando Planejamento, 2 - Em aberto, 3 - Concluída
        fl_todos_imoveis: true,
        objetivo_atividade: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ciclo_id: 3,
        responsabilidade: 1,
        metodologia_id: 2, // 1 - LIRAa, 2 - PNCD
        objetivo_id: 2, // 1 - LI, 2 - LI+T
        municipio_id: 2, // 1 - Simão Dias, 2 - Aracaju
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'atividades', null, {});
  }
};