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
import { cos } from 'react-native-reanimated';

const StartActivityButton = ({
  user_id,
  activity,
  isStarted,
  inspections,
  trabalho_diario_id,
  loading,
  ...props
}) => {
  const [connState, setConnState] = useState(false);
  // const [loading, setLoading] = useState(false);

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
    if (connState) {
      const time = getActualHours();

      props.startActivity(activity.trabalhoDiario.id, time);
    } else {
      Alert.alert(
        'Ocorreu um erro!',
        'Você precisa estar conectado á internet para iniciar esta rota'
      );
    }
  }

  function handleFinishActivity() {
    if (connState) {
      const time = getActualHours();

      props.endActivity(activity.trabalhoDiario.id, time, inspections);
    } else {
      Alert.alert(
        'Ocorreu um erro!',
        'Você precisa estar conectado á internet para finalizar esta rota'
      );
    }
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

  useEffect(() => {
    if (connState) {
      if (!isStarted) {
        props.getRouteRequest(user_id, date);
        // checkDailyactivity();
      } else {
        // setActivity(activity);
      }
    }
    if (!connState && isStarted) {
      // setActivity(activity);
    }
  }, [connState, isStarted]);

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
  activity: state.currentActivity.dailyActivity,
  isStarted: state.currentActivity.isStarted,
  user_id: state.user.profile.user.id,
  inspections: state.inspections.vistorias,
  loading: state.currentActivity.loading,
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
