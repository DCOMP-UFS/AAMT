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
import Atividades from './pages/atividade/cadastrar';
import AtividadesConsultar from './pages/atividade';
import PlanejarAtividade from './pages/atividade/planejar';
import Usuarios from './pages/Usuarios';
import EditarUsuario from './pages/Usuarios/EditarUsuario';
import Municipios from './pages/Municipios';
import EditarMunicipio from './pages/Municipios/EditarMunicipio';
import Localidades from './pages/Localidades';
import EditarLocalidade from './pages/Localidades/EditarLocalidade';
import Zonas from './pages/Zonas';
import EditarZona from './pages/Zonas/EditarZona';
import Quarteiroes from './pages/Quarteiroes';
import EditarQuarteirao from './pages/Quarteiroes/EditarQuarteirao';
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

const Routes = props => {
  const perfil = props.usuario.tipoPerfil.sigla;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />

        {/* Rotas de coordenador */}
        <PrivateCoordenador path="/trabalho_diario/iniciar" component={CDT_Trabalho_diario} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/trabalho_diario/vistoria/lista" component={ListaVistoria} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/trabalho_diario/vistoria/formulario" component={FormVistoria} tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/atividades" component={ AtividadesConsultar } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/atividades/cadastrar" component={ Atividades } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/atividades/planejamento/:id" component={ PlanejarAtividade } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/usuarios" component={ Usuarios } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/usuarios/:id" component={ EditarUsuario } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/municipios" component={Municipios} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/municipios/:id" component={ EditarMunicipio } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/zonas" component={Zonas} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/zonas/:id" component={ EditarZona } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/quarteiroes" component={ Quarteiroes } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/quarteiroes/:id" component={ EditarQuarteirao } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/localidades" component={Localidades} tipoPerfil={ perfil } />
        {/* <PrivateCoordenador path="/localidades/:index" component={ props => (<h1>{ props.match.params.index }</h1>)} tipoPerfil={ perfil } /> */}
        <PrivateCoordenador path="/localidades/:id" component={ EditarLocalidade} tipoPerfil={ perfil } />

        {/* Rotas de laboratorialista */}
        <PrivateLaboratorio path="/lab/home" component={ HomeLaboratorio } tipoPerfil={ perfil } />

        <PrivateCoordenador path="/elementos/tipografia" component={Typography} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/elementos/formulario" component={Form} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/elementos/botoes" component={ViewButton} tipoPerfil={ perfil } />

        <Route exact path="*" component={() => <h1>Página não encontrada</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  usuario: state.usuario.usuario
});

export default connect(
  mapStateToProps,
)(Routes);

