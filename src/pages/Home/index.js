import React from 'react';
import { View, StatusBar } from 'react-native';

import StartActivityButton from '../../components/StartActivityButton';
import BlocksList from '../../components/BlocksList';

import { Container } from './styles';

const Home = () => {
  return (
    <>
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <StartActivityButton />
      </Container>
    </>
  );
};

export default Home;
