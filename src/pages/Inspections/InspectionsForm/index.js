import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  addInspection,
  editInspection,
} from '../../../store/modules/inspections/actions';

import SelectButton from '../../../components/SelectButton';
import SecundaryButton from '../../../components/SecundaryButton';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

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
  TInput,
} from './styles';

const InspectionsForm = ({ ...props }) => {
  const [optionStatus, setOptionStatus] = useState([
    { value: 'N', label: 'Normal' },
    { value: 'R', label: 'Recuperada' },
  ]);
  const [optionPendency, setOptionPendency] = useState([
    { value: null, label: 'Nenhuma' },
    { value: 'F', label: 'Fechada' },
    { value: 'R', label: 'Recusada' },
  ]);
  const formRef = useRef();

  const navigation = useNavigation();

  const { setStep, steps, step, form, setForm } = props;
  const { situacaoVistoria, pendencia, justificativa } = form;

  // const statusValidationSchema = Yup.object().shape({
  //   status: Yup.string().required('Selecione o status da vistoria'),
  //   pendency: Yup.string().required('Selecione a pendência da vistoria'),
  // });

  function handleStartInspection() {
    var today = new Date();

    var hh = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    today = hh + ':' + minutes + ':' + ss;

    return today;
  }

  // useEffect(() => {
  //   if (methodology === 'LIRAa') {
  //     console.log(methodology);

  //     /**
  //      * Altera os dados iniciais do formulário
  //      * dependendo da metodologia ou se é uma edição
  //      */
  //   }
  // }, []);

  function handleStatusSubmit(data) {
    const temporaryData = form;
    temporaryData.situacaoVistoria = data.status;
    temporaryData.pendencia = data.pendency;
    temporaryData.horaEntrada =
      temporaryData.horaEntrada === ''
        ? handleStartInspection()
        : temporaryData.horaEntrada;
    if (data.pendency === 'F' || data.pendency === 'R') {
      temporaryData.justificativa =
        data.justification !== '' ? data.justification : null;
      setForm(temporaryData);
      navigation.goBack();
      Alert.alert(
        'Operação concluída com sucesso!',
        'Você finalizou a vistoria deste imóvel'
      );
    } else {
      delete temporaryData.justificativa;
      setForm(temporaryData);
      setStep(step + 1);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: steps[step - 1].id });
  }, []);

  return (
    <Container>
      <Card>
        <Formik
          // validationSchema={statusValidationSchema}
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            status: situacaoVistoria,
            pendency: pendencia,
            justification: justificativa,
          }}
          onSubmit={values => handleStatusSubmit(values)}
        >
          {({ handleChange, handleSubmit, errors, values }) => (
            <>
              <Title>Situação da vistoria</Title>

              <Small>Status da vistoria</Small>
              <ButtonContainer>
                {optionStatus.map(item => (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      formRef.current.setFieldValue('status', item.value)
                    }
                    key={item.label}
                  >
                    <SelectButton
                      select={values.status === item.value ? true : false}
                    >
                      {item.label}
                    </SelectButton>
                  </TouchableWithoutFeedback>
                ))}
              </ButtonContainer>

              <Small>Pendência</Small>
              <ButtonContainer>
                {optionPendency.map(item => (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      formRef.current.setFieldValue('pendency', item.value)
                    }
                    key={item.label}
                  >
                    <SelectButton
                      select={values.pendency === item.value ? true : false}
                    >
                      {item.label}
                    </SelectButton>
                  </TouchableWithoutFeedback>
                ))}
              </ButtonContainer>

              {(values.pendency === 'F' || values.pendency === 'R') && (
                <>
                  <Small>Justificativa da pendência</Small>
                  <TInput
                    value={values.justification}
                    onChangeText={handleChange('justification')}
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="none"
                    errors={errors.justification}
                  />
                </>
              )}

              <Button onPress={handleSubmit}>Prosseguir</Button>
            </>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default InspectionsForm;
