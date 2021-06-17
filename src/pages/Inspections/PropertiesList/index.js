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
            house: data[index],
            property,
          })
        }
      >
        <Icon size={23} name="plus" color="#0095da" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Vistoria', {
          house: data[index],
          property,
        })
      }
    >
      <StatusContainer color={status.color}>
        <StatusText>{status.text}</StatusText>
      </StatusContainer>
    </TouchableOpacity>
  );
};

const PropertiesList = ({ currentIndex, inspections, routes, ...props }) => {
  const route = useRoute();
  const { street, blockIndex, streetIndex } = route.params;
  const [properties, setProperties] = useState(
    routes[currentIndex].rota[blockIndex].lados[streetIndex].imoveis
  );
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
                // navigation.navigate('Vistoria', {
                //   address: {
                //     street,
                //     blockIndex,
                //     streetIndex,
                //   },
                //   propertyIndex,
                // })
                navigation.navigate('MultiStepForm')
              }
            >
              <Icon size={23} name="plus" color="#0095da" />
            </TouchableOpacity>
            {/* <InspectionStatus data={inspections} property={property} /> */}
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
                  street,
                  blockIndex,
                  streetIndex,
                },
                propertyIndex,
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
