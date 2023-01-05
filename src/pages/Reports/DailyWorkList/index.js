import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Image } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';

import EmptyState from '../../../components/EmptyState';

import api from '../../../services/api';

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
} from './styles';

const DailyWorkList = () => {
  const [connState, setConnState] = useState();
  const [dailyWorks, setDailyWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params.id
    ? route.params.id
    : useSelector(state => state.user.profile.id);

  const equipe_id = route.params.equipe_id
    ? route.params.equipe_id
    : null

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConnState(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setConnState(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  const loadActivities = useCallback( async () => {
      if(connState === true)
        await getDailyWorks();
      else{
        setDailyWorks([])
      }
  }, [connState]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  function parseDate(date) {
    return date ? format(parseISO(date), 'dd/MM/yyyy') : '-- / -- / --';
  }

  const getDailyWorks = async () => {
    setLoading(true);
    setDailyWorks([])
    try {
      var response = null

      if(equipe_id == null)
        response = await api.get(`/trabalhoDiario/${id}/usuarios`);
      else
        response = await api.get(`/trabalhoDiario/${equipe_id}/equipes/${id}/usuarios`);

      if (response.data.status === 'success') {
        setDailyWorks(response.data.data);
      }
    } catch (err) {
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar os trabalhos diários'
        );  
    }
    setLoading(false);
  }

  const ListComponent = () => {
    return (
      <List
        data={dailyWorks}
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
                <Label>Código da atividade</Label>
                <Small>{`${item.equipe.atividade_id}`}</Small>
              </DetailsColumn>
              <DetailsColumn>
                <Label>Jornada de trabalho</Label>
                <Small>{`${item.horaInicio ? item.horaInicio : '-- : --'} à ${
                  item.horaFim ? item.horaFim : '-- : -- '
                }`}</Small>
              </DetailsColumn>
            </CardRow>
            <CardRow>
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

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Container>
          {dailyWorks.length > 0 ? 
            <ListComponent /> : 
            <EmptyState 
              connState={connState}
              emptyDescription="Não foi encontrado nenhum trabalho diário. Para refazer a busca, aperte o botão abaixo."
              retryButtonText="Buscar Trabalhos"
              retryButtonFunction={getDailyWorks}
            />
          }
        </Container>
      )}
    </>
  );
};

export default DailyWorkList;
