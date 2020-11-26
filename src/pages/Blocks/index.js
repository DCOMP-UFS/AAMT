import React from 'react';
import {View, StatusBar} from 'react-native';

import BlocksList from '../../components/BlocksList';

// import { Container } from './styles';

const Blocks = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <BlocksList />
    </>
  );
};

export default Blocks;
