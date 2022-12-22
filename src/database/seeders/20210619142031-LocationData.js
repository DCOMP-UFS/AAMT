'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );

//faker.address.county()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'localidades', [
      //------------------------------ARACAJU------------------------------------------------
      {
        nome: "Aeroporto",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "América",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Areia Branca",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Aruana",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Atalaia",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Bugio",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Capucho",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Centro",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Cidade Nova",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Cirurgia",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Coroa do Meio",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Dezessete de Março",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Dezoito do Forte",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Farolândia",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Getúlio Vargas",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Grageru",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Industrial",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Inácio Barbosa",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Jabotiana",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Japãozinho",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Jardim Centenário",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Jardins",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "José Conrado de Araújo",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Lamarão",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Luzia",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Mosqueiro",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Novo Paraíso",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Olaria",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Palestina",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Pereira Lobo",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Ponto Novo",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Porto D'Antas",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Robalo",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Salgado Filho",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Santa Maria",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Santo Antônio",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Santos Dumont",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Siqueira Campos",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Soledade",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Suíssa",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "São Conrado",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "São José",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Treze de Julho",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 2,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      //------------------------------ITABAIANA------------------------------------------------

      {
        nome: "Anízio Amancio de Oliveira",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Área Rural de Itabaiana",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Bananeiras",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Doutor José Milton Machado",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Mamede Paes Mendonça",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Marcela",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Marianga",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Miguel Teles de Mendonça",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Oviedo Teixeira",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Porto",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Queimadas",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Riacho Doce",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Rotary Club de Itabaiana",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "Serrano",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
        categoria_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "São Cristovão",
        codigo: faker.datatype.number({ min: 1, max: 9999 }),
        ativo: 1,
        municipio_id: 4,
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
