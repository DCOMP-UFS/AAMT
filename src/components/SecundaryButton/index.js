import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { Container, ButtonText, BorderContainer } from './styles';

const SecundaryButton: React.FC<RectButtonProperties> = ({
  children,
  ...rest
}) => (
  <BorderContainer>
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  </BorderContainer>
);

SecundaryButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SecundaryButton;
