import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container, ButtonText } from './styles';

const Button = ({ children, loading, type, ...rest }) => {
  return (
    <Container type={type} {...rest}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  );
};

Button.defaultProps = {
  loading: false,
  type: 'normal',
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
