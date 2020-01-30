import React, { Fragment } from 'react';
import { isAuthenticated } from './auth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SidebarLab from './components/Sidebar/SidebarLab';
import ButtonMenu from './components/Sidebar/ButtonMenu';
import { BodyPanel, ContainerBody } from './styles/global';
import { connect } from 'react-redux';
import { perfil } from './config/enumerate';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import Login from './pages/Login';
import LoginScreen from './pages/LoginScreen';

// Páginas de coordenador
import CDT_Atividade from './pages/atividade/cadastrar';
import Usuarios from './pages/Usuarios';
import Municipios from './pages/Municipios';
import CDT_Trabalho_diario from './pages/trabalho_diario/Iniciar';
import ListaVistoria from './pages/trabalho_diario/ListaVistoria';
import FormVistoria from './pages/trabalho_diario/Form';

// Páginas de laboratorialista
import HomeLaboratorio from './pages/laboratorio/HomeLaboratorio';

import Form from './pages/elements/Form';
import ViewButton from './pages/elements/ViewButton';
import Typography from './pages/elements/typography';

const PrivateCoordenador = ({ component: Component, tipoPerfil: perfilUser, ...rest }) => (
  <Route { ...rest } render={ props => (
    isAuthenticated() && perfilUser === perfil.coordenador ? (
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

const PrivateLaboratorio = ({ component: Component, perfil: perfilUser, ...rest }) => (
  <Route { ...rest } render={ props => (
    isAuthenticated() && perfilUser === perfil[0] ? (
      <Fragment>
        <ButtonMenu />
        <SidebarLab />

        <Component { ...props } />
      </Fragment>
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  ) } />
)

const Routes = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginScreen } />

      {/* Rotas de coordenador */}
      <PrivateCoordenador path="/trabalho_diario/iniciar" component={CDT_Trabalho_diario} tipoPerfil={ props.usuario.tipoPerfil } />
      <PrivateCoordenador path="/trabalho_diario/vistoria/lista" component={ListaVistoria} tipoPerfil={ props.usuario.tipoPerfil } />
      <PrivateCoordenador path="/trabalho_diario/vistoria/formulario" component={FormVistoria} tipoPerfil={ props.usuario.tipoPerfil } />
      <PrivateCoordenador path="/atividades/cadastrar" component={CDT_Atividade} tipoPerfil={ props.usuario.tipoPerfil } />
      <PrivateCoordenador path="/usuarios" component={Usuarios} tipoPerfil={ props.usuario.tipoPerfil } />
      <PrivateCoordenador path="/municipios" component={Municipios} tipoPerfil={ props.usuario.tipoPerfil } />

      {/* Rotas de laboratorialista */}
      <PrivateLaboratorio path="/lab/home" component={ HomeLaboratorio } tipoPerfil={ props.usuario.tipoPerfil } />

      <PrivateCoordenador path="/elementos/tipografia" component={Typography} tipoPerfil={ props.usuario.tipoPerfil } />
      <PrivateCoordenador path="/elementos/formulario" component={Form} tipoPerfil={ props.usuario.tipoPerfil } />
      <PrivateCoordenador path="/elementos/botoes" component={ViewButton} tipoPerfil={ props.usuario.tipoPerfil } />

      <Route exact path="*" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>
)

const mapStateToProps = state => ({
  usuario: state.usuario.usuario
});

export default connect(
  mapStateToProps,
)(Routes);

