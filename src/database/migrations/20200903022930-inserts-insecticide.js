'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inseticidas', [
      {
        nome: "TEMEPHÓS",
        sigla: "T",
        tipo: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "BTI-G",
        sigla: "B",
        tipo: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "BTI-WDG",
        sigla: "BW",
        tipo: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "METHOPRENE",
        sigla: "M",
        tipo: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "PYRIPROXFEN",
        sigla: "P",
        tipo: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "DIFLUBENZURON",
        sigla: "D",
        tipo: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "CYPERMETRINA PM 40",
        sigla: "01",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "CYPERMETRINA PM 31,25",
        sigla: "02",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "CYPERMETRINA PM 30",
        sigla: "03",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "CYPERMETRINA PM 20",
        sigla: "04",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "CYFLUTRINA PM 10",
        sigla: "05",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "LAMBDACYA LOTRINA PM 10",
        sigla: "06",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "DELTRAMETRINA SC 5",
        sigla: "07",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: "ALFACYPERMETRINA SC 20",
        sigla: "08",
        tipo: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'inseticidas', null, {});
  }
};
