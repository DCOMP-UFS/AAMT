import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { editProperty } from '../../../store/modules/activityRoutes/actions';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Card, TextContainer, Label } from './styles';

const UpdateProperty = ({ routes, ...props }) => {
  const [number, setNumber] = useState(null);
  const [sequence, setSequence] = useState(null);
  const [responsible, setResponsible] = useState(null);
  const [complement, setComplement] = useState(null);
  const [propertyType, setPropertyType] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const { blockIndex, streetIndex, propertyIndex } = route.params;

  const property = routes[blockIndex].lados[streetIndex].imoveis[propertyIndex];

  useEffect(() => {
    setNumber(property.numero ? property.numero.toString() : null);
    setSequence(property.sequencia ? property.sequencia.toString() : null);
    setResponsible(property.responsavel);
    setComplement(property.complemento);
    setPropertyType(
      property.tipoImovel ? property.tipoImovel.toString() : null
    );
  }, []);

  function handleSubmit() {
    const propertyData = {
      number,
      sequence,
      responsible,
      complement,
      propertyType,
    };
    const property_id = property.id;
    props.editProperty(
      property_id,
      blockIndex,
      streetIndex,
      propertyIndex,
      propertyData
    );
    navigation.goBack();
  }

  return (
    <Container>
      <Card>
        <TextContainer>
          <Label>Número</Label>
          <Input
            value={number}
            onChangeText={setNumber}
            keyboardType="number-pad"
            returnKeyType="send"
          />
        </TextContainer>
        <TextContainer>
          <Label>Sequência (Imóvel)</Label>
          <Input
            value={sequence}
            onChangeText={setSequence}
            keyboardType="default"
            returnKeyType="send"
          />
        </TextContainer>
        <TextContainer>
          <Label>Tipo de imóvel</Label>
          <Input
            value={propertyType}
            onChangeText={setPropertyType}
            keyboardType="default"
            returnKeyType="send"
          />
        </TextContainer>
        <TextContainer>
          <Label>Complemento</Label>
          <Input
            value={complement}
            onChangeText={setComplement}
            keyboardType="default"
            returnKeyType="send"
          />
        </TextContainer>
        <TextContainer>
          <Label>Responsável</Label>
          <Input
            value={responsible}
            onChangeText={setResponsible}
            keyboardType="default"
            returnKeyType="send"
          />
        </TextContainer>
        <Button color="#0095DA" textColor="#fff" onPress={() => handleSubmit()}>
          Concluir
        </Button>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({ routes: state.activityRoutes.routes });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editProperty,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProperty);
