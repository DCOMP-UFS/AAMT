'use strict';
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Coordenador Geral',
        cpf: '000.000.000-00',
        rg: '0.000.000-0',
        email: 'coordGeral@aamt.com',
        usuario: 'coordGeral',
        senha: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Coordenador',
        cpf: '000.000.000-01',
        rg: '0.000.000-1',
        email: 'coord@aamt.com',
        usuario: 'coord',
        senha: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Supervisor',
        cpf: '000.000.000-02',
        rg: '0.000.000-2',
        email: 'sup@aamt.com',
        usuario: 'sup',
        senha: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Agente',
        cpf: '000.000.000-03',
        rg: '0.000.000-3',
        email: 'agente@aamt.com',
        usuario: 'agente',
        senha: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Agente',
        cpf: '000.000.000-04',
        rg: '0.000.000-4',
        email: 'lab@aamt.com',
        usuario: 'lab',
        senha: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};