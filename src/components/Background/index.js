import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import { Container, Blue, Content } from './styles';

const Background = ({ children }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0095DA" />
      <Container>
        <Blue />
        <Content>{children}</Content>
      </Container>
    </>
  );
};

Background.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Background;
