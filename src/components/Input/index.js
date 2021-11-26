import React, { useState } from 'react';
import { TextInputProps, Text } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  TextContainer,
  TInput,
  Label,
  ErrorMessage,
  Required,
} from './styles';

const Input = ({ label, required, errors, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  return (
    <Container>
      {label && (
        <>
          <Label>
            {`${label} `}
            {required && <Required>*</Required>}
          </Label>
        </>
      )}
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
  required: PropTypes.bool,
};

export default Input;
