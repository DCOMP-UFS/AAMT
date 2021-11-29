import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';

import { Container, Card } from './styles';

const ChooseWeek = () => {
  const [epiWeekOptions, setEpiWeekOptions] = useState(loadEpiWeek());
  const [yearOptions, setYearOptions] = useState(loadYear());

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const formRef = useRef(null);

  function loadEpiWeek() {
    const weeks = [];
    for (let index = 1; index < 54; index++) {
      weeks.push({ id: index, name: index.toString() });
    }
    return weeks;
  }

  function loadYear() {
    const start_year = new Date(2021, 1, 1).getFullYear();
    const current_year = new Date().getFullYear();
    let optionYear = [];

    for (let index = 0; index <= current_year - start_year; index++) {
      optionYear.push({
        id: start_year + index,
        name: (start_year + index).toString(),
      });
    }

    return optionYear;
  }

  function handleEpiWeekSubmit(data) {
    const { epidemiologicalWeek, selectedYear } = data;
    if (parseInt(epidemiologicalWeek) > 53) {
      Alert.alert(
        'Ocorreu um erro',
        'A quantidade de semanas não pode ser maior que 53'
      );
    } else {
      navigation.navigate('Boletim Semanal', {
        id,
        epidemiologicalWeek,
        selectedYear,
      });
    }
  }

  const epiWeekValidationSchema = Yup.object().shape({
    epidemiologicalWeek: Yup.string().required(
      'Selecione a semana epidemiológica'
    ),
    selectedYear: Yup.string().required('Selecione o ano'),
  });

  return (
    <Container>
      <Card>
        <Formik
          validationSchema={epiWeekValidationSchema}
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            epidemiologicalWeek: '',
            selectedYear: '',
          }}
          onSubmit={values => handleEpiWeekSubmit(values)}
        >
          {({ handleChange, handleSubmit, errors, values }) => (
            <>
              <Dropdown
                itens={epiWeekOptions}
                label="Semana epidemiológica"
                placeholder="Selecione a semana epidemiológica"
                selectedValue={values.epidemiologicalWeek}
                onValueChange={value => {
                  formRef.current.setFieldValue('epidemiologicalWeek', value);
                }}
                errors={errors.epidemiologicalWeek}
              />

              <Dropdown
                itens={yearOptions}
                label="Ano"
                placeholder="Selecione o ano"
                selectedValue={values.selectedYear}
                onValueChange={value => {
                  formRef.current.setFieldValue('selectedYear', value);
                }}
                errors={errors.selectedYear}
              />

              <Button onPress={handleSubmit}>Consultar boletim</Button>
            </>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default ChooseWeek;
