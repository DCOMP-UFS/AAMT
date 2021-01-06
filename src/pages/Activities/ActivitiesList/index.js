import React, { useEffect, useState, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import getToken from '../../../utils/getToken';
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

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user.profile.user);

  const loadActivities = useCallback(async () => {
    try {
      const token = await getToken();

      const response = await api.get(`/trabalhoDiario/${id}/usuarios`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        setActivities(response.data.data);
      }
    } catch (err) {
      Alert.alert('Ocorreu um erro', 'Não foi possível carregar as atividades');
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  function parseDate(date) {
    return date ? format(parseISO(date), 'dd/MM/yyyy') : '-- / -- / --';
  }

  return (
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
                color="#0095DA"
                textColor="#fff"
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
  );
};

export default ActivitiesList;
