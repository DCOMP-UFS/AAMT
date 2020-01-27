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

app.listen(3333);