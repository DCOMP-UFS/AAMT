import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { saveStatusForm } from '../../../../../store/modules/inspectionForm/actions';
import { addInspectionWithPendency } from '../../../../../store/modules/routes/actions';

import SelectionButton from '../../../../../components/SelectionButton';

import {
  Container,
  Card,
  Small,
  ButtonContainer,
  SectionContainer,
  TInput,
  SubmitButton,
  ErrorMessage,
} from './styles';

const StatusInspectionForm = ({
  form,
  indexes,
  routes,
  currentRouteIndex,
  ...props
}) => {
  const [optionStatus, setOptionStatus] = useState([
    { value: 'N', label: 'Normal' },
    { value: 'R', label: 'Recuperada' },
  ]);
  const [optionPendency, setOptionPendency] = useState([
    { value: 'N', label: 'Nenhuma' },
    { value: 'F', label: 'Fechada' },
    { value: 'R', label: 'Recusada' },
  ]);
  const formRef = useRef();
  const navigation = useNavigation();

  function handleStartInspection() {
    var today = new Date();

    var hh = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    today = hh + ':' + minutes + ':' + ss;

    return today;
  }

  useEffect(() => {
    if (
      !form.situacaoVistoria &&
      routes[currentRouteIndex].trabalhoDiario.atividade.metodologia.sigla ===
        'LIRAa'
    ) {
      formRef.current.setFieldValue('status', 'N');
    }
    if (form.pendencia === null) {
      formRef.current.setFieldValue('pendency', 'N');
    }
  }, []);

  function handleStatusSubmit(data) {
    const nw_data = {
      status: data.status,
      pendencia: data.pendency !== 'N' ? data.pendency : null,
      horaEntrada:
        form.horaEntrada !== '' ? form.horaEntrada : handleStartInspection(),
      justificativa: data.pendency !== 'N' ? data.justification : null,
    };
    const dailyWorkId = routes[currentRouteIndex].trabalhoDiario.id;
    if (data.pendency === 'F' || data.pendency === 'R') {
      props.addInspectionWithPendency(
        nw_data.status,
        nw_data.pendencia,
        nw_data.horaEntrada,
        nw_data.justificativa,
        indexes,
        dailyWorkId
      );
      navigation.navigate('Lista de imóveis');
    } else {
      props.saveStatusForm(
        nw_data.status,
        nw_data.pendencia,
        nw_data.horaEntrada,
        nw_data.justificativa
      );
      navigation.navigate('Depósitos inspecionados');
    }
  }

  const statusValidationSchema = Yup.object().shape({
    status: Yup.string().required('Selecione o status da vistoria'),
    pendency: Yup.string().required('Selecione a pendência da vistoria'),
  });

  // useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', e => {
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         'Discard changes?',
  //         'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //         [
  //           { text: "Don't leave", style: 'cancel', onPress: () => {} },
  //           {
  //             text: 'Discard',
  //             style: 'destructive',
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => navigation.dispatch(e.data.action),
  //           },
  //         ]
  //       );
  //     }),
  //   [navigation]
  // );

  return (
    <Container>
      <Card>
        <Formik
          validationSchema={statusValidationSchema}
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            status: form.situacaoVistoria,
            pendency: form.pendencia,
            justification: form.justificativa,
          }}
          onSubmit={values => handleStatusSubmit(values)}
        >
          {({ handleChange, handleSubmit, errors, values }) => (
            <>
              <SectionContainer>
                <Small>Status da vistoria</Small>
                <ButtonContainer>
                  {optionStatus.map(item => (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        formRef.current.setFieldValue('status', item.value)
                      }
                      key={item.label}
                    >
                      <SelectionButton
                        status={
                          values.status === item.value ? 'selected' : 'normal'
                        }
                      >
                        {item.label}
                      </SelectionButton>
                    </TouchableWithoutFeedback>
                  ))}
                </ButtonContainer>

                {errors.status && <ErrorMessage>{errors.status}</ErrorMessage>}
              </SectionContainer>

              <SectionContainer>
                <Small>Pendência</Small>
                <ButtonContainer>
                  {optionPendency.map(item => (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        formRef.current.setFieldValue('pendency', item.value)
                      }
                      key={item.label}
                    >
                      <SelectionButton
                        status={
                          values.pendency === item.value ? 'selected' : 'normal'
                        }
                      >
                        {item.label}
                      </SelectionButton>
                    </TouchableWithoutFeedback>
                  ))}
                </ButtonContainer>

                {errors.pendency && (
                  <ErrorMessage>{errors.pendency}</ErrorMessage>
                )}
              </SectionContainer>

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

              <SubmitButton onPress={handleSubmit}>
                {values.pendency !== 'N' ? 'Finalizar vistoria' : 'Prosseguir'}
              </SubmitButton>
            </>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  form: state.inspectionForm.form,
  indexes: state.inspectionForm.indexes,
  routes: state.routes.routes,
  currentRouteIndex: state.routes.currentRouteIndex,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveStatusForm, addInspectionWithPendency }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusInspectionForm);
