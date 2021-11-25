import React from 'react';
import PropTypes from 'prop-types';

import { Container, SelectedIcon, Text } from './styles';

const SelectionButton = ({ status, children, ...rest }) => {
  return (
    <Container status={status} {...rest}>
      {status === 'selected' ? (
        <SelectedIcon status={status} name="check-circle" />
      ) : (
        <SelectedIcon status={status} name="circle" />
      )}
      <Text status={status}>{children}</Text>
    </Container>
  );
};

SelectionButton.defaultProps = {
  status: 'normal',
};

SelectionButton.propTypes = {
  children: PropTypes.string.isRequired,
  status: PropTypes.string,
};

export default SelectionButton;
