import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

  const index = data.findIndex(p => p.imovel.id === property.id);
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Vistoria', {
            property,
          })
        }
      >
        <Icon size={23} name="add" color="#0095da" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Vistoria', {
          imovel_id: property,
          house: data[index],
        })
      }
    >
      <StatusContainer color={status.color}>
        <StatusText>{status.text}</StatusText>
      </StatusContainer>
    </TouchableOpacity>
  );
};

const PropertiesList = ({ inspections, routes, ...props }) => {
  const route = useRoute();
  const { street, blockIndex, streetIndex } = route.params;
  const properties = routes[blockIndex].lados[streetIndex].imoveis;
  const navigation = useNavigation();

  return (
    <Container>
      {properties.map((property, i) => (
        <Card key={property.id}>
          <Header>
            <TitleContainer>
              <Icon size={23} name="house" color="#3a3c4e" />
              <PropertyTitle>Imóvel {property.id}</PropertyTitle>
            </TitleContainer>
            <InspectionStatus data={inspections} property={property} />
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
                street,
                blockIndex,
                streetIndex,
                propertyIndex: i,
              })
            }
          >
            <MoreDetails>Ver detalhes do imóvel</MoreDetails>
          </TouchableOpacity>
        </Card>
      ))}
    </Container>
  );
};

const mapStateToProps = state => ({
  inspections: state.inspections.vistorias,
  routes: state.activityRoutes.routes,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList);
