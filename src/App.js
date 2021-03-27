import React from 'react';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';

import { signOut } from './store/modules/auth/actions';

import api from './services/api';

import Routes from './routes';

const App = ({ token, ...props }) => {
  api.interceptors.request.use(
    function (config) {
      if (token) {
        const { exp } = jwtDecode(token);

        const expirationTime = exp * 1000 - 60000;

        if (Date.now() >= expirationTime) {
          props.signOut();
        }

        // console.log(expirationTime);
      }

      return config;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return <Routes />;
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signOut,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
