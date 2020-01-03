import React from 'react';
import Routes from './routes';
import { GoogleApiWrapper } from 'google-maps-react';

import './App.css';
import './Utilities.css';

// REDUX
import { connect } from 'react-redux';

// import Header from './components/Header';
// import Main from './pages/main';

const App = (props) => <Routes />;

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
