const express = require('express');
require('./database');

const app = express();

app.use(express.json());

require('./controllers/TesteController')(app);
require('./controllers/AuthController')(app);
require('./controllers/UsuarioController')(app);

app.listen(3001);