import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text } from 'react-native';
import { format } from 'date-fns';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NetInfo from '@react-native-community/netinfo';

import api from '../../services/api';

import {
  getRouteRequest,
  startActivity,
  endActivity,
} from '../../store/modules/currentActivity/actions';

import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Title,
  Description,
  Card,
  Small,
  ButtonRow,
} from './styles';

const StartActivityButton: React.FC = ({
  user_id,
  activities,
  inspections,
  trabalho_diario_id,
  ...props
}) => {
  const [connState, setConnState] = useState(false);

  const date = format(new Date(), 'yyyy-MM-dd');

  function handleStartActivity() {
    var today = new Date();

    var hh = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    today = hh + ':' + minutes + ':' + ss;

    props.startActivity(activities.dailyActivity.id, today);
  }

  function handleFinishActivity() {
    var today = new Date();

    var hh = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    today = hh + ':' + minutes + ':' + ss;

    props.endActivity(activities.dailyActivity.id, today, inspections);
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
      console.log(connState);
      // setLoading(true);
      const response = await api.get(`/rotas/${user_id}/usuarios/${date}/data`);

      console.log(response.data);
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível buscar as atividades, por favor tente mais tarde.'
      );
    }
    // setLoading(false);
  }, [connState, user_id, date]);

  useEffect(() => {
    if (connState) {
      checkDailyActivities();
    }
    // props.getRouteRequest(user_id, date);
  }, [checkDailyActivities]);

  const navigation = useNavigation();

  return (
    <>
      <Container>
        <Card>
          <Header>
            <Icon size={23} name="calendar-today" color="#3a3c4e" />
            <Title>Planejamento do dia</Title>
          </Header>

          {activities.loading ? (
            <Description>Verificando planejamento do dia...</Description>
          ) : activities.dailyActivity ? (
            <>
              <Small>Metodologia</Small>
              <Description>
                {activities.dailyActivity.atividade.metodologia.sigla}
              </Description>
              <Small>Objetivo</Small>
              <Description>
                {activities.dailyActivity.atividade.objetivo.sigla}
              </Description>
              {activities.isStarted ? (
                <Button type="error" onPress={handleFinishActivity}>
                  Finalizar trabalho diário
                </Button>
              ) : (
                <>
                  <Button type="normal" onPress={handleStartActivity}>
                    Iniciar trabalho diário
                  </Button>
                </>
              )}
              <Button
                style={{ marginTop: 10 }}
                type="normal"
                onPress={() => navigation.navigate('Lista de Quarteirões')}
              >
                Ver quarteirões
              </Button>
            </>
          ) : (
            <Description>
              Você não possui uma rota planejada para hoje
            </Description>
          )}
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  activities: state.currentActivity,
  user_id: state.user.profile.user.id,
  inspections: state.inspections.vistorias,
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
