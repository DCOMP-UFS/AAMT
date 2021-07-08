'use strict';
const { datatype } = require('faker');
const faker = require( 'faker' );

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    let data                = [];
    const situacao_vistoria = [ 'N', 'R' ],
          pendencia         = [ 'F', 'R', null ];
    
    // Vistorias de Simão dias
    for( let i = 1; i <= 100; i++ ) {
      data.push({
        situacao_vistoria: situacao_vistoria[ faker.datatype.number( { max: 1, min: 0 } ) ], // N ou R
        pendencia: pendencia[ faker.datatype.number( { max: 2, min: 0 } ) ], // F ou R
        hora_entrada: faker.datatype.datetime().toLocaleTimeString( 'pt-BR' ),
        sequencia: i,
        justificativa: faker.lorem.words( 5 ),
        imovel_id: faker.datatype.number( { max: 88, min: 1 } ),
        trabalho_diario_id: faker.datatype.number( { max: 60, min: 1 } ),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    // Vistorias de Aracaju
    for( let i = 1; i <= 100; i++ ) {
      data.push({
        situacao_vistoria: situacao_vistoria[ faker.datatype.number( { max: 1, min: 0 } ) ], // N ou R
        pendencia: pendencia[ faker.datatype.number( { max: 1, min: 0 } ) ], // F ou R
        hora_entrada: faker.datatype.datetime().toLocaleTimeString( 'pt-BR' ),
        sequencia: i,
        justificativa: faker.lorem.words( 5 ),
        imovel_id: faker.datatype.number( { max: 126, min: 89 } ),
        trabalho_diario_id: faker.datatype.number( { max: 120, min: 61 } ),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert( 'vistorias', data, {} );
  },

  down: ( queryInterface, Sequelize ) => {
    return queryInterface.bulkDelete( 'vistorias', null, {} );
  }
};
