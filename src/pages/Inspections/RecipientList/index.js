import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { removeRecipient } from '../../../store/modules/inspections/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../../../components/Button';

import {
  Container,
  Card,
  Header,
  HeaderTitle,
  RecipientContainer,
  RecipientItem,
  RecipientText,
  RecipientOptions,
  NoRecipientText,
  NoRecipientContainer,
} from './styles';

const RecipientList = ({
  sequencia,
  inspections,
  trabalho_diario_id,
  ...props
}) => {
  const [recipients, setRecipients] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { imovel_id, house } = route.params;

  function removeRecipient(recipientSequence) {
    const propertyIndex = inspections.findIndex(p => p.imovel.id === imovel_id);
    props.removeRecipient(propertyIndex, recipientSequence);
  }

  function finishInspection() {
    navigation.navigate('Lista de Imóveis');
    Alert.alert('Operação concluída!', 'Você finalizou uma vistoria');
  }

  useEffect(() => {
    const index = inspections.findIndex(p => p.imovel.id === imovel_id);

    if (index >= 0) {
      setRecipients(inspections[index].recipientes);
    }
  }, [inspections]);

  return (
    <Container>
      <Card>
        <Header>
          <HeaderTitle>Lista de depósitos</HeaderTitle>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Cadastrar Recipiente', {
                imovel_id,
              })
            }
          >
            <Icon size={23} name="add" color="#0095da" />
          </TouchableWithoutFeedback>
        </Header>
        <RecipientContainer>
          {recipients.length !== 0 ? (
            recipients.map((recipient, index) => (
              <RecipientItem key={index}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('Cadastrar Recipiente', {
                      imovel_id,
                      recipientSequence: recipient.sequencia,
                      recipientExistent: recipient,
                    })
                  }
                >
                  <RecipientText>{`Depósito ${recipient.sequencia}`}</RecipientText>
                </TouchableWithoutFeedback>
                <RecipientOptions>
                  <TouchableWithoutFeedback
                    onPress={() => removeRecipient(recipient.sequencia)}
                  >
                    <Icon size={23} name="close" color="#E74040" />
                  </TouchableWithoutFeedback>
                </RecipientOptions>
              </RecipientItem>
            ))
          ) : (
            <NoRecipientContainer>
              <Icon size={60} name="receipt-long" color="#C6CDD3" />
              <NoRecipientText>
                Não há depósitos cadastrados para este imóvel
              </NoRecipientText>
            </NoRecipientContainer>
          )}
        </RecipientContainer>
      </Card>
      <Button onPress={() => finishInspection()}>Concluir vistoria</Button>
    </Container>
  );
};

const mapStateToProps = state => ({
  sequencia: state.inspections.sequenciaVistoria,
  inspections: state.inspections.vistorias,
  trabalho_diario_id: state.currentActivity.dailyActivity.trabalhoDiario.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeRecipient,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientList);
