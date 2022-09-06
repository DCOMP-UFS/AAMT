'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

//faker.address.county()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'localidades', [
      {
        nome: "Avon",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Berkshire",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Cambridge",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Borders",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Verol",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Kharkiv",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Kie",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Bedfrov",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Harv",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Avon",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Borders",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Kie",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Mosq",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'localidades', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
