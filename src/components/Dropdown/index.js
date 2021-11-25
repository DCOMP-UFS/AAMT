/* eslint-disable no-shadow */
import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { Container, PickerBox, Label, ErrorMessage } from './styles';

function Dropdown({ name, itens, label, placeholder, errors, ...rest }) {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <PickerBox isErrored={!!errors}>
        <Picker
          {...rest}
          style={{ width: '100%', height: 60, color: '#8f9bb3' }}
          dropdownIconColor="#8f9bb3"
        >
          <Picker.Item label={placeholder} />
          {itens &&
            itens.map((item) => {
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

export default Dropdown;
