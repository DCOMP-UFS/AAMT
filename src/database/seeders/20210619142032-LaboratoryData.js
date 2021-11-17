'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'laboratorios', [
      /*
      {
        id:1,
        nome: "lab1",
        endereco: "rua foo, bairro bar, 320",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id:2,
        nome: "lab2",
        endereco: "rua foo, bairro bar, 360",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id:3,
        nome: "lab3",
        endereco: "rua foo, bairro bar, 420",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id:4,
        nome: "lab4",
        endereco: "rua foo, bairro bar, 710",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id:5,
        nome: "lab5",
        endereco: "rua foo, bairro bar, 1225",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id:6,
        nome: "lab6",
        endereco: "rua foo, bairro bar, 2350",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id:7,
        nome: "lab7",
        endereco: "rua foo, bairro bar, 15",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      */
      {
        cnpj:821,
        nome: "lab8",
        endereco: "rua foo, bairro bar, 133",
        municipio_id: 2,
        tipo_laboratorio: 'privado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj:933,
        nome: "lab9",
        endereco: "rua foo, bairro bar, 97",
        municipio_id: 3,
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'laboratorios', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};