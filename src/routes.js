import React, { Fragment } from 'react';
import { isAuthenticated } from './auth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SidebarCoordGeral from './components/Sidebar/SidebarCoordGeral';
import SidebarLab from './components/Sidebar/SidebarLab';
import SidebarSupervisor from './components/Sidebar/SidebarSupervisor';
import ButtonMenu from './components/Sidebar/ButtonMenu';
import { BodyPanel, ContainerBody } from './styles/global';
import { connect } from 'react-redux';
import { perfil } from './config/enumerate';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import Login from './pages/Login';
import LoginScreen from './pages/LoginScreen';

// Páginas de coordenador Geral
import Home from './pages/coordenador_geral';
import CGAtividadesConsultar from './pages/coordenador_geral/atividade';
import DashBoardCiclo from './pages/coordenador_geral/Ciclos/dashboard';
import CGCicloConsultar from './pages/coordenador_geral/Ciclos';
import CGCicloCadastrar from './pages/coordenador_geral/Ciclos/cadastrar';
import CGAtividades from './pages/coordenador_geral/atividade/cadastrar';
import CGPlanejarAtividade from './pages/coordenador_geral/atividade/planejar';
import CGUsuarios from './pages/coordenador_geral/Usuarios';
import CGEditarUsuario from './pages/coordenador_geral/Usuarios/EditarUsuario';
import CGMunicipios from './pages/coordenador_geral/Municipios';
import CGEditarMunicipio from './pages/coordenador_geral/Municipios/EditarMunicipio';

// Páginas de coordenador
import AtividadesConsultar from './pages/coordenador/atividade';
import Atividades from './pages/coordenador/atividade/cadastrar';
import PlanejarAtividade from './pages/coordenador/atividade/planejar';
import Usuarios from './pages/coordenador/Usuarios';
import EditarUsuario from './pages/coordenador/Usuarios/EditarUsuario';
import Localidades from './pages/coordenador/Localidades';
import EditarLocalidade from './pages/coordenador/Localidades/EditarLocalidade';
import Zonas from './pages/coordenador/Zonas';
import EditarZona from './pages/coordenador/Zonas/EditarZona';

// Páginas do supervisor
import Quarteiroes from './pages/supervisor/Quarteiroes';
import EditarQuarteirao from './pages/supervisor/Quarteiroes/EditarQuarteirao';

// Páginas do agente
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
    isAuthenticated() && perfilUser === perfil.coordenador.id ? (
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
);

const PrivateLaboratorio = ({ component: Component, perfil: perfilUser, ...rest }) => (
  <Route { ...rest } render={ props => (
    isAuthenticated() && perfilUser === perfil.laboratorista.id? (
      <Fragment>
        <ButtonMenu />
        <SidebarLab />

        <Component { ...props } />
      </Fragment>
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  ) } />
);

const PrivateCoordenadorGeral = ({ component: Component, tipoPerfil: perfilUser, ...rest }) => (
  <Route { ...rest } render={ props => (
    isAuthenticated() && perfilUser === perfil.coordenadorGeral.id ? (
      <Fragment>
        <Header />

        <ContainerBody>
          <SidebarCoordGeral />

          <BodyPanel className={ props.navToggle ? "body-collapse" : "" }>
            <Component { ...props } />
          </BodyPanel>
        </ContainerBody>
      </Fragment>
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  )} />
);

const PrivateSupervisor = ({ component: Component, tipoPerfil: perfilUser, ...rest }) => (
  <Route { ...rest } render={ props => (
    isAuthenticated() && perfilUser === perfil.supervisor.id ? (
      <Fragment>
        <Header />

        <ContainerBody>
          <SidebarSupervisor />

          <BodyPanel className={ props.navToggle ? "body-collapse" : "" }>
            <Component { ...props } />
          </BodyPanel>
        </ContainerBody>
      </Fragment>
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  )} />
);

const Routes = props => {
  const perfil = props.usuario.atuacoes[0].tipoPerfil;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />

        {/* Rotas de coordenador geral */}
        <PrivateCoordenadorGeral path="/cg/home" component={ Home } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral exact path="/cg/ciclos" component={ DashBoardCiclo } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral exact path="/cg/ciclos/consultar" component={ CGCicloConsultar } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral path="/cg/ciclos/cadastrar" component={ CGCicloCadastrar } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral exact path="/cg/atividades" component={ CGAtividadesConsultar } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral path="/cg/atividades/cadastrar" component={ CGAtividades } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral path="/cg/atividades/planejamento/:id" component={ CGPlanejarAtividade } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral exact path="/cg/municipios" component={ CGMunicipios } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral path="/cg/municipios/:id" component={ CGEditarMunicipio } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral exact path="/cg/usuarios" component={ CGUsuarios } tipoPerfil={ perfil } />
        <PrivateCoordenadorGeral path="/cg/usuarios/:id" component={ CGEditarUsuario } tipoPerfil={ perfil } />
        {/* Rotas de coordenador geral */}

        {/* Rotas de coordenador */}
        <PrivateCoordenador exact path="/coord/atividades" component={ AtividadesConsultar } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/coord/atividades/cadastrar" component={ Atividades } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/coord/atividades/planejamento/:id" component={ PlanejarAtividade } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/coord/usuarios" component={ Usuarios } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/coord/usuarios/:id" component={ EditarUsuario } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/coord/zonas" component={ Zonas } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/coord/zonas/:id" component={ EditarZona } tipoPerfil={ perfil } />
        <PrivateCoordenador exact path="/coord/localidades" component={ Localidades } tipoPerfil={ perfil } />
        <PrivateCoordenador path="/coord/localidades/:id" component={ EditarLocalidade } tipoPerfil={ perfil } />

        {/* Rotas de supervisor */}
        <PrivateSupervisor exact path="/sup/quarteiroes" component={ Quarteiroes } tipoPerfil={ perfil } />
        <PrivateSupervisor path="/sup/quarteiroes/:id" component={ EditarQuarteirao } tipoPerfil={ perfil } />

        {/* Rotas de agentes */}
        <PrivateCoordenador path="/trabalho_diario/iniciar" component={CDT_Trabalho_diario} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/trabalho_diario/vistoria/lista" component={ListaVistoria} tipoPerfil={ perfil } />
        <PrivateCoordenador path="/trabalho_diario/vistoria/formulario" component={FormVistoria} tipoPerfil={ perfil } />

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
  usuario: state.appConfig.usuario
});

export default connect(
  mapStateToProps,
)(Routes);

