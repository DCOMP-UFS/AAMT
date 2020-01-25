const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');

const connection = new Sequelize(dbConfig);

Usuario.init( connection );
Municipio.init( connection );

Usuario.associate( connection.models );
Municipio.associate( connection.models );

module.exports = connection;