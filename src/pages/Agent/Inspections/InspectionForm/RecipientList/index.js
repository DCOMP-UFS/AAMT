import React from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addInspectionWithoutPendency } from '../../../../../store/modules/routes/actions';
import {
  changeRecipientIndex,
  deleteRecipient,
} from '../../../../../store/modules/inspectionForm/actions';

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
  TypeContainer,
  TypeText,
  HeaderText,
  ButtonsContainer,
  AddInspection,
  FinishInspection,
  ButtonsRow,
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
            props.addInspectionWithoutPendency(form, indexes);
            navigation.navigate('Lista de Imóveis');
          },
        },
      ],
      { cancelable: false }
    );
  }

  function handleDeleteRecipient(recipientSequence, recipient) {
    Alert.alert(
      'Atenção!',
      `Tem certeza que deseja excluir a inspeção realizada neste depósito? \n${
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

  return (
    <>
      {recipients.length > 0 ? (
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
                <TouchableOpacity>
                  <FontAwesome5 name="info-circle" size={22} color="#585666" />
                </TouchableOpacity>
              </ButtonsContainer>
            </RecipientContainer>
          ))}
        </Container>
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
