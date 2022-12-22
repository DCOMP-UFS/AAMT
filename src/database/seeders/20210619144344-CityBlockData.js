'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'quarteiroes', [
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 8, // CENTRO - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 8, // CENTRO - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 8, // CENTRO - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 8, // CENTRO - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 8, // CENTRO - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 8, // CENTRO - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 42, // SÃO JOSÉ - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 42, // SÃO JOSÉ - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 42, // SÃO JOSÉ - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 42, // SÃO JOSÉ - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 42, // SÃO JOSÉ - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 42, // SÃO JOSÉ - ARACAJU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'quarteiroes', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
