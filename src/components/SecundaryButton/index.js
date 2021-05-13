import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container, ButtonText, Wrapper } from './styles';

const SecundaryButton = ({ children, loading, type, ...rest }) => {
  return (
    <Container type={type} {...rest}>
      <Wrapper>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ButtonText>{children}</ButtonText>
        )}
      </Wrapper>
    </Container>
  );
};

SecundaryButton.defaultProps = {
  loading: false,
  type: 'default',
};

SecundaryButton.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

export default SecundaryButton;
