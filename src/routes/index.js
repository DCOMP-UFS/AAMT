import React from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import AuthRoutes from './authRoutes';
import App from './appRoutes';
import Sup from './supRoutes';

const AppRoutes = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <App />
    </>
  );
};

const SupRoutes = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Sup />
    </>
  );
};

const routes: React.FC = ({ signed, profile }) => {
  if (signed) {
    const profileType = profile.atuacoes[0].tipoPerfil;

    switch (profileType) {
      case 1:
        break;
      case 2:
        break;
      case 4:
        return <AppRoutes />;
        break;
      case 3:
        return <SupRoutes />;
        break;
      default:
        break;
    }
  }
  return <AuthRoutes />;
};

const mapStateToProps = state => ({
  signed: state.auth.signed,
  profile: state.user.profile,
});

export default connect(mapStateToProps)(routes);
