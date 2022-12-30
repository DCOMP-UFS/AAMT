import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { editProperty } from '../../../../store/modules/routes/actions';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';

import { Container, Card } from './styles';

const PropertieEdit = ({ indexes, ...props }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { property } = route.params;

  const [propertyTypesOptions, setPropertyTypesOptions] = useState([
    { id: 1, name: 'Residencial' },
    { id: 2, name: 'Terreno Baldio' },
    { id: 3, name: 'Comercial' },
    { id: 4, name: 'Ponto estratégico' },
  ]);

  const formRef = useRef(null);
  const sequenceRef = useRef(null);
  const responsibleRef = useRef(null);
  const complementRef = useRef(null);
  const propertyTypeRef = useRef(null);

  const propertyEditValidationSchema = Yup.object().shape({
    number: Yup.string().required('Informe o número do imóvel'),
    propertyType: Yup.string().required('Informe o tipo do imóvel'),
  });

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
      property.tipoImovel
        ? propertyTypesOptions[property.tipoImovel - 1].id
        : ''
    );
  }, []);

  function handlePropertyEdit(data) {
    const f_data = {
      number: parseInt(data.number),
      sequence: parseInt(data.sequence),
      responsible: data.responsible,
      complement: data.complement,
      propertyType: parseInt(data.propertyType),
    };
    Alert.alert(
      'Atenção!',
      `Tem certeza que deseja editar os dados deste imóvel?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Editar',
          onPress: () => {
            const { blockIndex, streetIndex, propertyIndex } = indexes;
            props.editProperty(blockIndex, streetIndex, propertyIndex, f_data);
            navigation.navigate('Lista de imóveis',{ isRouteStarted:true });
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Container>
      <Card>
        <Formik
          validationSchema={propertyEditValidationSchema}
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
          onSubmit={values => handlePropertyEdit(values)}
        >
          {({ handleChange, handleSubmit, errors, values }) => (
            <>
              <Input
                value={values.number}
                onChangeText={handleChange('number')}
                label="Número"
                required={true}
                keyboardType="number-pad"
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
              <Dropdown
                itens={propertyTypesOptions}
                label="Tipo do imóvel"
                placeholder="Selecione o tipo do imóvel"
                required={true}
                selectedValue={values.propertyType}
                onValueChange={value => {
                  formRef.current.setFieldValue('propertyType', value);
                }}
                errors={errors.propertyType}
              />
              <Button onPress={handleSubmit}>Editar imóvel</Button>
            </>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => ({
  indexes: state.inspectionForm.indexes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editProperty }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropertieEdit);
