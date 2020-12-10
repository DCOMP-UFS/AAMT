import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addInspection } from '../../../store/modules/inspections/actions';

import SelectButton from '../../../components/SelectButton';
import SecundaryButton from '../../../components/SecundaryButton';
import Button from '../../../components/Button';

import { Container, Card, Title, Small, Item, ButtonContainer } from './styles';

const InspectionsForm = ({
  sequencia,
  trabalho_diario_id,
  inspections,
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
  const [property, setProperty] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { imovel_id } = route.params;

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
    if ((status === 'N' || 'R') && pendency === null) {
      const inspection = {
        situacaoVistoria: status,
        pendencia: pendency,
        sequencia: sequencia + 1,
        imovel: { id: imovel_id },
        trabalhoDiario_id: trabalho_diario_id,
        horaEntrada: handleStartInspection(),
        recipientes: [],
      };

      props.addInspection(inspection);

      navigation.navigate('Depósitos', { imovel_id });
    } else {
      navigation.navigate('Lista de Quarteirões'); // TEM DE ALTERAR PARA SALVAR A ROTA!!!!!!!!
    }
  }

  // useEffect(() => {
  //   const index = inspections.findIndex(p => p.imovel_id === imovel_id);

  //   if (index >= 0) {
  //     setProperty(inspections[index]);
  //     setStatus(property.situacaoVistoria);
  //     setPendency(property.pendencia);
  //   }
  // }, []);

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

const mapStateToProps = state => ({
  sequencia: state.inspections.sequenciaVistoria,
  inspections: state.inspections.vistorias,
  trabalho_diario_id: state.activityRoutes.dailyActivity.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addInspection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InspectionsForm);
