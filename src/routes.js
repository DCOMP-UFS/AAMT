import React, { Fragment } from 'react';
import { isAuthenticated } from './auth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BodyPanel, ContainerBody } from './styles/global';
import { connect } from 'react-redux';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Tela de Login
import LoginScreen from './pages/LoginScreen';

//Tela de recuperação de senha
import EsqueceuSenha from './pages/EsqueceuSenha';

//Tela de alteração de senha
import AlterarSenha from './pages/AlterarSenha';

// Mostrar e atualizar dados do usuario logado
import MeusDados from './pages/MeusDados';

// Gerir Usuários do município
import UsuariosMunConsultar from './pages/usuariosMunicipal';
import UsuariosMunEditar from './pages/usuariosMunicipal/EditarUsuario';

// Gerir Amostras
import Amostras from './pages/Amostras';
import AmostrasLab from './pages/AmostrasLab';

// Quarteirões
import Quarteiroes from './pages/Quarteiroes';
import EditarQuarteirao from './pages/Quarteiroes/EditarQuarteirao';

// Imóveis
import Imoveis from './pages/Imoveis';

// Dashboard
import DashMunicipio from './pages/Dashboard/Municipal';
import DashRegional from './pages/Dashboard/Regional';
import DashLaboratorio from './pages/Dashboard/Laboratorio'

// Relatórios
import RelatorioDiario from './pages/Relatorio/Diario';
import VisualizarRelatorioDiario from './pages/Relatorio/Diario/visualizarRelatorio';
import RelatorioDiarioEquipe from './pages/Relatorio/DiarioEquipe';
import VisualizarDiarioEquipe from './pages/Relatorio/DiarioEquipe/visualizarRelatorio';
import RelatorioSemanal from './pages/Relatorio/Semanal';
import VisualizarSemanal from './pages/Relatorio/Semanal/visualizarRelatorio';
import RelatorioAtividade from './pages/Relatorio/Atividade';
import RelatorioAtividadeEquipe from './pages/Relatorio/AtividadeEquipe';
import VisualizarAtividadeEquipe from './pages/Relatorio/AtividadeEquipe/visualizarRelatorio';
import VisualizarRelatorioAtividade from './pages/Relatorio/Atividade/visualizarRelatorio';

// Laboratórios
import Laboratorios from './pages/laboratorios';

// Zonas
import Zonas from './pages/Zonas';
import EditarZona from './pages/Zonas/EditarZona';

// Ciclos
import CicloConsultar from './pages/ciclos';
import CicloCadastrar from './pages/ciclos/cadastrar';

// Atividades do Município
import AtividadesMunConsultar from './pages/atividadesMunicipal';
import AtividadesMunCadastrar from './pages/atividadesMunicipal/cadastrar';
import PlanejarAtividade from './pages/atividadesMunicipal/planejar';

// Atividades da Regional
import AtividadesRegConsultar from './pages/atividadesRegional';
import AtividadesRegCadastrar from './pages/atividadesRegional/cadastrar';

// Localidades
import Localidades from './pages/Localidades';
import EditarLocalidade from './pages/Localidades/EditarLocalidade';

// Usuários da Regional
import UsuariosRegConsultar from './pages/usuariosRegional';
import UsuariosRegEditar from './pages/usuariosRegional/EditarUsuario';

// Municípios
import Municipios from './pages/Municipios';
import EditarMunicipio from './pages/Municipios/EditarMunicipio';

// Ruas
import Ruas from './pages/Ruas';

// Rotas
import Rota from './pages/Rota';
import PlanejarRota from './pages/Rota/PlanejarRota';

// Vistorias
import Vistoria from './pages/Vistoria';
import CadastrarVistoria from './pages/Vistoria/cadastrar';
import RegistrarVistoria from './pages/Vistoria/registrar';
import EditarVistoria from './pages/Vistoria/editar';
import MeuBoletim from './pages/Relatorio/MeuBoletim';
import BoletimDiario from './pages/Relatorio/BoletimDiario';
import CDT_Trabalho_diario from './pages/trabalho_diario/Iniciar';
import ListaVistoria from './pages/trabalho_diario/ListaVistoria';
import FormVistoria from './pages/trabalho_diario/Form';

// Páginas de laboratorialista
//import HomeLaboratorio from './pages/laboratorio/HomeLaboratorio';

