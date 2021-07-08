'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'localidades', [
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 1,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: faker.datatype.number({ min: 1, max: 3 }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: faker.address.county(),
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
