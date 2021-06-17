import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { removeRecipient } from '../../../store/modules/inspections/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../../../components/Button';

import {
  Container,
  Card,
  Header,
  HeaderTitle,
  RecipientContainer,
  RecipientItem,
  RecipientText,
  RecipientOptions,
  NoRecipientText,
  NoRecipientContainer,
} from './styles';

const RecipientList = ({ ...props }) => {
  const { setStep, step, steps, form, setForm } = props;
  const { recipientes } = form;

  const navigation = useNavigation();

  function removeRecipient(sequencia) {
    setForm(recipientes.findIndex(p => p.sequencia === sequencia));
  }

  // function finishInspection() {
  //   navigation.navigate('Lista de Imóveis');
  //   Alert.alert('Operação concluída!', 'Você finalizou uma vistoria');
  // }

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      unsubscribe();
      setStep(step - 1);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: steps[step - 1].id });
  }, []);

  return (
    <Container>
      <Card>
        <Header>
          <HeaderTitle>Lista de depósitos</HeaderTitle>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Cadastrar Depósito')}
          >
            <Icon size={23} name="add" color="#0095da" />
          </TouchableWithoutFeedback>
        </Header>
        <RecipientContainer>
          {recipientes.length !== 0 ? (
            recipientes.map((recipiente, index) => (
              <RecipientItem key={index}>
                <TouchableWithoutFeedback onPress={() => setStep(step + 1)}>
                  <RecipientText>{`Depósito ${recipiente.sequencia}`}</RecipientText>
                </TouchableWithoutFeedback>
                <RecipientOptions>
                  <TouchableWithoutFeedback
                    onPress={() => removeRecipient(recipiente.sequencia)}
                  >
                    <Icon size={23} name="close" color="#E74040" />
                  </TouchableWithoutFeedback>
                </RecipientOptions>
              </RecipientItem>
            ))
          ) : (
            <NoRecipientContainer>
              <Icon size={60} name="receipt-long" color="#C6CDD3" />
              <NoRecipientText>
                Não há depósitos cadastrados para este imóvel
              </NoRecipientText>
            </NoRecipientContainer>
          )}
        </RecipientContainer>
      </Card>
      {/* <Button onPress={() => finishInspection()}>Concluir vistoria</Button> */}
    </Container>
  );
};

export default RecipientList;
