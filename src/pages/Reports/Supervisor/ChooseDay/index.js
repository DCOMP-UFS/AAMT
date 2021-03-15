import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import { Container, Card, TextContainer, Label } from './styles';

const ChooseDay = () => {
  const [data, setData] = useState('');

  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate('Relatório diário da equipe');
  }

  return (
    <Container>
      <Card>
        <TextContainer>
          <Label>Data do trabalho</Label>
          <Input
            value={data}
            onChangeText={setData}
            keyboardType="default"
            returnKeyType="send"
          />
        </TextContainer>
        <Button onPress={() => handleSubmit()}>Concluir</Button>
      </Card>
    </Container>
  );
};

export default ChooseDay;
