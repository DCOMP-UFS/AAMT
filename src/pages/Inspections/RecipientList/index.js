import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
} from './styles';

const RecipientList = ({ sequencia, inspections, trabalho_diario_id }) => {
  const [recipients, setRecipients] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { imovel_id } = route.params;

  function removeRecipient(recipientSequence) {
    console.log(recipientSequence);
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
          <HeaderTitle>Depósitos</HeaderTitle>
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
          {recipients.map((recipient, index) => (
            <RecipientItem key={index}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('Cadastrar Recipiente', {
                    imovel_id,
                    recipientSequence: recipient.sequencia,
                  })
                }
              >
                <RecipientText>{`Depósito ${recipient.sequencia}`}</RecipientText>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => removeRecipient(recipient.sequencia)}
              >
                <Icon size={23} name="close" color="#E74040" />
              </TouchableWithoutFeedback>
            </RecipientItem>
          ))}
        </RecipientContainer>
      </Card>
      <Button
        color="#0095DA"
        textColor="#fff"
        onPress={() => navigation.navigate('Lista de Imóveis')}
      >
        Prosseguir
      </Button>
    </Container>
  );
};

const mapStateToProps = state => ({
  sequencia: state.inspections.sequenciaVistoria,
  inspections: state.inspections.vistorias,
  trabalho_diario_id: state.activityRoutes.dailyActivity.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // addRecipient,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipientList);
