import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import SelectButton from '../../../components/SelectButton';
import SecundaryButton from '../../../components/SecundaryButton';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import {
  Container,
  Card,
  Title,
  Small,
  Item,
  ButtonContainer,
  RecipientButtonContainer,
} from './styles';

const RecipientForm = () => {
  const [recipientOptions, setRecipientOptions] = useState([
    'A1',
    'A2',
    'B',
    'C',
    'D1',
    'D2',
    'E',
  ]);
  const [focusOptions, setFocusOptions] = useState(['Sim', 'Não']);
  const [treatmentOptions, setTreatmentOptions] = useState([
    'Tratado',
    'Eliminado',
  ]);
  const [treatmentTypeOptions, setTreatmentTypeOptions] = useState([
    'Focal',
    'Perifocal',
  ]);

  const [recipientType, setRecipientType] = useState('');
  const [focus, setFocus] = useState('');
  const [treatment, setTreatment] = useState('');
  const [treatmentType, setTreatmentType] = useState('');

  const route = useRoute();
  const { inspection } = route.params;

  return (
    <Container>
      <Card>
        <Title>Recipiente</Title>
        <Small>Informe o tipo de recipiente</Small>
        <RecipientButtonContainer>
          {recipientOptions.map(item => (
            <TouchableWithoutFeedback
              onPress={() => setRecipientType(item)}
              key={item}
              style={{ marginBottom: 10 }}
            >
              <SelectButton select={recipientType === item ? true : false}>
                {item}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </RecipientButtonContainer>
        <Small>O recipiente possui foco de mosquito?</Small>
        <ButtonContainer>
          {focusOptions.map(item => (
            <TouchableWithoutFeedback onPress={() => setFocus(item)} key={item}>
              <SelectButton select={focus === item ? true : false}>
                {item}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </ButtonContainer>
        <Small>Qual o destino do recipiente?</Small>
        <ButtonContainer>
          {treatmentOptions.map(item => (
            <TouchableWithoutFeedback
              onPress={() => setTreatment(item)}
              key={item}
            >
              <SelectButton select={treatment === item ? true : false}>
                {item}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </ButtonContainer>
        {treatment === 'Tratado' && (
          <>
            <Title>Tratamento</Title>
            <Small>Qual a técnica de tratamento empregada?</Small>
            <ButtonContainer>
              {treatmentTypeOptions.map(item => (
                <TouchableWithoutFeedback
                  onPress={() => setTreatmentType(item)}
                  key={item}
                >
                  <SelectButton select={treatmentType === item ? true : false}>
                    {item}
                  </SelectButton>
                </TouchableWithoutFeedback>
              ))}
            </ButtonContainer>
            <Small>Informe a quantidade de inseticida utilizado</Small>
            <Input keyboardType="number-pad" />
          </>
        )}
        <Button color="#0095DA" textColor="#fff">
          Prosseguir
        </Button>
        <SecundaryButton>Cancelar</SecundaryButton>
      </Card>
    </Container>
  );
};

export default RecipientForm;
