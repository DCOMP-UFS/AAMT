import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  loadInspectionForm,
  loadInspectionEditForm,
} from '../../../../store/modules/inspectionForm/actions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
  StatusContainer,
  StatusText,
  ButtonRow,
  StartInspectionButton,
  SeeInspectionButton,
} from './styles';

const InspectionStatus = ({ property }) => {
  const inspection = property.inspection;

  const message = [
    {
      text: 'Imóvel vistoriado',
      pendencia: null,
      color: '#0095da',
    },
    {
      text: 'Imóvel fechado',
      pendencia: 'F',
      color: '#FAA33F',
    },
    {
      text: 'Vistoria recusada',
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
  }
  return <View />;
};

const PropertiesList = ({ currentIndex, routes, indexes, ...props }) => {
  const { blockIndex, streetIndex } = indexes;
  const properties =
    routes[currentIndex].rota[blockIndex].lados[streetIndex].imoveis;
  const navigation = useNavigation();

  return (
    <Container>
      {properties.map((property, propertyIndex) => (
        <Card key={property.id}>
          <Header>
            <TitleContainer>
              <FontAwesome5 size={21} name="home" color="#3a3c4e" />
              <PropertyTitle>Imóvel {property.id}</PropertyTitle>
            </TitleContainer>
            <InspectionStatus property={property} />
          </Header>
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
          <ButtonRow>
            <StartInspectionButton
              onPress={() => {
                property.inspection
                  ? props.loadInspectionEditForm(
                      propertyIndex,
                      property.inspection
                    )
                  : props.loadInspectionForm(propertyIndex);
                navigation.navigate('Situação da vistoria');
              }}
            >
              {property.inspection ? 'Editar vistoria' : 'Iniciar vistoria'}
            </StartInspectionButton>
            <SeeInspectionButton>Ver detalhes</SeeInspectionButton>
          </ButtonRow>
        </Card>
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  routes: state.routes.routes,
  indexes: state.inspectionForm.indexes,
  currentIndex: state.routes.currentRouteIndex,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadInspectionForm, loadInspectionEditForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList);
