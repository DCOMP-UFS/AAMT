import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Feather';

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
  DetailsContainer,
  AddContainer,
  AddText,
} from './styles';

const InspectionStatus = ({ property }) => {
  const inspection = property.inspection;

  const message = [
    {
      text: 'Vistoriado',
      pendencia: null,
      color: '#0095da',
    },
    {
      text: 'Fechado',
      pendencia: 'F',
      color: '#FAA33F',
    },
    {
      text: 'Recusado',
      pendencia: 'R',
      color: '#E5454C',
    },
  ];

  var status = {};

  if (inspection) {
    const pendencia = inspection.pendencia;

    pendencia === null && (status = message[0]);
    pendencia === 'R' && (status = message[2]);
    pendencia === 'F' && (status = message[1]);

    return (
      <StatusContainer color={status.color}>
        <StatusText>{status.text}</StatusText>
      </StatusContainer>
    );
  } else {
    return (
      <AddContainer>
        <Icon size={23} name="plus" color="#0095da" />
        <AddText>Vistoriar</AddText>
      </AddContainer>
    );
  }
};

const PropertiesList = ({ currentIndex, inspections, routes, ...props }) => {
  const route = useRoute();
  const { street, blockIndex, streetIndex } = route.params;
  const properties =
    routes[currentIndex].rota[blockIndex].lados[streetIndex].imoveis;
  const navigation = useNavigation();

  return (
    <Container>
      {properties.map((property, propertyIndex) => (
        <Card key={property.id}>
          <Header>
            <TitleContainer>
              <Icon size={23} name="home" color="#3a3c4e" />
              <PropertyTitle>Imóvel {property.id}</PropertyTitle>
            </TitleContainer>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MultiStepForm', {
                  blockIndex,
                  streetIndex,
                  propertyIndex,
                  property,
                  street,
                })
              }
            >
              <InspectionStatus property={property} />
            </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Detalhes do Imóvel', {
                address: {
                  blockIndex,
                  streetIndex,
                  propertyIndex,
                  street,
                },
              })
            }
          >
            <DetailsContainer>
              <Icon
                size={23}
                name="edit"
                color="#0095da"
                style={{ marginRight: 5 }}
              />
              <MoreDetails>Detalhes do imóvel</MoreDetails>
            </DetailsContainer>
          </TouchableOpacity>
        </Card>
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  inspections: state.inspections.vistorias,
  routes: state.routes.routes,
  currentIndex: state.routes.currentRouteIndex,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList);
