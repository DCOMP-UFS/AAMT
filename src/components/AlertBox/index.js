import React from 'react';
import PropTypes from 'prop-types';

import { Container, Column, Title, Message, Icon } from './styles';

const AlertBox = ({ type, icon, title, message, ...rest }) => {
  return (
    <Container type={type} {...rest}>
      <Icon size={21} iconName={icon} iconColor={type} />
      <Column>
        <Title type={type}>{title}</Title>
        <Message type={type}>{message}</Message>
      </Column>
    </Container>
  );
};

AlertBox.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertBox;
