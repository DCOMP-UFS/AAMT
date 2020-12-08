import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import SelectButton from '../../../components/SelectButton';
import SecundaryButton from '../../../components/SecundaryButton';
import Button from '../../../components/Button';

import { Container, Card, Title, Small, Item, ButtonContainer } from './styles';

const InspectionsForm = () => {
  const [optionStatus, setOptionStatus] = useState([
    { value: 'N', label: 'Normal' },
    { value: 'R', label: 'Recuperada' },
  ]);
  const [optionPendency, setOptionPendency] = useState([
    { value: null, label: 'Nenhuma' },
    { value: 'F', label: 'Fechada' },
    { value: 'R', label: 'Recusada' },
  ]);
  const [status, setStatus] = useState('');
  const [pendency, setPendency] = useState('');

  const navigation = useNavigation();

  function changePendency(item) {
    setPendency(item);
  }

  function changeStatus(item) {
    setStatus(item);
  }

  function formValidation() {
    if (status === '' || pendency === '') {
      Alert.alert(
        'Houve um erro!',
        'Verifique se todos os campos foram respondidas'
      );
    } else {
      handleSubmit();
    }
  }

  function handleSubmit() {
    var inspection = {
      situacaoVistoria: status,
      horaEntrada: null,
      pendencia: pendency,
      depositos: [],
    };

    if ((status === 'N' || 'R') && pendency === null) {
      navigation.navigate('Cadastrar Recipiente', { inspection });
    } else {
      navigation.navigate('Lista de Quarteirões'); // TEM DE ALTERAR PARA SALVAR A ROTA!!!!!!!!
    }
  }

  return (
    <Container>
      <Card>
        <Title>Situação da vistoria</Title>
        <Small>Informe o status da vistoria:</Small>
        <ButtonContainer>
          {optionStatus.map(item => (
            <TouchableWithoutFeedback
              onPress={() => changeStatus(item.value)}
              key={item.label}
            >
              <SelectButton select={status === item.value ? true : false}>
                {item.label}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </ButtonContainer>
        <Small>Informe a pendência:</Small>
        <ButtonContainer>
          {optionPendency.map(item => (
            <TouchableWithoutFeedback
              onPress={() => changePendency(item.value)}
              key={item.label}
            >
              <SelectButton select={pendency === item.value ? true : false}>
                {item.label}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </ButtonContainer>
        <Button
          color="#0095DA"
          textColor="#fff"
          onPress={() => formValidation()}
        >
          Prosseguir
        </Button>
        <SecundaryButton>Cancelar</SecundaryButton>
      </Card>
    </Container>
  );
};

export default InspectionsForm;
