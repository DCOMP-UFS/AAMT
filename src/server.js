const express = require('express');
const cors = require('cors');
require('./database');

const app = express();

app.use( cors() );
app.use( express.json() );

require('./controllers/AuthController')(app);
require('./controllers/UsuarioController')(app);
require('./controllers/MunicipioController')(app);
require('./controllers/ConfigController')(app);
require('./controllers/CategoriaController')(app);
require('./controllers/LocalidadeController')(app);
require('./controllers/ZonaController')(app);
require('./controllers/PaisController')(app);
require('./controllers/RegiaoController')(app);
require('./controllers/EstadoController')(app);
require('./controllers/RegionalSaudeController')(app);

app.listen( process.env.PORT || 3333 );