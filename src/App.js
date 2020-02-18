import React from 'react';
import Routes from './routes';
import { GoogleApiWrapper } from 'google-maps-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap';

import './App.css';
import './Utilities.css';
import { GlobalStyle } from './styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clearToast } from './store/actions/appConfig';

// import Header from './components/Header';
// import Main from './pages/main';

const App = (props) => {
  function notify() {
    toast(props.toast.message, {
      type: props.toast.type,
      onClose: props.clearToast()
    });
  }

  return (
  <>
    <GlobalStyle />
    <Routes />
    <ToastContainer />
    { props.toast.message && notify() }
  </>
)};

const LoadingContainer = (props) => (
  <div>Carregando...</div>
)

const mapStateToProps = state => ({
  navToggle: state.sidebar.navToggle,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearToast }, dispatch);

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCYow9L-l0V_XA6kzpt-62S4-VGKwLy65w"),
  LoadingContainer: LoadingContainer
})(
connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
)
