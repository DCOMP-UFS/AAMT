'use strict';
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
      {
        nome:       'Hélder Proença Camacho',
        cpf:        '926.318.800-99',
        rg:         '50.333.064-4',
        email:      'coordGeral@aamt.com',
        usuario:    'coordGeral',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Sophie Azambuja Gaspar',
        cpf:        '036.074.580-65',
        rg:         '48.353.636-2',
        email:      'coord@aamt.com',
        usuario:    'coord',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Kyara Rufino Ávila',
        cpf:        '211.221.690-27',
        rg:         '22.046.396-7',
        email:      'sup@aamt.com',
        usuario:    'sup',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Duarte Antunes',
        cpf:        '737.086.430-89',
        rg:         '17.566.597-7',
        email:      'agente@aamt.com',
        usuario:    'agente',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Ânia Vidal Barreira',
        cpf:        '326.407.680-26',
        rg:         '45.587.920-5',
        email:      'lab@aamt.com',
        usuario:    'lab',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Kevin Salgueiro Fartaria',
        cpf:        '600.244.660-50',
        rg:         '30.809.239-9',
        email:      'coodAju@aamt.com',
        usuario:    'coodAju',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Lúcia Souto Loureiro',
        cpf:        '152.925.340-30',
        rg:         '20.144.291-7',
        email:      'supAju@aamt.com',
        usuario:    'supAju',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Sandra Gouveia Leal',
        cpf:        '150.450.210-87',
        rg:         '45.022.130-1',
        email:      'agenteAju@aamt.com',
        usuario:    'agenteAju',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Camila Frias',
        cpf:        '251.734.830-83',
        rg:         '35.547.905-9',
        email:      'labAju@aamt.com',
        usuario:    'labAju',
        senha:      bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome:       'Weslan Rezende Alves',
        cpf:        '999.111.222-01',
        rg:         '1.222.333-2',
        email:      'weslan.alves@aamt.com.br',
        usuario:    'weslan',
        senha:      bcrypt.hashSync( '123456', bcrypt.genSaltSync( 10 ) ),
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