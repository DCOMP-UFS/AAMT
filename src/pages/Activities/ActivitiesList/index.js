import React, { useEffect, useState, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../../services/api';

import Icon from 'react-native-vector-icons/Feather';

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
  ActivitySummaryButton,
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
      <Container>
        <List
          data={activities}
          keyExtractor={activity => String(activity.id)}
          renderItem={({ item }) => (
            <Card>
              <Header>
                <TitleContainer>
                  <Icon size={23} name="file-text" color="#3a3c4e" />
                  <PropertyTitle>{parseDate(item.data)}</PropertyTitle>
                </TitleContainer>
              </Header>
              <CardRow>
                <DetailsColumn>
                  <Label>Jornada de trabalho</Label>
                  <Small>{`${item.horaInicio ? item.horaInicio : '-- : --'} à ${
                    item.horaFim ? item.horaFim : '-- : -- '
                  }`}</Small>
                </DetailsColumn>
                <DetailsColumn>
                  <Label>Metodologia - Objetivo</Label>
                  <Small>{`${item.equipe.atividade.metodologia.sigla} - ${item.equipe.atividade.objetivo.sigla}`}</Small>
                </DetailsColumn>
              </CardRow>
              {item.horaFim && (
                <ActivitySummaryButton
                  onPress={() =>
                    navigation.navigate('Resumo da atividade', {
                      id: item.id,
                      date: parseDate(item.data),
                    })
                  }
                >
                  Resumo da atividade
                </ActivitySummaryButton>
              )}
            </Card>
          )}
        />
      </Container>
    </>
  );
};

export default ActivitiesList;
