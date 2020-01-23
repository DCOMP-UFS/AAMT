const express = require('express');
const cors = require('cors');
require('./database');

const app = express();

app.use( cors() );
app.use( express.json() );

require('./controllers/AuthController')(app);
require('./controllers/UsuarioController')(app);

app.listen(3333);