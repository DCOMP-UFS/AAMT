import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';

import { addInspection } from '../../../store/modules/routes/actions';

import Icon from 'react-native-vector-icons/Feather';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
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
  HeaderModal,
  TitleModal,
  DetailsModal,
  RowContainer,
  ColumnContainer,
  SmallModal,
  DescriptionModal,
  SubtitleModal,
  SubContainer,
  SampleDescriptionModal,
  RepeatButton,
  RepeatInput,
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

  const [repetitions, setRepetitions] = useState('');

  function handleRepetitions(index) {
    console.log(recipientes[index]);

    const copy_recipientes = recipientes;
    for (let i = 1; i <= parseInt(repetitions); i += 1) {
      const [first, second, third] = recipientes[index].idUnidade.split('.');
      const newRecipient = {
        fl_comFoco: recipientes[index].fl_comFoco,
        fl_eliminado: recipientes[index].fl_eliminado,
        fl_tratado: recipientes[index].fl_tratado,
        amostras: recipientes[index].amostras,
        tipoRecipiente: recipientes[index].tipoRecipiente,
        tratamento: recipientes[index].tratamento,
        sequencia: `${copy_recipientes.length + 1}`,
        idUnidade:
          first + '.' + second + '.' + `${copy_recipientes.length + 1}`,
      };
      copy_recipientes.push(newRecipient);
    }
    setRecipientes(copy_recipientes);
    setVisible(false);
  }

  const RecipientModal = ({ recipient, index }) => {
    return (
      <>
        <HeaderModal>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Icon size={23} name="x" color="#a6a8ad" />
          </TouchableOpacity>
        </HeaderModal>
        <TitleModal>{`Depósito ${recipient.idUnidade}`}</TitleModal>
        <DetailsModal>
          <SubtitleModal>Informações do depósito</SubtitleModal>
          <SubContainer>
            <RowContainer>
              <ColumnContainer>
                <SmallModal>Tipo do recipiente</SmallModal>
                <DescriptionModal>{recipient.tipoRecipiente}</DescriptionModal>
              </ColumnContainer>
              <ColumnContainer>
                <SmallModal>Depósito com foco?</SmallModal>
                <DescriptionModal>
                  {recipient.fl_comFoco ? `Sim` : `Não`}
                </DescriptionModal>
              </ColumnContainer>
            </RowContainer>
            <RowContainer>
              <ColumnContainer>
                <SmallModal>Depósito eliminado?</SmallModal>
                <DescriptionModal>
                  {recipient.fl_eliminado ? `Sim` : `Não`}
                </DescriptionModal>
              </ColumnContainer>
              <ColumnContainer>
                <SmallModal>Depósito tratado?</SmallModal>
                <DescriptionModal>
                  {recipient.fl_tratado ? `Sim` : `Não`}
                </DescriptionModal>
              </ColumnContainer>
            </RowContainer>
          </SubContainer>
          {recipient.fl_tratado && (
            <>
              <SubtitleModal>Informações do tratamento</SubtitleModal>
              <SubContainer>
                <RowContainer>
                  <ColumnContainer>
                    <SmallModal>Técnica empregada</SmallModal>
                    <DescriptionModal>
                      {recipient.tratamento.tecnica === 1
                        ? 'Focal'
                        : 'Perifocal'}
                    </DescriptionModal>
                  </ColumnContainer>
                </RowContainer>
                <RowContainer>
                  <ColumnContainer>
                    <SmallModal>Quantidade de larvicida</SmallModal>
                    <DescriptionModal>{`${recipient.tratamento.quantidade} g`}</DescriptionModal>
                  </ColumnContainer>
                </RowContainer>
              </SubContainer>
            </>
          )}
          {recipient.amostras.length > 0 && (
            <>
              <SubtitleModal>Amostras</SubtitleModal>
              <SubContainer>
                <ColumnContainer>
                  {recipient.amostras.map(amostra => (
                    <SampleDescriptionModal
                      key={amostra.sequencia}
                    >{`Amostra ${amostra.idUnidade}`}</SampleDescriptionModal>
                  ))}
                </ColumnContainer>
              </SubContainer>
            </>
          )}
          {recipient.amostras.length === 0 && (
            <>
              <SubtitleModal>Repetir inspeção</SubtitleModal>
              <SubContainer>
                <ColumnContainer>
                  <Input
                    value={repetitions}
                    onChangeText={value => setRepetitions(value)}
                    keyboardType="number-pad"
                  />
                  <TouchableWithoutFeedback
                    onPress={() => handleRepetitions(index)}
                  >
                    <RepeatButton>Repetir</RepeatButton>
                  </TouchableWithoutFeedback>
                </ColumnContainer>
              </SubContainer>
            </>
          )}
        </DetailsModal>
      </>
    );
  };

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
    setStep(-1);
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
                <View key={index}>
                  <ModalComponent visible={visible}>
                    <RecipientModal recipient={recipiente} index={index} />
                  </ModalComponent>
                  <RecipientItem>
                    <TouchableWithoutFeedback onPress={() => setVisible(true)}>
                      <RecipientText>{`Depósito ${recipiente.idUnidade}`}</RecipientText>
                    </TouchableWithoutFeedback>
                    <RecipientOptions>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          removeRecipient(recipiente.sequencia, index)
                        }
                      >
                        <Icon size={23} name="x" color="#E74040" />
                      </TouchableWithoutFeedback>
                    </RecipientOptions>
                  </RecipientItem>
                </View>
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
