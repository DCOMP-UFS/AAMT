import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import { Container, Card, TextContainer, Label } from './styles';

const ChooseWeek = () => {
  const [epiWeek, setEpiWeek] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  function handleSubmit() {
    if (parseInt(epiWeek) > 53) {
      Alert.alert(
        'Ocorreu um erro',
        'A quantidade de semanas não pode ser maior que 53'
      );
    } else {
      navigation.navigate('Relatorio semanal', { id, epiWeek });
    }
  }

  return (
    <Container>
      <Card>
        <Input
          value={epiWeek}
          onChangeText={setEpiWeek}
          keyboardType="number-pad"
          returnKeyType="send"
          label="Semana epidemiológica"
        />
        <Button onPress={() => handleSubmit()}>Concluir</Button>
      </Card>
    </Container>
  );
};

export default ChooseWeek;
