import React, { useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import logoAamt from '../../assets/logoaedes.png';

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <Container>
            <Image
              source={logoAamt}
              resizeMode="center"
              style={{
                height: '50%',
                width: '50%',
                marginTop: 25,
              }}
            />

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
            <Version>Versão 0.1</Version>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
