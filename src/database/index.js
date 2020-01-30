const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');
const Categoria = require('../models/Categoria');
const Localidade = require('../models/Localidade');

const connection = new Sequelize(dbConfig);

Usuario.init( connection );
Municipio.init( connection );
Categoria.init( connection );
Localidade.init( connection );

Usuario.associate( connection.models );
Municipio.associate( connection.models );
Categoria.associate( connection.models );
Localidade.associate( connection.models );

module.exports = connection;