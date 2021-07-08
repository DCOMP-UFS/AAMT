const express = require('express');
const router = express.Router();
const faker = require( 'faker' );

version = async (req, res) => {
  const faker = require( 'faker' );
  res.send({ 
    name: 'API AAMT',
    description: 'support application to combat endemic diseases',
    version: 'v1.20210322',
    hora_entrada: faker.datatype.datetime().toLocaleTimeString( 'pt-BR' )
  });
}

router.get('/', version);

module.exports = app => app.use('/', router);