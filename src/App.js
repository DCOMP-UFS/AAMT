import React from 'react';
import Routes from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import './Utilities.css';
import { GlobalStyle } from './styles/global';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clearToast } from './store/AppConfig/appConfigActions';

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

const mapStateToProps = state => ({
  navToggle: state.sidebar.navToggle,
  toast: state.appConfig.toast
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearToast }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
