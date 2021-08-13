import React, { useRef } from 'react';
import {
  Text,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, WelcomeTitle, WelcomeDescription, Version } from './styles';

import { signInRequest } from '../../store/modules/auth/actions';

const SignIn = () => {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const passwordRef = useRef(null);

  const signInValidationSchema = Yup.object().shape({
    user: Yup.string().required('Usuário é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  function handleSignIn(data) {
    const { user, password } = data;
    dispatch(signInRequest(user, password));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
          >
            <WelcomeTitle>Olá!</WelcomeTitle>
            <WelcomeDescription>Faça login para continuar</WelcomeDescription>
            <Formik
              validationSchema={signInValidationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{ user: '', password: '' }}
              onSubmit={values => handleSignIn(values)}
            >
              {({ handleChange, handleSubmit, errors, values }) => (
                <>
                  <Input
                    value={values.user}
                    onChangeText={handleChange('user')}
                    label="Usuário"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    errors={errors.user}
                  />
                  <Input
                    forwardRef={passwordRef}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    label="Senha"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    keyboardType="default"
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    errors={errors.password}
                  />
                  <Button onPress={handleSubmit} loading={loading}>
                    Entrar
                  </Button>
                </>
              )}
            </Formik>
            <Version>Versão 1.1</Version>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};

export default SignIn;
