'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'laboratorios', [
      {
        cnpj: 78453081000172,
        nome: "Lab 1",
        endereco: "Rua foo, Bairro bar, 320",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 29610703000113,
        nome: "Lab 2",
        endereco: "Rua foo, Bairro bar, 360",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 15030150000115,
        nome: "Lab 3",
        endereco: "Rua foo, Bairro bar, 420",
        tipo_laboratorio: 'privado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 33617595000188,
        nome: "Lab 4 ",
        endereco: "Rua foo, Bairro bar, 710",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 28463728000179,
        nome: "Lab 5",
        endereco: "Rua foo, Bairro bar, 1225",
        tipo_laboratorio: 'privado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 14374767000131,
        nome: "Lab 6",
        endereco: "Rua foo, Bairro bar, 2350",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 99113312000179,
        nome: "Lab 7",
        endereco: "Rua foo, Bairro bar, 15",
        tipo_laboratorio: 'sede',
        created_at: new Date(),
        updated_at: new Date()
      },
      
      {
        cnpj: 92037785000195,
        nome: "Lab 8",
        endereco: "Rua foo, Bairro bar, 133",
        tipo_laboratorio: 'privado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cnpj: 42469396000160,
        nome: "Lab 9",
        endereco: "Rua foo, Bairro bar, 97",
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