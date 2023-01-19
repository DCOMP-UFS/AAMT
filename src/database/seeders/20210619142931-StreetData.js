'use strict';
const { Op }  = require( 'sequelize' );
const faker   = require( 'faker' );
const fs = require('fs');
const readline = require('readline');

//faker.address.zipCode(),

var ruas = []

//Busca as ruas de aracaju continda no arquivo ruas.txt
async function getRuasAracaju() {
  const rl = readline.createInterface({
    input: fs.createReadStream("arquivosRuas/ruasAracaju.txt"),
    crlfDelay: Infinity,
  });
  rl.on('line', (line) => {
    const linhaInfo = line.split("\t")
    const dadosRuas = { 
      nome: linhaInfo[3],
      cep: linhaInfo[0],
      municipio_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }
    ruas.push(dadosRuas)
  });

  await new Promise((res) => rl.once('close', res));
}

//Busca as ruas de itabaiana contida no arquivo ruas.txt
async function getRuasItabaiana() {
  const rl = readline.createInterface({
    input: fs.createReadStream("arquivosRuas/ruasItabaiana.txt"),
    crlfDelay: Infinity,
  });
  rl.on('line', (line) => {
    const linhaInfo = line.split("\t")
    const dadosRuas = { 
      nome: linhaInfo[3],
      cep: linhaInfo[0],
      municipio_id: 4,
      created_at: new Date(),
      updated_at: new Date()
    }
    ruas.push(dadosRuas)
  });

  await new Promise((res) => rl.once('close', res));
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await getRuasAracaju()
    //await getRuasItabaiana()
    return queryInterface.bulkInsert( 'ruas', ruas);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'ruas', {
      id: {
        [Op.gt]: 0
      }
    });
  }
};
