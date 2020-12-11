import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Card,
  Header,
  TitleContainer,
  PropertyTitle,
  Label,
  Small,
  CardRow,
  DetailsColumn,
  MoreDetails,
  StatusContainer,
  StatusText,
} from './styles';

const InspectionStatus = ({ data, property }) => {
  const navigation = useNavigation();

  const index = data.findIndex(p => p.imovel.id === property);
  const message = [
    {
      text: 'Vistoriado',
      color: '#0095da',
    },
    {
      text: 'Fechado',
      color: '#FAA33F',
    },
    {
      text: 'Recusado',
      color: '#E5454C',
    },
  ];

  var status = {};

  if (index !== -1) {
    const pendencia = data[index].pendencia;

    pendencia === null ? (status = message[0]) : {};
    pendencia === 'R' ? (status = message[2]) : {};
    pendencia === 'F' ? (status = message[1]) : {};
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Vistoria', { imovel_id: property })}
      >
        <Icon size={23} name="add" color="#0095da" />
      </TouchableWithoutFeedback>
    );
  }
  return (
    <StatusContainer color={status.color}>
      <StatusText>{status.text}</StatusText>
    </StatusContainer>
  );
};

const PropertyDetails = ({ inspections, ...props }) => {
  const route = useRoute();
  const { property, street } = route.params;
  const navigation = useNavigation();

  return (
    <Container>
      <Card>
        <Header>
          <TitleContainer>
            <Icon size={23} name="house" color="#3a3c4e" />
            <PropertyTitle>Imóvel {property.id}</PropertyTitle>
          </TitleContainer>
          <InspectionStatus data={inspections} property={property.id} />
        </Header>
        <Label>Rua</Label>
        <Small>{street}</Small>
        <CardRow>
          <DetailsColumn>
            <Label>Número</Label>
            <Small>{property.numero}</Small>
          </DetailsColumn>
          <DetailsColumn>
            <Label>Sequência (Imóvel)</Label>
            {property.sequencia ? (
              <Small>{property.sequencia}</Small>
            ) : (
              <Small>-</Small>
            )}
          </DetailsColumn>
        </CardRow>
        <Label>Tipo de Imóvel</Label>
        <Small>
          {property.tipoImovel ? (
            <Small>{property.tipoImovel}</Small>
          ) : (
            <Small>-</Small>
          )}
        </Small>
        <Label>Complemento</Label>
        <Small>
          {property.complemento ? (
            <Small>{property.complemento}</Small>
          ) : (
            <Small>-</Small>
          )}
        </Small>
        <Label>Responsável</Label>
        <Small>
          {property.responsavel ? (
            <Small>{property.responsavel}</Small>
          ) : (
            <Small>-</Small>
          )}
        </Small>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  inspections: state.inspections.vistorias,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
