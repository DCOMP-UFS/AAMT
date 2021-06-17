import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SelectButton from '../../../components/SelectButton';
import SecundaryButton from '../../../components/SecundaryButton';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import {
  addSampleSequence,
  addRecipient,
} from '../../../store/modules/routes/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Card,
  Title,
  Small,
  Item,
  ButtonContainer,
  RecipientButtonContainer,
  ExtraContainer,
  Header,
  HeaderTitle,
  SampleItem,
  SampleText,
} from './styles';

const RecipientForm = ({ ...props }) => {
  const {
    setStep,
    steps,
    step,
    form,
    setForm,
    trab_diario_id,
    totalInspections,
  } = props;
  const currentIndex = useSelector(state => state.routes.currentRouteIndex);
  const methodology = useSelector(
    state =>
      state.routes.routes[currentIndex].trabalhoDiario.atividade.metodologia
        .sigla
  );
  const objective = useSelector(
    state =>
      state.routes.routes[currentIndex].trabalhoDiario.atividade.objetivo.sigla
  );
  const recipientSequence = useSelector(
    state => state.routes.recipientSequence
  );
  const sampleSequence = useSelector(state => state.routes.sampleSequence);
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const [recipientOptions, setRecipientOptions] = useState([
    'A1',
    'A2',
    'B',
    'C',
    'D1',
    'D2',
    'E',
  ]);
  const [focusOptions, setFocusOptions] = useState([
    { id: true, label: 'Sim' },
    { id: false, label: 'Não' },
  ]);
  const [treatmentOptions, setTreatmentOptions] = useState([
    { id: true, label: 'Tratado' },
    { id: false, label: 'Eliminado' },
  ]);
  const [treatmentTypeOptions, setTreatmentTypeOptions] = useState([
    { id: 1, label: 'Focal' },
    { id: 2, label: 'Perifocal' },
  ]);

  const navigation = useNavigation();

  function handleRecipientSubmit(data) {
    const recipient = {
      fl_comFoco: data.focus,
      tipoRecipiente: data.recipientType,
      fl_tratado: data.treatment,
      fl_eliminado: !data.treatment,
      sequencia: recipientSequence,
      tratamento: {
        quantidade: parseFloat(data.quantity ? data.quantity : 0),
        tecnica: data.treatmentType,
      },
      amostras: data.samples,
      idUnidade:
        trab_diario_id + '.' + (totalInspections + 1) + '.' + recipientSequence,
    };

    const copyForm = form;
    copyForm.recipientes.push(recipient);
    setForm(copyForm);

    dispatch(addRecipient());
    setStep(step - 1);
  }

  function addSample() {
    const samplesCopy = formRef.current.values.samples;

    const unity = sampleSequence + 1;

    samplesCopy.push({
      idUnidade:
        trab_diario_id +
        '.' +
        (totalInspections + 1) +
        '.' +
        recipientSequence +
        '.' +
        unity,
      situacao: 1,
      sequencia: unity,
    });

    formRef.current.setFieldValue('samples', samplesCopy);
    dispatch(addSampleSequence());
  }

  function removeSample(sampleSequence) {
    const samples = formRef.current.values.samples;
    formRef.current.setFieldValue(
      'samples',
      samples.filter(p => p.sequencia !== sampleSequence)
    );
  }

  // useEffect(() => {
  //   if (recipientExistent) {
  //     const recipient = recipientExistent;
  //     setRecipientType(recipient.tipoRecipiente);
  //     setFocus(recipient.fl_comFoco ? 'Sim' : 'Não');
  //     setTreatmentType(
  //       recipient.tratamento.tecnica === 1 ? 'Focal' : 'Perifocal'
  //     );
  //     setSequence(recipient.sequencia);
  //     setQuantity(recipient.tratamento.quantidade);
  //     setSample(recipient.amostras);
  //     setSampleNumber(recipient.amostras.length);
  //     recipient.fl_tratado
  //       ? setTreatment('Tratado')
  //       : setTreatment('Eliminado');
  //   }
  // }, []);

  // useEffect(() => {

  // }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: steps[step - 1].id });
  }, []);

  console.log(form);

  return (
    <Container>
      <Card>
        <Formik
          // validationSchema={statusValidationSchema}
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            recipientType: '',
            focus: undefined,
            samples: [],
            treatment: undefined,
            treatmentType: 0,
            quantity: '',
          }}
          onSubmit={values => handleRecipientSubmit(values)}
        >
          {({ handleChange, handleSubmit, errors, values }) => (
            <>
              <Title>Depósito</Title>

              <Small>Tipo do depósito</Small>
              <RecipientButtonContainer>
                {recipientOptions.map(item => (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      formRef.current.setFieldValue('recipientType', item)
                    }
                    key={item}
                    style={{ marginBottom: 10 }}
                  >
                    <SelectButton
                      select={values.recipientType === item ? true : false}
                    >
                      {item}
                    </SelectButton>
                  </TouchableWithoutFeedback>
                ))}
              </RecipientButtonContainer>

              <Small>Foco de mosquito</Small>
              <RecipientButtonContainer>
                {focusOptions.map(item => (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      formRef.current.setFieldValue('focus', item.id)
                    }
                    key={item.id}
                    style={{ marginBottom: 10 }}
                  >
                    <SelectButton
                      select={values.focus === item.id ? true : false}
                    >
                      {item.label}
                    </SelectButton>
                  </TouchableWithoutFeedback>
                ))}
              </RecipientButtonContainer>

              {values.focus === true &&
                (objective === 'PE' ||
                  objective === 'DF' ||
                  objective === 'LI' ||
                  objective === 'LI+T') && (
                  <ExtraContainer>
                    <Header>
                      <HeaderTitle>{`Amostras (${values.samples.length})`}</HeaderTitle>
                      <TouchableWithoutFeedback onPress={() => addSample()}>
                        <Icon size={23} name="add" color="#0095da" />
                      </TouchableWithoutFeedback>
                    </Header>
                    {values.samples.map(item => (
                      <SampleItem key={item.sequencia}>
                        <SampleText>{`Amostra ${item.idUnidade}`}</SampleText>
                        <TouchableWithoutFeedback
                          onPress={() => removeSample(item.sequencia)}
                        >
                          <Icon size={23} name="close" color="#E74040" />
                        </TouchableWithoutFeedback>
                      </SampleItem>
                    ))}
                  </ExtraContainer>
                )}

              <Small>Destino do depósito</Small>
              <ButtonContainer>
                {treatmentOptions.map(item => (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      formRef.current.setFieldValue('treatment', item.id)
                    }
                    key={item.label}
                  >
                    <SelectButton
                      select={values.treatment === item.id ? true : false}
                    >
                      {item.label}
                    </SelectButton>
                  </TouchableWithoutFeedback>
                ))}
              </ButtonContainer>

              {/* {values.treatment === true && <Text>Corno safado</Text>} */}

              {values.treatment === true && methodology === 'PNCD' && (
                <>
                  <ExtraContainer>
                    <Title>Tratamento</Title>
                    <Small>Técnica de tratamento empregada</Small>
                    <ButtonContainer>
                      {treatmentTypeOptions.map(item => (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            formRef.current.setFieldValue(
                              'treatmentType',
                              item.id
                            )
                          }
                          key={item.label}
                        >
                          <SelectButton
                            select={
                              values.treatmentType === item.id ? true : false
                            }
                          >
                            {item.label}
                          </SelectButton>
                        </TouchableWithoutFeedback>
                      ))}
                    </ButtonContainer>
                    <Small>Quantidade de larvicida usado</Small>
                    <Input
                      value={values.quantity}
                      onChangeText={handleChange('quantity')}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit}
                      // errors={errors.password}
                    />
                  </ExtraContainer>
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

export default RecipientForm;
