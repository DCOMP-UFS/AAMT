import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';

import { addInspection } from '../../../store/modules/routes/actions';

import Icon from 'react-native-vector-icons/Feather';

import Button from '../../../components/Button';
import ModalComponent from '../../../components/ModalComponent';

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
  const [visible, setVisible] = useState(false);
  const {
    setStep,
    step,
    steps,
    form,
    setForm,
    trab_diario_id,
    totalInspections,
    address,
  } = props;
  const [recipientes, setRecipientes] = useState(form.recipientes);
  const recipientSequence = useSelector(
    state => state.routes.recipientSequence
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  function removeRecipient(sequencia, index) {
    const newRecipients = recipientes.filter(p => p.sequencia !== sequencia);
    setRecipientes(newRecipients);
    const copyForm = form;
    copyForm.recipientes = newRecipients;
    setForm(copyForm);
  }

  function finishInspection() {
    dispatch(addInspection(form, address));
    Alert.alert('Operação concluída!', 'Você finalizou esta vistoria');
    navigation.navigate('Lista de Imóveis', {
      street: address.street,
      blockIndex: address.blockIndex,
      streetIndex: address.streetIndex,
    });
  }

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
    <>
      <StatusBar
        barStyle={visible ? 'light-content' : 'dark-content'}
        backgroundColor={visible ? 'rgba(0,0,0,0.5)' : '#fff'}
      />
      <Container>
        <ModalComponent visible={visible} />
        <Card>
          <Header>
            <HeaderTitle>Lista de depósitos</HeaderTitle>
            <TouchableWithoutFeedback onPress={() => setStep(step + 1)}>
              <Icon size={23} name="plus" color="#0095da" />
            </TouchableWithoutFeedback>
          </Header>
          <RecipientContainer>
            {recipientes.length !== 0 ? (
              recipientes.map((recipiente, index) => (
                <RecipientItem key={index} onPress={() => setVisible(true)}>
                  <TouchableWithoutFeedback>
                    <RecipientText>{`Depósito ${recipiente.idUnidade}`}</RecipientText>
                  </TouchableWithoutFeedback>
                  <RecipientOptions>
                    <TouchableWithoutFeedback>
                      <Icon size={23} name="edit" color="#a6a8ad" />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        removeRecipient(recipiente.sequencia, index)
                      }
                    >
                      <Icon size={23} name="x" color="#E74040" />
                    </TouchableWithoutFeedback>
                  </RecipientOptions>
                </RecipientItem>
              ))
            ) : (
              <NoRecipientContainer>
                <Icon size={60} name="file" color="#C6CDD3" />
                <NoRecipientText>
                  Não há depósitos cadastrados para este imóvel
                </NoRecipientText>
              </NoRecipientContainer>
            )}
          </RecipientContainer>
        </Card>
        <Button onPress={() => finishInspection()}>Concluir vistoria</Button>
      </Container>
    </>
  );
};

export default RecipientList;
