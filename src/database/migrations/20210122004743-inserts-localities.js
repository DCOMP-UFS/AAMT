'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'localidades', [
      {
        nome: 'PASTINHO',
        codigo: 2,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'TRIUNFO',
        codigo: 3,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'FEIRINHA',
        codigo: 4,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'MATA DO PERU',
        codigo: 5,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'SACO GRANDE',
        codigo: 6,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'CACHIMBO',
        codigo: 7,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'CARAIBA DE BAIXO',
        codigo: 8,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'SALOBRA',
        codigo: 9,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'LAGOA SECA',
        codigo: 10,
        ativo: 1,
        municipio_id: 1,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'SÃO CONRADO',
        codigo: 1,
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'FAROLÂNDIA',
        codigo: 2,
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'SANTA MARIA',
        codigo: 3,
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'OLARIA',
        codigo: 3,
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
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
