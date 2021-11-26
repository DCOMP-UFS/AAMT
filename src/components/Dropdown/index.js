/* eslint-disable no-shadow */
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';

import { Container, PickerBox, Label, ErrorMessage, Required } from './styles';

function Dropdown({ itens, label, required, placeholder, errors, ...rest }) {
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
      <PickerBox isErrored={!!errors}>
        <Picker
          {...rest}
          style={{ width: '100%', height: 60, color: '#585666' }}
          dropdownIconColor="#585666"
        >
          <Picker.Item label={placeholder} />
          {itens &&
            itens.map(item => {
              return (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              );
            })}
        </Picker>
      </PickerBox>
      {errors && <ErrorMessage>{errors}</ErrorMessage>}
    </Container>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  itens: PropTypes.array.isRequired,
};

export default Dropdown;
