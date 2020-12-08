import React from 'react';
import PropTypes from 'prop-types';

import { Container, ButtonText } from './styles';

const SelectButton = ({ children, select, ...rest }) => (
  <Container selected={select}>
    <ButtonText selected={select}>{children}</ButtonText>
  </Container>
);

SelectButton.defaultProps = {
  select: false,
};

SelectButton.propTypes = {
  children: PropTypes.string.isRequired,
  select: PropTypes.bool.isRequired,
};

export default SelectButton;
