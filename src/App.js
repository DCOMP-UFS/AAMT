import React, { Fragment } from 'react';
import Routes from './routes';
import { GoogleApiWrapper } from 'google-maps-react';

import { BodyPanel, ContainerBody } from './styles/global';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import './App.css';
import './Utilities.css';

// REDUX
import { connect } from 'react-redux';

// import Header from './components/Header';
// import Main from './pages/main';

const App = (props) => (
  <Fragment>
    <Header />

    <ContainerBody>
      <Sidebar />

      <BodyPanel className={ props.navToggle ? "body-collapse" : "" }>
        <Routes />
      </BodyPanel>
    </ContainerBody>
  </Fragment>
);

const LoadingContainer = (props) => (
  <div>Carregando...</div>
)

const mapStateToProps = state => ({
  navToggle: state.sidebar.navToggle
});

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCYow9L-l0V_XA6kzpt-62S4-VGKwLy65w"),
  LoadingContainer: LoadingContainer
})(
connect(
  mapStateToProps
)(App)
)
