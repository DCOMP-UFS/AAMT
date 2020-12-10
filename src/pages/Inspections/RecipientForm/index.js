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

import { addRecipient } from '../../../store/modules/inspections/actions';

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

  const [recipientType, setRecipientType] = useState('');
  const [focus, setFocus] = useState('');
  const [treatment, setTreatment] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sample, setSample] = useState([]);
  const [sampleNumber, setSampleNumber] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const { imovel_id, recipientSequence } = route.params;

  function handleSubmit() {
    const recipient = {
      fl_comFoco: focus,
      tipoRecipiente: recipientType,
      fl_tratado: treatment === 'Tratado' ? 'Sim' : 'Não',
      fl_eliminado: treatment === 'Eliminado' ? 'Sim' : 'Não',
      sequencia:
        trabalho_diario_id + '.' + sequencia + '.' + (sequenciaRecipiente + 1),
      tratamento: {
        quantidade: quantity,
        tecnica: treatmentType,
      },
      amostras: sample,
    };

    props.addRecipient(recipient, imovel_id);
    navigation.navigate('Depósitos');
  }

  function addSample() {
    setSample([
      ...sample,
      {
        situacaoAmostra: 1,
        sequencia:
          trabalho_diario_id +
          '.' +
          inspections.length +
          '.' +
          (sequenciaRecipiente + 1) +
          '.' +
          (sampleNumber + 1),
      },
    ]);
    setSampleNumber(sampleNumber + 1);
  }

  function removeSample(sampleSequence) {
    setSample(sample.filter(item => item.sequencia !== sampleSequence));
  }

  // useEffect(() => {
  //   const propertyIndex = inspections.findIndex(p => p.imovel_id === imovel_id);
  //   const recipientIndex = inspections[propertyIndex].recipientes.findIndex(
  //     p => p.sequencia === recipientSequence
  //   );

  //   if (propertyIndex >= 0 && recipientIndex >= 0) {
  //     const recipient = inspections[propertyIndex].recipientes[recipientIndex];
  //     setRecipientType(recipient.tipoRecipiente);
  //     setFocus(recipient.fl_comFoco);
  //     setTreatmentType(recipient.tratamento.tecnica);
  //     setQuantity(recipient.tratamento.quantidade);
  //     recipient.fl_tratado === 'Sim'
  //       ? setTreatment('Tratado')
  //       : setTreatment('Eliminado');
  //   }
  // }, []);

  return (
    <Container>
      <Card>
        <Title>Recipiente</Title>
        <Small>Informe o tipo de recipiente</Small>
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
        <Small>O recipiente possui foco de mosquito?</Small>
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
        <Small>Qual o destino do recipiente?</Small>
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
        {treatment === 'Tratado' && (
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
        <Button color="#0095DA" textColor="#fff" onPress={() => handleSubmit()}>
          Prosseguir
        </Button>
        <SecundaryButton>Cancelar</SecundaryButton>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  sequencia: state.inspections.sequenciaVistoria,
  sequenciaRecipiente: state.inspections.sequenciaRecipiente,
  inspections: state.inspections.vistorias,
  trabalho_diario_id: state.activityRoutes.dailyActivity.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addRecipient,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientForm);
