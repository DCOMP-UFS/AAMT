'use strict';
const { Op } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categorias', [
      {
        nome: 'Rural',
        descricao: 'Região não urbanizada, destinada a atividades da agricultura e pecuária, extrativismo, turismo rural, silvicultura ou conservação ambiental',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Urbana',
        descricao: 'Espaço ocupado por uma cidade, caracterizado pela edificação contínua e pela existência de infraestrutura urbana, que compreende ao conjunto de serviços públicos que possibilitam a vida da população',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Terra indígena',
        descricao: 'Porção do território nacional, de propriedade da União, habitada por um ou mais povos indígenas',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorias', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
