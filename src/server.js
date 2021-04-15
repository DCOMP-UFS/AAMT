const express = require('express');
const cors = require('cors');
require('./database');

const app = express();

app.use( cors() );
app.use( express.json() );

require('./controllers/AmostraController')(app);
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
require('./controllers/RuaController')(app);
require('./controllers/QuarteiraoController')(app);
require('./controllers/ImovelController')(app);
require('./controllers/MetodologiaController')(app);
require('./controllers/CicloController')(app);
require('./controllers/AtividadeController')(app);
require('./controllers/EquipesController')(app);
require('./controllers/RotasController')(app);
require('./controllers/VistoriaController')(app);
require('./controllers/TrabalhoDiarioController')(app);
require('./controllers/RelatorioController')(app);

app.listen( process.env.PORT || 3333 );