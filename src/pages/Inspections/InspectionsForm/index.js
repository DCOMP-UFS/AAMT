import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  addInspection,
  editInspection,
} from '../../../store/modules/inspections/actions';

import SelectButton from '../../../components/SelectButton';
import SecundaryButton from '../../../components/SecundaryButton';
import Button from '../../../components/Button';

import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  Container,
  Card,
  Title,
  Small,
  Item,
  ButtonContainer,
  TextInput,
  InputContainer,
} from './styles';

const InspectionsForm = ({
  sequencia,
  inspections,
  trabalho_diario_id,
  metodologia,
  ...props
}) => {
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
  const [sequence, setSequence] = useState(sequencia);
  const [startHour, setStartHour] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [justification, setJustification] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { house, property } = route.params;

  const imovel_id = property.id;

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

  function handleStartInspection() {
    var today = new Date();

    var hh = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    today = hh + ':' + minutes + ':' + ss;

    return today;
  }

  function handleSubmit() {
    const inspection = {
      situacaoVistoria: status,
      pendencia: pendency,
      sequencia: sequence,
      imovel: property,
      trabalhoDiario_id: trabalho_diario_id,
      horaEntrada: startHour === '' ? handleStartInspection() : startHour,
      recipientes: recipients,
      ...(pendency === 'F' || pendency === 'R'
        ? { justificativa: justification !== '' ? justification : null }
        : {}),
    };

    console.log(inspection);

    if (!house) {
      props.addInspection(inspection);
    } else {
      console.log('entrou lá!');
      props.editInspection(inspection, imovel_id);
    }

    if ((status === 'N' || 'R') && pendency === null) {
      navigation.navigate('Depósitos', { imovel_id, house });
    } else {
      navigation.goBack();
      Alert.alert('Operação concluída!', 'Você finalizou uma vistoria'); // TEM DE ALTERAR PARA SALVAR A ROTA!!!!!!!!
    }
  }

  useEffect(() => {
    if (house) {
      setStatus(house.situacaoVistoria);
      setPendency(house.pendencia);
      setSequence(house.sequencia);
      setRecipients(house.recipientes);
      setStartHour(house.horaEntrada);
    }
  }, []);

  useEffect(() => {
    if (metodologia === 'LIRAa') {
      setStatus('N');
      setPendency(null);
    }
  }, []);

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
        {(pendency === 'F' || pendency === 'R') && (
          <>
            <Small>Informe a justificativa da pendência:</Small>
            <InputContainer>
              <TextInput
                style={{
                  textAlignVertical: 'top',
                }}
                onChangeText={text => setJustification(text)}
                defaultValue={justification}
              />
            </InputContainer>
          </>
        )}
        <Button onPress={() => formValidation()}>Prosseguir</Button>
        {/* <SecundaryButton>Cancelar</SecundaryButton> */}
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  sequencia: state.inspections.sequenciaVistoria,
  inspections: state.inspections.vistorias,
  trabalho_diario_id: state.currentActivity.dailyActivity.trabalhoDiario.id,
  metodologia:
    state.currentActivity.dailyActivity.trabalhoDiario.atividade.metodologia
      .sigla,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addInspection,
      editInspection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InspectionsForm);
