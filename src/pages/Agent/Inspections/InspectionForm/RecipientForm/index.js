import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addSampleSequence } from '../../../../../store/modules/routes/actions';
import {
  addRecipientToForm,
  editRecipient,
} from '../../../../../store/modules/inspectionForm/actions';

import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import SelectionButton from '../../../../../components/SelectionButton';
import Dropdown from '../../../../../components/Dropdown';

import {
  Container,
  Card,
  SectionContainer,
  Small,
  ButtonContainer,
  ExtraContainer,
  Header,
  HeaderTitle,
  SampleItem,
  SampleText,
  ErrorMessage,
} from './styles';

const RecipientForm = ({
  routes,
  currentRouteIndex,
  sampleSequence,
  recipientSequence,
  recipientIndex,
  form,
  ...props
}) => {
  const [recipientOptions, setRecipientOptions] = useState([
    { name: 'Tipo A1', id: 1 },
    { name: 'Tipo A2', id: 2 },
    { name: 'Tipo B', id: 3 },
    { name: 'Tipo C', id: 4 },
    { name: 'Tipo D1', id: 5 },
    { name: 'Tipo D2', id: 6 },
    { name: 'Tipo E', id: 7 },
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
  const formRef = useRef(null);

  const objective =
    routes[currentRouteIndex].trabalhoDiario.atividade.objetivo.sigla;
  const methodology =
    routes[currentRouteIndex].trabalhoDiario.atividade.metodologia.sigla;
  const ibgeCode = routes[currentRouteIndex].trabalhoDiario.codigo_municipio;
  const userSequence =
    routes[currentRouteIndex].trabalhoDiario.sequencia_usuario;
  const date = routes[currentRouteIndex].trabalhoDiario.data;
  const dailyWorkSequence = routes[currentRouteIndex].trabalhoDiario.sequencia;

  function formatDate(date) {
    const [year, month, day] = date.split('-');
    return day + month + year;
  }

  function addSampleCode() {
    const samplesInForm = [...formRef.current.values.samples];
    const unity = sampleSequence + 1;
    const sample = {
      idUnidade:
        ibgeCode +
        '.' +
        userSequence +
        '.' +
        formatDate(date) +
        '.' +
        dailyWorkSequence +
        '.' +
        unity,
      situacao: 1,
      sequencia: unity,
    };
    props.addSampleSequence();
    samplesInForm.push(sample);
    formRef.current.setFieldValue('samples', samplesInForm);
  }

  function deleteSampleCode(sampleSequence) {
    Alert.alert(
      'Atenção!',
      `Tem certeza que deseja excluir este código de amostra?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            const samples = [...formRef.current.values.samples];
            formRef.current.setFieldValue(
              'samples',
              samples.filter(p => p.sequencia !== sampleSequence)
            );
          },
        },
      ],
      { cancelable: false }
    );
  }

  const statusValidationSchema = Yup.object().shape({
    recipientType: Yup.string().required('Selecione o tipo do depósito'),
    focus: Yup.boolean().required('Selecione se há ou não foco do mosquito'),
  });

  /**
   * Carregando dados para a edição do formulário
   */

  useEffect(() => {
    if (recipientIndex >= 0) {
      const recipient = form.recipientes[recipientIndex];
      formRef.current.setFieldValue(
        'recipientType',
        recipientOptions[recipient.tipoRecipiente - 1].id
      );
      formRef.current.setFieldValue('focus', recipient.fl_comFoco);
      formRef.current.setFieldValue('samples', recipient.amostras);
      formRef.current.setFieldValue('treatment', recipient.fl_tratado);
      formRef.current.setFieldValue(
        'treatmentType',
        recipient.tratamento.tecnica
      );
      formRef.current.setFieldValue(
        'quantity',
        recipient.tratamento.quantidade.toString()
      );
    }
  }, []);

  /**
   * Submissão do formulário
   */

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
      amostras: data.focus ? data.samples : [],
      idUnidade: recipientSequence,
    };

    if (recipientIndex >= 0) {
      Alert.alert(
        'Atenção!',
        `Tem certeza que deseja editar os dados da inspeção neste recipiente?`,
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              props.editRecipient(recipient, recipientIndex);
              navigation.navigate('Depósitos inspecionados');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.addRecipientToForm(recipient);

      navigation.navigate('Depósitos inspecionados');
    }
  }

  return (
    <Container>
      <Card>
        <Formik
          validationSchema={statusValidationSchema}
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
              <SectionContainer>
                <Small>Tipo do depósito</Small>
                <Dropdown
                  itens={recipientOptions}
                  placeholder="Selecionar tipo de recipiente"
                  selectedValue={values.recipientType}
                  onValueChange={value => {
                    formRef.current.setFieldValue('recipientType', value);
                  }}
                  errors={errors.recipientType}
                />
              </SectionContainer>

              <SectionContainer>
                <Small>Foco de mosquito</Small>
                <ButtonContainer>
                  {focusOptions.map(item => (
                    <TouchableOpacity
                      onPress={() =>
                        formRef.current.setFieldValue('focus', item.id)
                      }
                      key={item.id}
                    >
                      <SelectionButton
                        status={
                          values.focus === item.id ? 'selected' : 'normal'
                        }
                      >
                        {item.label}
                      </SelectionButton>
                    </TouchableOpacity>
                  ))}
                </ButtonContainer>
                {errors.focus && <ErrorMessage>{errors.focus}</ErrorMessage>}
              </SectionContainer>

              <SectionContainer>
                <Small>Destino do depósito</Small>
                <ButtonContainer>
                  {treatmentOptions.map(item => (
                    <TouchableOpacity
                      onPress={() =>
                        formRef.current.setFieldValue('treatment', item.id)
                      }
                      key={item.label}
                    >
                      <SelectionButton
                        status={
                          values.treatment === item.id ? 'selected' : 'normal'
                        }
                      >
                        {item.label}
                      </SelectionButton>
                    </TouchableOpacity>
                  ))}
                </ButtonContainer>
              </SectionContainer>

              {values.treatment === true && methodology === 'PNCD' && (
                <>
                  <SectionContainer>
                    <Small>Técnica de tratamento empregada</Small>
                    <ButtonContainer>
                      {treatmentTypeOptions.map(item => (
                        <TouchableOpacity
                          onPress={() =>
                            formRef.current.setFieldValue(
                              'treatmentType',
                              item.id
                            )
                          }
                          key={item.label}
                        >
                          <SelectionButton
                            status={
                              values.treatmentType === item.id
                                ? 'selected'
                                : 'normal'
                            }
                          >
                            {item.label}
                          </SelectionButton>
                        </TouchableOpacity>
                      ))}
                    </ButtonContainer>
                  </SectionContainer>

                  <SectionContainer>
                    <Small>Quantidade de larvicida usada</Small>
                    <Input
                      value={values.quantity}
                      onChangeText={handleChange('quantity')}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit}
                      // errors={errors.password}
                    />
                  </SectionContainer>
                </>
              )}

              {values.focus === true &&
                (objective === 'PE' ||
                  objective === 'DF' ||
                  objective === 'LI' ||
                  objective === 'LI+T') && (
                  <ExtraContainer>
                    <Header>
                      <HeaderTitle>Gerar códigos das amostras</HeaderTitle>
                      <TouchableOpacity onPress={() => addSampleCode()}>
                        <FontAwesome5 size={22} name="plus" color="#0095da" />
                      </TouchableOpacity>
                    </Header>
                    {values.samples.map(item => (
                      <SampleItem key={item.sequencia}>
                        <SampleText>{`Código ${item.idUnidade}`}</SampleText>
                        <TouchableOpacity
                          onPress={() => deleteSampleCode(item.sequencia)}
                        >
                          <FontAwesome5
                            size={23}
                            name="trash-alt"
                            color="#E74040"
                          />
                        </TouchableOpacity>
                      </SampleItem>
                    ))}
                  </ExtraContainer>
                )}

              <Button onPress={handleSubmit}>
                {recipientIndex >= 0 ? 'Editar inspeção' : 'Concluir inspeção'}
              </Button>
            </>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  routes: state.routes.routes,
  currentRouteIndex: state.routes.currentRouteIndex,
  sampleSequence: state.routes.sampleSequence,
  recipientSequence: state.routes.recipientSequence,
  recipientIndex: state.inspectionForm.indexes.recipientIndex,
  form: state.inspectionForm.form,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addSampleSequence, addRecipientToForm, editRecipient },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientForm);
