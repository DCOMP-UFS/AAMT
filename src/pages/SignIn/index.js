import React, {useState} from 'react';
import {Text, ScrollView, StatusBar} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Button from '../../components/Button';
import Background from '../../components/Background';
import Input from '../../components/Input';

import {Container, TextContainer, Label} from './styles';

import {signInRequest} from '../../store/modules/auth/actions';

const SignIn = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(user, password));
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0095DA" />
      <Background>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <TextContainer>
              <Label>Usuário</Label>
              <Input
                value={user}
                onChangeText={setUser}
                keyboardType="email-address"
                returnKeyType="send"
              />
            </TextContainer>

            <TextContainer>
              <Label>Senha</Label>
              <Input
                value={password}
                onChangeText={setPassword}
                // eslint-disable-next-line react/jsx-boolean-value
                secureTextEntry={true}
                keyboardType="default"
                returnKeyType="send"
              />
            </TextContainer>

            <Button
              color="#0095DA"
              textColor="#fff"
              onPress={handleSubmit}
              loading={loading}>
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </Background>
    </>
  );
};

export default SignIn;
