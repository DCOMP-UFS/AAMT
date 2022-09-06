'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

//faker.address.zipCode(),

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'ruas', [
      {
        nome: faker.address.streetName(),
        cep: "49000-173",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-179",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-188",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-194",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-197",
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-200",
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-203",
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-209",
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-212",
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-215",
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-221",
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-224",
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-227",
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-230",
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-236",
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-270",
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-296",
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-302",
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-323",
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-384",
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-387",
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-399",
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-447",
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-456",
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-459",
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-462",
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-471",
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-477",
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-480",
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.streetName(),
        cep: "49000-483",
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
