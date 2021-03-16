import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
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
} from './styles';

const PropertyDetails = ({ inspections, routes, ...props }) => {
  const route = useRoute();
  const {
    street,
    block_number,
    street_id,
    blockIndex,
    streetIndex,
    propertyIndex,
  } = route.params;
  const navigation = useNavigation();
  const property = routes[blockIndex].lados[streetIndex].imoveis[propertyIndex];

  const index = inspections.findIndex(p => p.imovel.id === property.id);
  const inspection = inspections[index];
  var pendencia;
  if (index !== -1) {
    inspection.pendencia === null ? (pendencia = 'Normal') : '';
    inspection.pendencia === 'F' ? (pendencia = 'Fechada') : '';
    inspection.pendencia === 'R' ? (pendencia = 'Recusada') : '';
  }

  return (
    <Container>
      <Card>
        <Header>
          <TitleContainer>
            <Icon size={23} name="home" color="#3a3c4e" />
            <PropertyTitle>Imóvel {property.id}</PropertyTitle>
          </TitleContainer>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Atualizar imóvel', {
                blockIndex,
                streetIndex,
                propertyIndex,
              })
            }
          >
            <Icon size={23} name="edit" color="#0095da" />
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
      {index !== -1 && (
        <Card>
          <TitleContainer>
            <Icon size={23} name="file-text" color="#3a3c4e" />
            <PropertyTitle>Dados da vistoria</PropertyTitle>
          </TitleContainer>
          <Label>Situação da vistoria</Label>
          <Small>
            {inspection.situacaoVistoria === 'N' ? 'Normal' : 'Recuperada'}
          </Small>
          <Label>Pendencia</Label>
          <Small>{pendencia}</Small>
          <Label>Sequencia</Label>
          <Small>{inspection.sequencia}</Small>
          <Label>Hora de entrada</Label>
          <Small>{inspection.horaEntrada}</Small>
          {inspection.recipientes.map(recipiente => (
            <>
              <TitleContainer key={recipiente.sequencia}>
                <Icon size={23} name="droplet" color="#3a3c4e" />
                <PropertyTitle>{`Recipiente ${recipiente.sequencia}`}</PropertyTitle>
              </TitleContainer>
              <Label>Tipo de recipiente</Label>
              <Small>{recipiente.tipoRecipiente}</Small>
              <Label>Foco</Label>
              <Small>{recipiente.fl_comFoco ? 'Sim' : 'Não'}</Small>
              {recipiente.fl_comFoco && <Label>Amostras</Label>}
              {recipiente.fl_comFoco &&
                recipiente.amostras.map(amostra => (
                  <>
                    <Small
                      key={`- Amostra ${amostra.sequencia}`}
                    >{`- Amostra ${amostra.sequencia}`}</Small>
                  </>
                ))}
              <Label>Tratado</Label>
              <Small>{recipiente.fl_tratado ? 'Sim' : 'Não'}</Small>
              {recipiente.fl_tratado && (
                <>
                  <Label>Quantidade de inseticida</Label>
                  <Small>{`${recipiente.tratamento.quantidade} g`}</Small>
                  <Label>Técnica</Label>
                  <Small>
                    {recipiente.tratamento.tecnica === 1
                      ? 'Focal'
                      : 'Perifocal'}
                  </Small>
                </>
              )}
            </>
          ))}
        </Card>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  inspections: state.inspections.vistorias,
  routes: state.currentActivity.routes,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
