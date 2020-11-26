import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';

const routes: React.FC = ({signed}) => {
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

const mapStateToProps = (state) => ({
  signed: state.auth.signed,
});

export default connect(mapStateToProps)(routes);
