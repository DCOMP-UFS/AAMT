import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';
import SupRoutes from './supRoutes';

const routes: React.FC = ({ signed, profile }) => {
  if (signed) {
    const profileType = profile.user.atuacoes[0].tipoPerfil;

    switch (profileType) {
      case 4:
        return <AppRoutes />;
        break;
      case 3:
        return <SupRoutes />;
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
