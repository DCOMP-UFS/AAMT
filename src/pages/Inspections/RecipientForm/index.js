import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import SelectButton from '../../../components/SelectButton';
import SecundaryButton from '../../../components/SecundaryButton';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  addRecipient,
  editRecipient,
} from '../../../store/modules/inspections/actions';

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

const RecipientForm = ({
  sequencia,
  trabalho_diario_id,
  inspections,
  sequenciaRecipiente,
  metodologia,
  ...props
}) => {
  const [recipientOptions, setRecipientOptions] = useState([
    'A1',
    'A2',
    'B',
    'C',
    'D1',
    'D2',
    'E',
  ]);
  const [focusOptions, setFocusOptions] = useState(['Sim', 'Não']);
  const [treatmentOptions, setTreatmentOptions] = useState([
    'Tratado',
    'Eliminado',
  ]);
  const [treatmentTypeOptions, setTreatmentTypeOptions] = useState([
    'Focal',
    'Perifocal',
  ]);

  const [sequence, setSequence] = useState(sequenciaRecipiente);
  const [recipientType, setRecipientType] = useState('');
  const [focus, setFocus] = useState('');
  const [treatment, setTreatment] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sample, setSample] = useState([]);
  const [sampleNumber, setSampleNumber] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const { imovel_id, recipientSequence, recipientExistent } = route.params;

  function handleSubmit() {
    const recipient = {
      fl_comFoco: focus === 'Sim' ? true : false,
      tipoRecipiente: recipientType,
      fl_tratado: treatment === 'Tratado' ? true : false,
      fl_eliminado: treatment === 'Eliminado' ? true : false,
      sequencia: recipientExistent ? sequence : sequence + 1,
      tratamento: {
        quantidade: quantity,
        tecnica: treatmentType === 'Focal' ? 1 : 2,
      },
      amostras: sample,
    };

    if (!recipientExistent) {
      props.addRecipient(recipient, imovel_id);
    } else {
      props.editRecipient(recipient, imovel_id, recipient.sequencia);
    }

    navigation.navigate('Depósitos');
  }

  function addSample() {
    setSample([
      ...sample,
      {
        situacao: 1,
        sequencia: sampleNumber + 1,
      },
    ]);
    setSampleNumber(sampleNumber + 1);
  }

  function removeSample(sampleSequence) {
    setSample(sample.filter(item => item.sequencia !== sampleSequence));
  }

  useEffect(() => {
    if (recipientExistent) {
      const recipient = recipientExistent;
      setRecipientType(recipient.tipoRecipiente);
      setFocus(recipient.fl_comFoco ? 'Sim' : 'Não');
      setTreatmentType(
        recipient.tratamento.tecnica === 1 ? 'Focal' : 'Perifocal'
      );
      setSequence(recipient.sequencia);
      setQuantity(recipient.tratamento.quantidade);
      setSample(recipient.amostras);
      setSampleNumber(recipient.amostras.length);
      recipient.fl_tratado
        ? setTreatment('Tratado')
        : setTreatment('Eliminado');
    }
  }, []);

  return (
    <Container>
      <Card>
        <Title>Depósito</Title>
        <Small>Informe o tipo do depósito</Small>
        <RecipientButtonContainer>
          {recipientOptions.map(item => (
            <TouchableWithoutFeedback
              onPress={() => setRecipientType(item)}
              key={item}
              style={{ marginBottom: 10 }}
            >
              <SelectButton select={recipientType === item ? true : false}>
                {item}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </RecipientButtonContainer>
        <Small>O depósito possui foco de mosquito?</Small>
        <ButtonContainer>
          {focusOptions.map(item => (
            <TouchableWithoutFeedback onPress={() => setFocus(item)} key={item}>
              <SelectButton select={focus === item ? true : false}>
                {item}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </ButtonContainer>
        {focus === 'Sim' && (
          <>
            <ExtraContainer>
              <Header>
                <HeaderTitle>{`Amostras (${sample.length})`}</HeaderTitle>
                <TouchableWithoutFeedback onPress={() => addSample()}>
                  <Icon size={23} name="add" color="#0095da" />
                </TouchableWithoutFeedback>
              </Header>
              {sample.map(item => (
                <SampleItem key={item.sequencia}>
                  <SampleText>{`Amostra ${item.sequencia}`}</SampleText>
                  <TouchableWithoutFeedback
                    onPress={() => removeSample(item.sequencia)}
                  >
                    <Icon size={23} name="close" color="#E74040" />
                  </TouchableWithoutFeedback>
                </SampleItem>
              ))}
            </ExtraContainer>
          </>
        )}
        <Small>Qual o destino do depósito?</Small>
        <ButtonContainer>
          {treatmentOptions.map(item => (
            <TouchableWithoutFeedback
              onPress={() => setTreatment(item)}
              key={item}
            >
              <SelectButton select={treatment === item ? true : false}>
                {item}
              </SelectButton>
            </TouchableWithoutFeedback>
          ))}
        </ButtonContainer>
        {treatment === 'Tratado' && metodologia === 'PNCD' && (
          <>
            <ExtraContainer>
              <Title>Tratamento</Title>
              <Small>Qual a técnica de tratamento empregada?</Small>
              <ButtonContainer>
                {treatmentTypeOptions.map(item => (
                  <TouchableWithoutFeedback
                    onPress={() => setTreatmentType(item)}
                    key={item}
                  >
                    <SelectButton
                      select={treatmentType === item ? true : false}
                    >
                      {item}
                    </SelectButton>
                  </TouchableWithoutFeedback>
                ))}
              </ButtonContainer>
              <Small>Informe a quantidade de inseticida utilizado</Small>
              <Input
                keyboardType="number-pad"
                value={quantity}
                onChangeText={setQuantity}
              />
            </ExtraContainer>
          </>
        )}
        <Button onPress={() => handleSubmit()}>Concluir inspeção</Button>
        {/* <SecundaryButton>Cancelar</SecundaryButton> */}
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  sequencia: state.inspections.sequenciaVistoria,
  sequenciaRecipiente: state.inspections.sequenciaRecipiente,
  inspections: state.inspections.vistorias,
  trabalho_diario_id: state.currentActivity.dailyActivity.trabalhoDiario.id,
  metodologia:
    state.currentActivity.dailyActivity.trabalhoDiario.atividade.metodologia
      .sigla,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addRecipient,
      editRecipient,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientForm);
