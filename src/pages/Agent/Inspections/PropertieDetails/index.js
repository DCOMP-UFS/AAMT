import React, { useState } from 'react';
import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  Card,
  Header,
  TitleContainer,
  PropertyTitle,
  RowPair,
  HalfPair,
  FullPair,
  Small,
  Description,
  EditButton,
} from './styles';

const PropertieDetails = () => {
  const [propertyTypesOptions, setPropertyTypesOptions] = useState([
    { id: 1, name: 'Residencial' },
    { id: 2, name: 'Terreno Baldio' },
    { id: 3, name: 'Comercial' },
    { id: 4, name: 'Ponto estratégico' },
  ]);

  const route = useRoute();
  const navigation = useNavigation();

  const { property } = route.params;

  return (
    <Container>
      <Card>
        <Header>
          <TitleContainer>
            <FontAwesome5 size={21} name="home" color="#585666" />
            <PropertyTitle>Imóvel {property.id}</PropertyTitle>
          </TitleContainer>
        </Header>
        <RowPair>
          <HalfPair>
            <Small>Número</Small>
            <Description>{property.numero}</Description>
          </HalfPair>
          <HalfPair>
            <Small>Sequência</Small>
            {property.sequencia ? (
              <Description>{property.sequencia}</Description>
            ) : (
              <Description>-</Description>
            )}
          </HalfPair>
        </RowPair>
        <FullPair>
          <Small>Tipo de imóvel</Small>
          {property.tipoImovel ? (
            <Description>
              {propertyTypesOptions[property.tipoImovel - 1].name}
            </Description>
          ) : (
            <Description>-</Description>
          )}
        </FullPair>
        <FullPair>
          <Small>Complemento</Small>
          {property.complemento ? (
            <Description>{property.complemento}</Description>
          ) : (
            <Description>-</Description>
          )}
        </FullPair>
        <FullPair>
          <Small>Responsável do imóvel</Small>
          {property.responsavel ? (
            <Description>{property.responsavel}</Description>
          ) : (
            <Description>-</Description>
          )}
        </FullPair>
        <EditButton
          onPress={() => navigation.navigate('Editar imóvel', { property })}
        >
          Editar imóvel
        </EditButton>
      </Card>
    </Container>
  );
};

export default PropertieDetails;
