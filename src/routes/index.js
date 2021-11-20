import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import AuthRoutes from '../routes/authRoutes';
import AgentRoutes from '../routes/agentRoutes';

const Agent = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AgentRoutes />
    </>
  );
};

// const Sup = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <SupRoutes />
//     </>
//   );
// };

const routes = ({ signed, profile }) => {
  if (signed) {
    const profileType = profile.atuacoes[0].tipoPerfil;

    switch (profileType) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        // return <SupRoutes />;
        break;
      case 4:
        return <Agent />;
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
