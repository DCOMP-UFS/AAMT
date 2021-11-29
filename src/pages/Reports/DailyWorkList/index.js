import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Image } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import api from '../../../services/api';

import emptyState from '../../../assets/empty-state.png';

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
  LoadingComponent,
  LoadingContainer,
  EmptyContainer,
  EmptyTitle,
  EmptyDescription,
} from './styles';

const DailyWorkList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params.id
    ? route.params.id
    : useSelector(state => state.user.profile.id);

  const loadActivities = useCallback(async () => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  function parseDate(date) {
    return date ? format(parseISO(date), 'dd/MM/yyyy') : '-- / -- / --';
  }

  const ListComponent = () => {
    return (
      <List
        data={activities}
        keyExtractor={activity => String(activity.id)}
        renderItem={({ item }) => (
          <Card>
            <Header>
              <TitleContainer>
                <FontAwesome5 size={23} name="file-alt" color="#3a3c4e" />
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
                  navigation.navigate('Boletim Diário', {
                    id: item.id,
                    date: parseDate(item.data),
                  })
                }
              >
                Ver boletim diário
              </ActivitySummaryButton>
            )}
          </Card>
        )}
      />
    );
  };

  const EmptyState = () => {
    return (
      <EmptyContainer>
        <Image
          source={emptyState}
          style={{
            resizeMode: 'contain',
            width: 270,
            height: 160,
            marginBottom: 20,
            tintColor: '#999999',
          }}
        />
        <EmptyTitle>Ohh... que pena!</EmptyTitle>
        <EmptyDescription>
          Não foram encontrados trabalhos diários para este agente.
        </EmptyDescription>
      </EmptyContainer>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Container>
          {activities.length > 0 ? <ListComponent /> : <EmptyState />}
        </Container>
      )}
    </>
  );
};

export default DailyWorkList;
