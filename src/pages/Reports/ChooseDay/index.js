import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-native-date-picker'
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';

import { Container, Card } from './styles';

const ChooseDay = () => {

  let dateToday = new Date()
  dateToday.setHours(0,0,0,0)

  const [date, setDate] = useState(dateToday);
  

  const navigation = useNavigation();
  const route = useRoute();
  const { equipe_id } = route.params;

  function handleSubmit() {
    let data = date.toISOString().split("T")[0]
    navigation.navigate('Boletim Diário por Equipe', {
      equipe_id,
      data
    })
  }

  

  return (
    <Container>
      <Card>
        <DatePicker
          mode="date"
          date={date}
          onDateChange={setDate}
        />
        <Button onPress={handleSubmit}>Consultar boletim</Button> 
      </Card>
    </Container>
  );
};

export default ChooseDay;
