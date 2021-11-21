import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { Container, ButtonText } from './styles';

const SecondaryButton = ({ children, isDisabled, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={isDisabled} {...rest}>
      <Container isDisabled={isDisabled}>
        <ButtonText isDisabled={isDisabled}>{children}</ButtonText>
      </Container>
    </TouchableOpacity>
  );
};

SecondaryButton.defaultProps = {
  isDisabled: false,
};

SecondaryButton.propTypes = {
  children: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

export default SecondaryButton;
