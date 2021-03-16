import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import {
  getRouteRequest,
  startActivity,
  endActivity,
} from '../../store/modules/currentActivity/actions';

import Button from '../../components/Button';
import Loading from '../../components/Loading';

import {
  Container,
  Header,
  Title,
  Description,
  Card,
  Small,
  Pair,
  ButtonRow,
  RouteButton,
  MenuTitle,
} from './styles';

const StartActivityButton = ({
  user_id,
  activities,
  isStarted,
  inspections,
  trabalho_diario_id,
  // loading,
  ...props
}) => {
  const [connState, setConnState] = useState(false);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const date = format(new Date(), 'yyyy-MM-dd');

  function getActualHours() {
    var today = new Date();

    var hh = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    today = hh + ':' + minutes + ':' + ss;

    return today;
  }

  function handleStartActivity() {
    const time = getActualHours();

    props.startActivity(activities.trabalhoDiario.id, time);
  }

  function handleFinishActivity() {
    const time = getActualHours();

    props.endActivity(activities.trabalhoDiario.id, time, inspections);
  }

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

  const checkDailyActivities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/rotas/${user_id}/usuarios/${date}/data`);

      props.getRouteRequest(user_id, date);

      setActivity(response.data);
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível buscar as atividades, por favor tente mais tarde.'
      );
    }
    setLoading(false);
  }, [user_id, date]);

  useEffect(() => {
    if (connState) {
      if (!isStarted) {
        checkDailyActivities();
      } else {
        setActivity(activities);
      }
    }
    if (!connState && isStarted) {
      setActivity(activities);
    }
  }, [connState, isStarted, checkDailyActivities]);

  function formatDate(date) {
    const formattedDate = format(parseISO(date), 'dd/MM/yyyy');

    return formattedDate;
  }

  const RouteAvailableMessage = () => {
    return connState ? (
      <Description>Você não possui uma rota planejada para hoje</Description>
    ) : (
      <Description>
        Você não não está conectado a internet. Por favor, reconecte-se.
      </Description>
    );
  };

  const ButtonComponent = () => {
    return (
      <ButtonRow>
        {!isStarted ? (
          <RouteButton type="confirm" onPress={() => handleStartActivity()}>
            Iniciar rota
          </RouteButton>
        ) : (
          <RouteButton type="error" onPress={() => handleFinishActivity()}>
            Encerrar rota
          </RouteButton>
        )}
        <RouteButton
          onPress={() => navigation.navigate('Lista de Quarteirões')}
        >
          Ver rota
        </RouteButton>
      </ButtonRow>
    );
  };

  const ActivityComponent = () => {
    return (
      <>
        <Header>
          <Icon size={23} name="calendar" color="#3a3c4e" />
          <Title>{formatDate(activity.trabalhoDiario.data)}</Title>
        </Header>
        <Pair>
          <Small>Metodologia</Small>
          <Description>
            {activity.trabalhoDiario.atividade.metodologia.sigla}
          </Description>
        </Pair>
        <Pair>
          <Small>Objetivo</Small>
          <Description>
            {activity.trabalhoDiario.atividade.objetivo.sigla}
          </Description>
        </Pair>
        <ButtonComponent />
      </>
    );
  };

  return (
    <>
      <Container>
        <MenuTitle>Planejamento do dia</MenuTitle>
        <Card>
          {loading ? (
            <Loading />
          ) : activity ? (
            <ActivityComponent />
          ) : (
            <RouteAvailableMessage />
          )}
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  activities: state.currentActivity.dailyActivity,
  isStarted: state.currentActivity.isStarted,
  user_id: state.user.profile.user.id,
  inspections: state.inspections.vistorias,
  // loading: state.currentActivity.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRouteRequest,
      startActivity,
      endActivity,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartActivityButton);
