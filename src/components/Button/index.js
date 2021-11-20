import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Container, ButtonText } from './styles';

const Button = ({ children, loading, type, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <Container type={type}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ButtonText>{children}</ButtonText>
        )}
      </Container>
    </TouchableOpacity>
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
