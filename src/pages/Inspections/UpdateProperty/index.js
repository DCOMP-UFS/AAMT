import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { editProperty } from '../../../store/modules/routes/actions';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Card, TextContainer, Label } from './styles';

const UpdateProperty = ({ routes, currentIndex, ...props }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { blockIndex, streetIndex, propertyIndex } = route.params;

  const formRef = useRef(null);
  const numberRef = useRef(null);
  const sequenceRef = useRef(null);
  const responsibleRef = useRef(null);
  const complementRef = useRef(null);
  const propertyTypeRef = useRef(null);

  const property =
    routes[currentIndex].rota[blockIndex].lados[streetIndex].imoveis[
      propertyIndex
    ];

  useEffect(() => {
    formRef.current.setFieldValue(
      'number',
      property.numero ? property.numero.toString() : ''
    );
    formRef.current.setFieldValue(
      'sequence',
      property.sequencia ? property.sequencia.toString() : ''
    );
    formRef.current.setFieldValue(
      'responsible',
      property.responsavel ? property.responsavel.toString() : ''
    );
    formRef.current.setFieldValue(
      'complement',
      property.complemento ? property.complemento.toString() : ''
    );
    formRef.current.setFieldValue(
      'propertyType',
      property.tipoImovel ? property.tipoImovel.toString() : ''
    );
  }, []);

  function handleEditProperty(data) {
    console.log(data);
    props.editProperty(blockIndex, streetIndex, propertyIndex, data);
    // const propertyData = {
    //   number,
    //   sequence,
    //   responsible,
    //   complement,
    //   propertyType,
    // };
    // const property_id = property.id;
    // props.editProperty(
    //   property_id,
    //   blockIndex,
    //   streetIndex,
    //   propertyIndex,
    //   propertyData
    // );
    Alert.alert(
      'Operação realizada com sucesso!',
      'As informações do imóvel foram alteradas'
    );
    navigation.goBack();
  }

  return (
    <Container>
      <Card>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        >
          <Formik
            // validationSchema={signInValidationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              number: '',
              sequence: '',
              responsible: '',
              complement: '',
              propertyType: '',
            }}
            innerRef={formRef}
            onSubmit={values => handleEditProperty(values)}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <>
                <Input
                  value={values.number}
                  onChangeText={handleChange('number')}
                  label="Número"
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() => sequenceRef.current?.focus()}
                  errors={errors.number}
                />
                <Input
                  forwardRef={sequenceRef}
                  value={values.sequence}
                  onChangeText={handleChange('sequence')}
                  label="Sequencia"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="send"
                  onSubmitEditing={() => responsibleRef.current?.focus()}
                  errors={errors.sequence}
                />
                <Input
                  forwardRef={responsibleRef}
                  value={values.responsible}
                  onChangeText={handleChange('responsible')}
                  label="Responsável"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="send"
                  onSubmitEditing={() => complementRef.current?.focus()}
                  errors={errors.responsible}
                />
                <Input
                  forwardRef={complementRef}
                  value={values.complement}
                  onChangeText={handleChange('complement')}
                  label="Complemento"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="send"
                  onSubmitEditing={() => propertyTypeRef.current?.focus()}
                  errors={errors.complement}
                />
                <Input
                  forwardRef={propertyTypeRef}
                  value={values.propertyType}
                  onChangeText={handleChange('propertyType')}
                  label="Tipo de imóvel"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                  errors={errors.propertyType}
                />
                <Button onPress={handleSubmit}>Atualizar</Button>
              </>
            )}
          </Formik>
        </ScrollView>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  routes: state.routes.routes,
  currentIndex: state.routes.currentRouteIndex,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editProperty }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProperty);
