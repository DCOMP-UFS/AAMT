import React, { useState } from 'react';
import { Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addInspectionWithoutPendency } from '../../../../../store/modules/routes/actions';
import {
  changeRecipientIndex,
  deleteRecipient,
} from '../../../../../store/modules/inspectionForm/actions';

import ModalComponent from '../../../../../components/ModalComponent';

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
            navigation.navigate('Lista de imóveis');
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

  const RecipientModal = ({ recipient, index }) => {
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
            {recipients.map((recipient, index) => (
              <RecipientContainer key={index}>
                <ModalComponent visible={visible}>
                  <RecipientModal recipient={recipient} index={index} />
                </ModalComponent>
                <RecipientHeader>
                  <HeaderText>{`Depósito ${recipient.sequencia}`}</HeaderText>
                </RecipientHeader>
                <ButtonsContainer>
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
                  <TouchableOpacity onPress={() => setVisible(true)}>
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
  routes: state.routes.routes,
  currentRouteIndex: state.routes.currentRouteIndex,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addInspectionWithoutPendency, changeRecipientIndex, deleteRecipient },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientList);
