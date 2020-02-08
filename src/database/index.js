const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Municipio = require('../models/Municipio');
const Categoria = require('../models/Categoria');
const Localidade = require('../models/Localidade');
const Zona = require('../models/Zona');
const Quarteirao = require('../models/Quarteirao');
const Pais = require('../models/Pais');
const Regiao = require('../models/Regiao');
const Estado = require('../models/Estado');
const RegionalSaude = require('../models/RegionalSaude');

const connection = new Sequelize(dbConfig);

Usuario.init( connection );
Municipio.init( connection );
Categoria.init( connection );
Localidade.init( connection );
Zona.init( connection );
Quarteirao.init( connection );
Pais.init( connection );
Regiao.init( connection );
Estado.init( connection );
RegionalSaude.init( connection );

Usuario.associate( connection.models );
Municipio.associate( connection.models );
Categoria.associate( connection.models );
Localidade.associate( connection.models );
Zona.associate( connection.models );
Quarteirao.associate( connection.models );
Pais.associate( connection.models );
Regiao.associate( connection.models );
Estado.associate( connection.models );
RegionalSaude.associate( connection.models );

module.exports = connection;