const PrivateRoute = ({ component: Component, tipoPerfil: perfilUser, ...rest }) => (
  <Route { ...rest } render={ props => (
    // isAuthenticated() && perfilUser === perfil.agente.id ? (
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
);

const Routes = props => {
  const perfil = props.usuario.atuacoes[ 0 ].tipoPerfil;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />
        <Route exact path="/esqueceuSenha" component={ EsqueceuSenha } />
        <Route path="/alterarSenha/:token" component={ AlterarSenha } />
        <PrivateRoute exact path="/meusDados" component={ MeusDados } tipoPerfil={ perfil } />
        {/* Rotas de laboratorialista */}
        

        {/* Amostras */}
        <PrivateRoute path="/amostras" component={ Amostras } tipoPerfil={ perfil } />
        <PrivateRoute path="/amostrasLab" component={ AmostrasLab } tipoPerfil={ perfil } />

        {/* Atividades do Município */}
        <PrivateRoute exact path="/atividadesMunicipal" component={ AtividadesMunConsultar } tipoPerfil={ perfil } />
        <PrivateRoute path="/atividadesMunicipal/cadastrar" component={ AtividadesMunCadastrar } tipoPerfil={ perfil } />
        <PrivateRoute path="/atividadesMunicipal/planejamento/:id" component={ PlanejarAtividade } tipoPerfil={ perfil } />

        {/* Atividades da Regional */}
        <PrivateRoute exact path="/atividadesRegional" component={ AtividadesRegConsultar } tipoPerfil={ perfil } />
        <PrivateRoute path="/atividadesRegional/cadastrar" component={ AtividadesRegCadastrar } tipoPerfil={ perfil } />

        {/* Ciclos */}
        <PrivateRoute path="/ciclos/consultar" component={ CicloConsultar } tipoPerfil={ perfil } />
        <PrivateRoute path="/ciclos/cadastrar" component={ CicloCadastrar } tipoPerfil={ perfil } />

        {/* Dashboard */}
        <PrivateRoute exact path="/dash/municipio" component={ DashMunicipio } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/dash/regional" component={ DashRegional } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/dash/laboratorio" component={ DashLaboratorio } tipoPerfil={ perfil } />

        {/* Imóveis */}
        <PrivateRoute path="/imoveis" component={ Imoveis } tipoPerfil={ perfil } />

        {/* Laboratórios */}
        <PrivateRoute path="/laboratorios" component={ Laboratorios } tipoPerfil = {perfil} />

        {/* Localidades */}
        <PrivateRoute exact path="/localidades" component={ Localidades } tipoPerfil={ perfil } />
        <PrivateRoute path="/localidades/:id" component={ EditarLocalidade } tipoPerfil={ perfil } />

        {/* Municípios */}
        <PrivateRoute exact path="/municipios" component={ Municipios } tipoPerfil={ perfil } />
        <PrivateRoute path="/municipios/:id" component={ EditarMunicipio } tipoPerfil={ perfil } />

         {/* Ruas */}
        <PrivateRoute exact path="/ruas" component={ Ruas } tipoPerfil={ perfil } />
        {/* Quarteirões */}
        <PrivateRoute exact path="/quarteiroes" component={ Quarteiroes } tipoPerfil={ perfil } />
        <PrivateRoute path="/quarteiroes/:id" component={ EditarQuarteirao } tipoPerfil={ perfil } />

        {/* Realizar Vistorias */}
        <PrivateRoute exact path="/vistoria" component={ Vistoria } tipoPerfil={ perfil } />
        <PrivateRoute path="/vistoria/cadastrar" component={ CadastrarVistoria } tipoPerfil={ perfil } />
        <PrivateRoute path="/vistoria/editar/:index" component={ EditarVistoria } tipoPerfil={ perfil } />
        <PrivateRoute path="/vistoria/registrar" component={ RegistrarVistoria } tipoPerfil={ perfil } />
        <PrivateRoute path="/relatorio/meuBoletim/" component={ MeuBoletim } tipoPerfil={ perfil } />
        <PrivateRoute path="/relatorio/boletimDiario/:trabalho_diario_id" component={ BoletimDiario } tipoPerfil={ perfil } />

        {/* Relatórios */}
        <PrivateRoute exact path="/relatorio/diario" component={ RelatorioDiario } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/diario/:trabalho_id" component={ VisualizarRelatorioDiario } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/diarioEquipe" component={ RelatorioDiarioEquipe } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/diarioEquipe/:equipe_id/:data" component={ VisualizarDiarioEquipe } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/semanal" component={ RelatorioSemanal } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/semanal/:semana/:atividade_id/:ano" component={ VisualizarSemanal } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/atividade" component={ RelatorioAtividade } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/atividade/:atividade_id" component={ VisualizarRelatorioAtividade } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/atividadeEquipe" component={ RelatorioAtividadeEquipe } tipoPerfil={ perfil } />
        <PrivateRoute exact path="/relatorio/atividadeEquipe/:equipe_id" component={ VisualizarAtividadeEquipe } tipoPerfil={ perfil } />

        {/* Rota */}
        <PrivateRoute exact path="/rota" component={ Rota } tipoPerfil={ perfil } />
        <PrivateRoute path="/rota/planejar" component={ PlanejarRota } tipoPerfil={ perfil } />

        {/* Usuários do município */}
        <PrivateRoute exact path="/usuarios" component={ UsuariosMunConsultar } tipoPerfil={ perfil } />
        <PrivateRoute path="/usuarios/:id" component={ UsuariosMunEditar } tipoPerfil={ perfil } />

        {/* Usuários da Regional */}
        <PrivateRoute exact path="/usuariosRegional" component={ UsuariosRegConsultar } tipoPerfil={ perfil } />
        <PrivateRoute path="/usuariosRegional/:id" component={ UsuariosRegEditar } tipoPerfil={ perfil } />

        {/* Zonas */}
        <PrivateRoute exact path="/zonas" component={ Zonas } tipoPerfil={ perfil } />
        <PrivateRoute path="/zonas/:id" component={ EditarZona } tipoPerfil={ perfil } />

        <Route exact path="*" component={ () => <h1>Página não encontrada</h1> } />
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

