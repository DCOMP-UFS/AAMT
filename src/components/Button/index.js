import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';

import {Container, ButtonText} from './styles';

const Button: React.FC<RectButtonProperties> = ({
  children,
  loading,
  color,
  textColor,
  ...rest
}) => (
  <Container {...rest} color={color}>
    {loading ? (
      <ActivityIndicator size="large" color="#fff" />
    ) : (
      <ButtonText textColor={textColor}>{children}</ButtonText>
    )}
  </Container>
);

Button.defaultProps = {
  color: undefined,
  textColor: undefined,
  loading: false,
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
  loading: PropTypes.bool,
};

export default Button;
