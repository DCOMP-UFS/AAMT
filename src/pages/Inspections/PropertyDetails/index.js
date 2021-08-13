import React from 'react';
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
  EditContainer,
  EditText,
} from './styles';

const PropertyDetails = ({ routes, currentIndex, ...props }) => {
  const route = useRoute();
  const {
    blockIndex,
    streetIndex,
    propertyIndex,
    street,
  } = route.params.address;
  const navigation = useNavigation();
  const property =
    routes[currentIndex].rota[blockIndex].lados[streetIndex].imoveis[
      propertyIndex
    ];

  return (
    <Container>
      <Card>
        <Header>
          <TitleContainer>
            <Icon size={23} name="home" color="#3a3c4e" />
            <PropertyTitle>Imóvel {property.id}</PropertyTitle>
          </TitleContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Atualizar imóvel', {
                blockIndex,
                streetIndex,
                propertyIndex,
              })
            }
          >
            <EditContainer>
              <Icon size={23} name="edit" color="#0095da" />
              <EditText>Editar imóvel</EditText>
            </EditContainer>
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
        <Label>Responsável do imóvel</Label>
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
  routes: state.routes.routes,
  currentIndex: state.routes.currentRouteIndex,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
