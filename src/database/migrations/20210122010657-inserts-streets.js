'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'ruas', [
      {
        nome: 'Rua Pastinho A',
        cep: '49480-000',
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Pastinho B',
        cep: '49480-000',
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Pastinho C',
        cep: '49480-000',
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Pastinho D',
        cep: '49480-000',
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Pastinho E',
        cep: '49480-000',
        localidade_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Triunfo A',
        cep: '49480-000',
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Triunfo B',
        cep: '49480-000',
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Triunfo C',
        cep: '49480-000',
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Triunfo D',
        cep: '49480-000',
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Triunfo E',
        cep: '49480-000',
        localidade_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Feirinha A',
        cep: '49480-000',
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Feirinha B',
        cep: '49480-000',
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Feirinha C',
        cep: '49480-000',
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Feirinha D',
        cep: '49480-000',
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Feirinha E',
        cep: '49480-000',
        localidade_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Mata do Peru A',
        cep: '49480-000',
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Mata do Peru B',
        cep: '49480-000',
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Mata do Peru C',
        cep: '49480-000',
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Mata do Peru D',
        cep: '49480-000',
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Mata do Peru E',
        cep: '49480-000',
        localidade_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Av. José Carlos Silva',//21
        cep: '49042-190',
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Eduardo Dantas do Espírito Santo',//22
        cep: '49042-140',
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Central Quatro',//23
        cep: '49042-256',
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua José Araújo Neto',//24
        cep: '49042-250',
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Central Três',//25
        cep: '49042-253',
        localidade_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Cel. Manoel Machado dos Santos',
        cep: '49030-180',
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Tv. B Três',
        cep: '68703-105',
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Hamilton Lopes Galvão',
        cep: '49030-370',
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua José Cunha Alcântara',
        cep: '49030-480',
        localidade_id: 11,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Rua Profa. Ivani da Glória Freire',
        cep: '49030-660',
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
