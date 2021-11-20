import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { Container, ButtonText } from './styles';

const SecondaryButton = ({ children, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <Container>
        <ButtonText>{children}</ButtonText>
      </Container>
    </TouchableOpacity>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SecondaryButton;
