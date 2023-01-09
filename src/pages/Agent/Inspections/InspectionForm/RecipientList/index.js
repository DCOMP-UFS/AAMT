import React, { useState } from 'react';
import { Image, TouchableOpacity, Alert, StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addInspectionWithoutPendency, ajustarSequencias } from '../../../../../store/modules/routes/actions';
import {
  changeRecipientIndex,
  deleteRecipient,
  cloneRecipient
} from '../../../../../store/modules/inspectionForm/actions';

import ModalComponent from '../../../../../components/ModalComponent';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';

import testTube from '../../../../../assets/test-tube.png';

import {
  Container,
  EmptyContainer,
  EmptyTitle,
  EmptyDescription,
  AddInspectionButton,
  FinishInspectionButton,
  RecipientContainer,
  RecipientHeader,
  HeaderText,
  ButtonsContainer,
  AddInspection,
  FinishInspection,
  ButtonsRow,
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
} from './styles';

const RecipientList = ({
  form,
  indexes,
  recipients,
  routes,
  currentRouteIndex,
  ...props
}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [showModalClone, setShowModalClone] = useState(false);
  const [ recipientSelected, setRecipientSelected] = useState({})

  function handleFinishInspection() {
    Alert.alert(
      'Atenção!',
      `Tem certeza que deseja finalizar a vistoria neste imóvel?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Finalizar',
          onPress: () => {
            const dailyWorkId = routes[currentRouteIndex].trabalhoDiario.id;
            props.addInspectionWithoutPendency(form, indexes, dailyWorkId);
            navigation.navigate('Lista de imóveis',{ isRouteStarted:true });
          },
        },
      ],
      { cancelable: false }
    );
  }

  function handleDeleteRecipient(recipientSequence, recipient) {
    Alert.alert(
      'Atenção!',
      `Tem certeza que deseja excluir a inspeção realizada neste depósito? \n\n${
        recipient.amostras.length > 0
          ? 'Este depósito possui amostras cadastradas.'
          : ''
      }`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            props.deleteRecipient(recipientSequence);
          },
        },
      ],
      { cancelable: false }
    );
  }

  var RecipientModal = ({ recipient }) => {
    return (
      <>
        <HeaderModal>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <FontAwesome5 size={22} name="times" color="#a6a8ad" />
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
          {/* {recipient.amostras.length === 0 && (
            <>
              <SubtitleModal>Repetir inspeção</SubtitleModal>
              <SubContainer>
                <ColumnContainer>
                  <Input
                    value={repetitions}
                    onChangeText={value => setRepetitions(value)}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity
                    onPress={() => handleRepetitions(index)}
                  >
                    <RepeatButton>Repetir</RepeatButton>
                  </TouchableOpacity>
                </ColumnContainer>
              </SubContainer>
            </>
          )} */}
        </DetailsModal>
      </>
    );
  };

  const cloneRecipientModalValidation = Yup.object().shape({
    number: Yup.number()
          .typeError("Informe um número válido")
          .required('Informe a quantidade de larvicida')
          .integer('Informe um numero inteiro')
          .min(1,'O número min. de clones é 1')
  });

  function createClones (recipient,numberClones){
    var numberClone = +numberClones
    props.cloneRecipient(recipient, numberClone, props.recipientSequence, props.sampleSequence)
    props.ajustarSequencias(numberClone, recipient.amostras.length)
    setShowModalClone(false)
  }

  var CloneRecipientModal = ({ recipient }) => {
    return (
      <>
        <HeaderModal>
          <TouchableOpacity onPress={() => setShowModalClone(false)}>
            <FontAwesome5 size={22} name="times" color="#a6a8ad" />
          </TouchableOpacity>
        </HeaderModal>
        <TitleModal>{` Clonagem do depósito ${recipient.idUnidade}`}</TitleModal>
        <DetailsModal>
            <Formik
              validationSchema={cloneRecipientModalValidation}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{
                number: '',
              }}
              onSubmit={values => createClones(recipient,values.number)}
            >
              {({ handleChange, handleSubmit, errors, values }) => (
                <>
                  <Input
                    value={values.number}
                    onChangeText={handleChange('number')}
                    label="Número de clones"
                    required={true}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    autoCapitalize="none"
                    errors={errors.number}
                  />
                  <Button onPress={handleSubmit}>Salvar</Button>
                </>
              )}
            </Formik>

        </DetailsModal>
      </>
    );
  };

  return (
    <>
      {recipients.length > 0 ? (
        <>
          <StatusBar
            barStyle={visible ? 'light-content' : 'dark-content'}
            backgroundColor={visible ? 'rgba(0,0,0,0.5)' : '#fff'}
          />
          <Container>
            <ButtonsRow>
              <AddInspection
                onPress={() => {
                  props.changeRecipientIndex(-1);
                  navigation.navigate('Inspecionar depósito');
                }}
              >
                Inspecionar recipiente
              </AddInspection>
              <FinishInspection onPress={() => handleFinishInspection()}>
                Finalizar vistoria
              </FinishInspection>
            </ButtonsRow>
            <ModalComponent visible={visible}>
              <RecipientModal recipient={recipientSelected} />
            </ModalComponent>
            <ModalComponent visible={showModalClone}>
              <CloneRecipientModal recipient={recipientSelected} />
            </ModalComponent>
            {recipients.map((recipient, index) => (
              <RecipientContainer key={index}>
                <RecipientHeader>
                  <HeaderText>{`Depósito ${recipient.sequencia}`}</HeaderText>
                </RecipientHeader>
                <ButtonsContainer>
                  <TouchableOpacity
                    onPress={() => {
                      setRecipientSelected(recipient)
                      setShowModalClone(true)
                    }}
                  >
                    <FontAwesome5
                      size={23}
                      name="clone"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      handleDeleteRecipient(recipient.sequencia, recipient)
                    }
                  >
                    <FontAwesome5 name="trash-alt" size={22} color="#E73F5D" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      props.changeRecipientIndex(index);
                      navigation.navigate('Inspecionar depósito');
                    }}
                  >
                    <FontAwesome5 name="edit" size={22} color="#585666" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setRecipientSelected(recipient)
                    setVisible(true)
                    }}>
                    <FontAwesome5
                      name="info-circle"
                      size={22}
                      color="#585666"
                    />
                  </TouchableOpacity>
                </ButtonsContainer>
              </RecipientContainer>
            ))}
          </Container>
        </>
      ) : (
        <EmptyContainer>
          <Image
            source={testTube}
            style={{
              resizeMode: 'contain',
              width: 230,
              height: 130,
              marginBottom: 20,
              tintColor: '#999999',
            }}
          />
          <EmptyTitle>Ainda não há depósitos cadastrados</EmptyTitle>
          <EmptyDescription>
            Clique no botão abaixo para começar a registrar a inspeção nos
            depósitos
          </EmptyDescription>
          <AddInspectionButton
            onPress={() => {
              props.changeRecipientIndex(-1);
              navigation.navigate('Inspecionar depósito');
            }}
          >
            Inspecionar depósito
          </AddInspectionButton>
          <FinishInspectionButton onPress={() => handleFinishInspection()}>
            Finalizar vistoria
          </FinishInspectionButton>
        </EmptyContainer>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  form: state.inspectionForm.form,
  indexes: state.inspectionForm.indexes,
  recipients: state.inspectionForm.form.recipientes,
  sampleSequence: state.routes.sampleSequence,
  recipientSequence: state.routes.recipientSequence,
  routes: state.routes.routes,
  currentRouteIndex: state.routes.currentRouteIndex,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { 
      addInspectionWithoutPendency, 
      changeRecipientIndex, 
      deleteRecipient,
      cloneRecipient,
      ajustarSequencias,
     },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientList);
