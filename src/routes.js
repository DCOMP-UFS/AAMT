import React, { Fragment } from 'react';
import isAuthenticated from './auth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BodyPanel, ContainerBody } from './styles/global';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Typography from './pages/elements/typography';
import Form from './pages/elements/Form';
import ViewButton from './pages/elements/ViewButton';
import Login from './pages/login';
import CDT_Atividade from './pages/atividade/cadastrar';
import CDT_Trabalho_diario from './pages/trabalho_diario/Iniciar';
import ListaVistoria from './pages/trabalho_diario/ListaVistoria';
import FormVistoria from './pages/trabalho_diario/Form';
// import Product from './pages/product';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={ props => (
    isAuthenticated() ? (
      <Fragment>
        <Header />

        <ContainerBody>
          <Sidebar />

          <BodyPanel className={ props.navToggle ? "body-collapse" : "" }>
            <Component { ...props } />
          </BodyPanel>
        </ContainerBody>
      </Fragment>
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  )} />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={Main} /> */}
      {/* <Route path="/products/:id" component={Product} /> */}
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/elementos/tipografia" component={Typography} />
      <PrivateRoute path="/elementos/formulario" component={Form} />
      <PrivateRoute path="/elementos/botoes" component={ViewButton} />
      <PrivateRoute path="/atividade/cadastrar" component={CDT_Atividade} />
      <PrivateRoute path="/trabalho_diario/iniciar" component={CDT_Trabalho_diario} />
      <PrivateRoute path="/trabalho_diario/vistoria/lista" component={ListaVistoria} />
      <PrivateRoute path="/trabalho_diario/vistoria/formulario" component={FormVistoria} />
      <Route exact path="*" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes;
