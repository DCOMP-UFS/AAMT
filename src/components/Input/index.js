import React, { useState } from 'react';
import { TextInputProps, Text } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  TextContainer,
  TInput,
  Label,
  ErrorMessage,
} from './styles';

const Input = ({ label, errors, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <TextContainer isFocused={isFocused} isErrored={!!errors}>
        <TInput
          {...rest}
          ref={rest.forwardRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isFocused={isFocused}
        />
      </TextContainer>
      {errors && <ErrorMessage>{errors}</ErrorMessage>}
    </Container>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.string,
};

export default Input;
