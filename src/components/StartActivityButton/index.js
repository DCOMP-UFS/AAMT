/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { format } from 'date-fns';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getRouteRequest,
  startActivity,
  endActivity,
} from '../../store/modules/activityRoutes/actions';

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

const StartActivityButton: React.FC = ({ user_id, activities, ...props }) => {
  var date = format(new Date(), 'yyyy-MM-dd');

  function handleStartActivity() {
    var today = new Date();

    var hh = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    today = hh + ':' + minutes + ':' + ss;

    props.startActivity(activities.dailyActivity.id, today);
  }

  function handleFinishActivity() {
    props.endActivity();
  }

  useEffect(() => {
    props.getRouteRequest(user_id, date);
  }, [user_id, date]);

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
                <Button
                  color="#E74040"
                  textColor="#fff"
                  onPress={handleFinishActivity}
                >
                  Finalizar trabalho diário
                </Button>
              ) : (
                <>
                  <Button
                    color="#0095DA"
                    textColor="#fff"
                    onPress={handleStartActivity}
                  >
                    Iniciar trabalho diário
                  </Button>
                  <Button
                    style={{ marginTop: 10 }}
                    color="#0095DA"
                    textColor="#fff"
                    onPress={() => navigation.navigate('Lista de Quarteirões')}
                  >
                    Ver quarteirões
                  </Button>
                </>
              )}
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
  activities: state.activityRoutes,
  user_id: state.user.profile.user.id,
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
