'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data        = [];
    let amount      = 30;
    let cicle_open  = '2021-07-02';
    let date        = new Date( cicle_open );

    // LIRAa Simão Dias
    while( amount-- ) {
      while( date.getDay() == 5 || date.getDay() == 6 )
        date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );

      data.push({
        data: date,
        hora_inicio: '08:00:00',
        hora_fim: '18:00:00',
        supervisor_id: 3,
        usuario_id: 4,
        equipe_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      });

      date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );
    }

    date    = new Date( cicle_open );
    amount  = 30;
    // PNCD Simão Dias
    while( amount-- ) {
      while( date.getDay() == 5 || date.getDay() == 6 )
        date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );

      data.push({
        data: date,
        hora_inicio: '08:00:00',
        hora_fim: '18:00:00',
        supervisor_id: 3,
        usuario_id: 4,
        equipe_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      });

      date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );
    }

    date    = new Date( cicle_open );
    amount  = 30;
    // LIRAa Simão Dias
    while( amount-- ) {
      while( date.getDay() == 5 || date.getDay() == 6 )
        date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );

      data.push({
        data: date,
        hora_inicio: '08:00:00',
        hora_fim: '18:00:00',
        supervisor_id: 3,
        usuario_id: 10,
        equipe_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      });

      date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );
    }

    date    = new Date( cicle_open );
    amount  = 30;
    // PNCD Simão Dias
    while( amount-- ) {
      while( date.getDay() == 5 || date.getDay() == 6 )
        date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );

      data.push({
        data: date,
        hora_inicio: '08:00:00',
        hora_fim: '18:00:00',
        supervisor_id: 3,
        usuario_id: 10,
        equipe_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      });

      date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );
    }

    date    = new Date( '2021-05-02' );
    amount  = 30;
    // LIRAa Aracaju
    while( amount-- ) {
      while( date.getDay() == 5 || date.getDay() == 6 )
        date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );

      data.push({
        data: date,
        hora_inicio: '08:00:00',
        hora_fim: '18:00:00',
        supervisor_id: 7,
        usuario_id: 8,
        equipe_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      });

      date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );
    }

    date    = new Date( '2021-05-02' );
    amount  = 30;
    // PNCD Aracaju
    while( amount-- ) {
      while( date.getDay() == 5 || date.getDay() == 6 )
        date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );

      data.push({
        data: date,
        hora_inicio: '08:00:00',
        hora_fim: '18:00:00',
        supervisor_id: 7,
        usuario_id: 8,
        equipe_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      });

      date = new Date( date.getTime() + 1000 * 60 * 60 * 24 );
    }

    return queryInterface.bulkInsert( 'trabalhos_diarios', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'trabalhos_diarios', null, {});
  }
};
