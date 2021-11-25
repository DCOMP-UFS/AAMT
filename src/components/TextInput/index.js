import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  ErrorMessage,
  Label,
  TInput,
  TextContainer,
} from './styles';

function TextInput({ label, errors, ...rest }) {
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
          multiline
          maxLength={250}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isFocused={isFocused}
          style={{ textAlignVertical: 'top' }}
        />
      </TextContainer>
      {errors && <ErrorMessage>{errors}</ErrorMessage>}
    </Container>
  );
}

TextInput.defaultProps = {
  label: null,
  errors: null,
};

TextInput.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.string,
};

export default TextInput;
