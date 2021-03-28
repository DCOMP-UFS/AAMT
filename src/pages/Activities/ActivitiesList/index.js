import React, { useEffect, useState, useCallback } from 'react';
import { View, Alert, StatusBar } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../../../components/Button';

import {
  Container,
  Card,
  List,
  Header,
  PropertyTitle,
  TitleContainer,
  CardRow,
  Label,
  Small,
  DetailsColumn,
} from './styles';

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user.profile);

  const loadActivities = useCallback(async () => {
    try {
      const response = await api.get(`/trabalhoDiario/${id}/usuarios`);

      if (response.data.status === 'success') {
        setActivities(response.data.data);
      }
    } catch (err) {
      if (err.response.status === 400) {
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar as atividades'
        );
      }
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  function parseDate(date) {
    return date ? format(parseISO(date), 'dd/MM/yyyy') : '-- / -- / --';
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <List
          data={activities}
          keyExtractor={activity => String(activity.id)}
          renderItem={({ item }) => (
            <Card>
              <Header>
                <TitleContainer>
                  <Icon size={23} name="house" color="#3a3c4e" />
                  <PropertyTitle>Atividade {item.id}</PropertyTitle>
                </TitleContainer>
              </Header>
              <Label>Data</Label>
              <Small>{parseDate(item.data)}</Small>
              <CardRow>
                <DetailsColumn>
                  <Label>Hora início</Label>
                  {item.horaInicio ? (
                    <Small>{item.horaInicio}</Small>
                  ) : (
                    <Small>-- : -- : --</Small>
                  )}
                </DetailsColumn>
                <DetailsColumn>
                  <Label>Hora fim</Label>
                  {item.horaFim ? (
                    <Small>{item.horaFim}</Small>
                  ) : (
                    <Small>-- : -- : --</Small>
                  )}
                </DetailsColumn>
              </CardRow>
              <CardRow>
                <DetailsColumn>
                  <Label>Metodologia</Label>
                  <Small>{item.equipe.atividade.metodologia.sigla}</Small>
                </DetailsColumn>
                <DetailsColumn>
                  <Label>Objetivo</Label>
                  <Small>{item.equipe.atividade.objetivo.sigla}</Small>
                </DetailsColumn>
              </CardRow>
              {item.horaFim && (
                <Button
                  onPress={() =>
                    navigation.navigate('Resumo da atividade', { id: item.id })
                  }
                >
                  Resumo da atividade
                </Button>
              )}
            </Card>
          )}
        />
      </Container>
    </>
  );
};

export default ActivitiesList;
