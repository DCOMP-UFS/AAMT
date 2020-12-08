import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

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

const InspectionStatus = () => {
  return (
    <StatusContainer>
      <StatusText>Vistoriado</StatusText>
    </StatusContainer>
  );
};

const PropertiesList = () => {
  const route = useRoute();
  const { properties, street } = route.params;
  const navigation = useNavigation();

  return (
    <Container>
      {properties.map(property => (
        <Card key={property.id}>
          <Header>
            <TitleContainer>
              <Icon size={23} name="house" color="#3a3c4e" />
              <PropertyTitle>Imóvel {property.id}</PropertyTitle>
            </TitleContainer>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Vistoria')}
            >
              <Icon size={23} name="add" color="#0095da" />
              {/* <InspectionStatus></InspectionStatus> */}
            </TouchableWithoutFeedback>
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
          <TouchableWithoutFeedback>
            <MoreDetails>Ver detalhes</MoreDetails>
          </TouchableWithoutFeedback>
        </Card>
      ))}
    </Container>
  );
};

export default PropertiesList;
