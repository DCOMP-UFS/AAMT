'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'laboratorios', [
      {
        cnpj: 102,
        nome: "lab1",
        endereco: "rua foo, bairro bar, 320",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 1213,
        nome: "lab2",
        endereco: "rua foo, bairro bar, 360",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 3198,
        nome: "lab3",
        endereco: "rua foo, bairro bar, 420",
        tipo_laboratorio: 'privado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 1094,
        nome: "lab4",
        endereco: "rua foo, bairro bar, 710",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 872,
        nome: "lab5",
        endereco: "rua foo, bairro bar, 1225",
        tipo_laboratorio: 'privado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 297,
        nome: "lab6",
        endereco: "rua foo, bairro bar, 2350",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 446,
        nome: "lab7",
        endereco: "rua foo, bairro bar, 15",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      
      {
        cnpj:821,
        nome: "lab8",
        endereco: "rua foo, bairro bar, 133",
        tipo_laboratorio: 'privado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj:933,
        nome: "lab9",
        endereco: "rua foo, bairro bar, 97",
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