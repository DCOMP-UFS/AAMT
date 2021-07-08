'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'ruas', [
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: faker.address.zipCode(),
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'ruas', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
