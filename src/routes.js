import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Typography from './pages/elements/typography';
import Form from './pages/elements/Form';
import ViewButton from './pages/elements/ViewButton';
import Login from './pages/login';
import CDT_Atividade from './pages/atividade/cadastrar';
import CDT_Trabalho_diario from './pages/trabalho_diario/Iniciar';
import Vistoria from './pages/trabalho_diario/Vistoria';
import ListaVistoria from './pages/trabalho_diario/ListaVistoria';
import FormVistoria from './pages/trabalho_diario/Form';
// import Product from './pages/product';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={Main} /> */}
      {/* <Route path="/products/:id" component={Product} /> */}
      <Route exact path="/" component={Login} />
      <Route path="/elementos/tipografia" component={Typography} />
      <Route path="/elementos/formulario" component={Form} />
      <Route path="/elementos/botoes" component={ViewButton} />
      <Route path="/atividade/cadastrar" component={CDT_Atividade} />
      <Route path="/trabalho_diario/iniciar" component={CDT_Trabalho_diario} />
      <Route exact path="/trabalho_diario/vistoria" component={Vistoria} />
      <Route path="/trabalho_diario/vistoria/lista" component={ListaVistoria} />
      <Route path="/trabalho_diario/vistoria/formulario" component={FormVistoria} />
      <Route exact path="*" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes;
