import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import getTotalProperties from '../../utils/getTotalProperties';
import ModalComponent from '../../components/ModalComponent';

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
  InfoText,
  OutsideBar,
  InsideBar,
  BarContainer,
  DescriptionContainer,
  PercentageText,
} from './styles';
import { cos } from 'react-native-reanimated';

const StartActivityButton = ({
  user_id,
  activity,
  isStarted,
  inspections,
  trabalho_diario_id,
  loading,
  routes,
  ...props
}) => {
  const [connState, setConnState] = useState(false);
  const [visible, setVisible] = useState(false);

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
      const [routeLength, inspectionLength] = agentPerformance();
      var confirmationMessage = '';

      if (inspectionLength < routeLength) {
        confirmationMessage = `Você ainda possui ${
          routeLength - inspectionLength
        } vistorias pendentes.`;
      }

      const time = getActualHours();

      Alert.alert(
        'Atenção!',
        `Tem certeza que deseja finalizar esta rota? ${confirmationMessage}`,
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () =>
              props.endActivity(activity.trabalhoDiario.id, time, inspections),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Ocorreu um erro!',
        'Você precisa estar conectado á internet para finalizar esta rota'
      );
    }
  }

  function agentPerformance() {
    var routeLength = 0;
    var inspectionsLength = inspections.length;

    routes.map(route => {
      var lados = route.lados;
      lados.map(lado => {
        routeLength += lado.imoveis.length;
      });
    });

    return [routeLength, inspectionsLength];
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
      <InfoText>Você não possui uma rota planejada para hoje</InfoText>
    ) : (
      <InfoText>
        Você não não está conectado a internet. Por favor, reconecte-se.
      </InfoText>
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
        <RouteButton onPress={() => navigation.navigate('Rota')}>
          {isStarted ? 'Vistorias' : 'Ver rota'}
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
          <Small>Metodologia - Objetivo</Small>
          <Description>
            {`${activity.trabalhoDiario.atividade.metodologia.sigla} - ${activity.trabalhoDiario.atividade.objetivo.sigla}`}
          </Description>
        </Pair>
        <ButtonComponent />
      </>
    );
  };

  const ProgressBarComponent = () => {
    const inspectionsSize = inspections.length;
    const propertiesSize = getTotalProperties();
    const percentage = Math.ceil((inspectionsSize / propertiesSize) * 100);

    return (
      <>
        <Header>
          <Icon size={23} name="check-circle" color="#3a3c4e" />
          <Title>Progresso da vistoria</Title>
        </Header>
        <BarContainer>
          <DescriptionContainer>
            <PercentageText>{`${inspectionsSize} de ${propertiesSize} imóveis vistoriados`}</PercentageText>
            <PercentageText>{`${percentage}%`}</PercentageText>
          </DescriptionContainer>
          <OutsideBar>
            <InsideBar percentage={percentage} />
          </OutsideBar>
        </BarContainer>
      </>
    );
  };

  return (
    <>
      <Container>
        {loading ? (
          <Loading />
        ) : activity ? (
          <>
            <Card>
              <ActivityComponent />
            </Card>
            {isStarted && (
              <Card>
                <ProgressBarComponent />
              </Card>
            )}
          </>
        ) : (
          <Card>
            <RouteAvailableMessage />
          </Card>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  activity: state.currentActivity.dailyActivity,
  routes: state.currentActivity.routes,
  isStarted: state.currentActivity.isStarted,
  user_id: state.user.profile.id,
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
