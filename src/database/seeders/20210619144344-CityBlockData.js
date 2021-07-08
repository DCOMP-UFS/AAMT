'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'quarteiroes', [
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 1, // PASTINHO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 1, // PASTINHO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 2, // TRIUNFO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 2, // TRIUNFO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 3, // FEIRINHA
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 3, // FEIRINHA
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 4, // MATA DO PERU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 4, // MATA DO PERU
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 10, // SÃO CONRADO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 10, // SÃO CONRADO
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 11, // FAROLÂNDIA
        zona_id: null,
        quarteirao_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: faker.datatype.number({ max: 999, min: 1 }),
        ativo: 1,
        localidade_id: 11, // FAROLÂNDIA
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
