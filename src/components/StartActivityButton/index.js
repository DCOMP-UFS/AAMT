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
import { format, parseISO, isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api';
import getTotalProperties from '../../utils/getTotalProperties';
import ModalComponent from '../../components/ModalComponent';

import emptyState from '../../assets/empty-state.png';
import noInternet from '../../assets/no-internet.png';

import {
  startRouteRequest,
  removeFinishedRoute,
  setCurrentRoute,
} from '../../store/modules/routes/actions';

import Button from '../../components/Button';

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
  LoadingComponent,
  EmptyContainer,
  EmptyTitle,
  EmptyDescription,
} from './styles';

// const StartActivityButton = ({
//   user_id,
//   activity,
//   isStarted,
//   inspections,
//   trabalho_diario_id,
//   loading,
//   routes,
//   ...props
// }) => {
const StartActivityButton = ({
  user_id,
  routes,
  loadingStartRoute,
  currentRouteIndex,
  ...props
}) => {
  const [connState, setConnState] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

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

  function handleStartActivity(route) {
    if (connState) {
      const time = getActualHours();
      const dailyWorkId = route.trabalhoDiario.id;

      props.startRouteRequest(route, dailyWorkId, time);
    } else {
      Alert.alert(
        'Ocorreu um erro!',
        'Você precisa estar conectado á internet para iniciar esta rota'
      );
    }
  }

  // function handleFinishActivity() {
  //   if (connState) {
  //     const [routeLength, inspectionLength] = agentPerformance();
  //     var confirmationMessage = '';

  //     if (inspectionLength < routeLength) {
  //       confirmationMessage = `Você ainda possui ${
  //         routeLength - inspectionLength
  //       } vistorias pendentes.`;
  //     }

  //     const time = getActualHours();

  //     Alert.alert(
  //       'Atenção!',
  //       `Tem certeza que deseja finalizar esta rota? ${confirmationMessage}`,
  //       [
  //         {
  //           text: 'Não',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Sim',
  //           onPress: () =>
  //             props.endActivity(activity.trabalhoDiario.id, time, inspections),
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   } else {
  //     Alert.alert(
  //       'Ocorreu um erro!',
  //       'Você precisa estar conectado á internet para finalizar esta rota'
  //     );
  //   }
  // }

  // function agentPerformance() {
  //   var routeLength = 0;
  //   var inspectionsLength = inspections.length;

  //   routes.map(route => {
  //     var lados = route.lados;
  //     lados.map(lado => {
  //       routeLength += lado.imoveis.length;
  //     });
  //   });

  //   return [routeLength, inspectionsLength];
  // }

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

  async function getDailyWork() {
    try {
      const response = await api.get(`/rotas/${user_id}/usuarios/${date}/data`);

      if (
        response.data.trabalhoDiario &&
        response.data.trabalhoDiario.horaFim === null
      ) {
        setActivities([response.data]);
      }

      console.log(JSON.stringify(response.data));
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível listar o trabalho diário'
      );
    }
  }

  async function verifyRouteStatus(trabalho_diario_id) {
    var routeStatus = false;

    try {
      const response = await api.get(`/trabalhoDiario/${trabalho_diario_id}`);

      if (response.data.data && response.data.data.horaFim === null) {
        routeStatus = true;
      }
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível listar o trabalho diário'
      );
    }
    return routeStatus;
  }

  useEffect(() => {
    async function verifyConditions() {
      setLoading(true);
      const index = routes.findIndex(
        p => p.trabalhoDiario.usuario_id === user_id
      );

      console.log('index -> ' + index);

      if (index >= 0) {
        props.setCurrentRoute(index);
        const trabalho_diario_id = routes[index].trabalhoDiario.id;
        const route_date = routes[index].trabalhoDiario.data;
        const routeFromToday = isToday(parseISO(route_date));

        if (connState) {
          const isRouteOpen = await verifyRouteStatus(trabalho_diario_id);

          if (isRouteOpen) {
            if (routeFromToday) {
              console.log('1 -> entrou aqui');
              setActivities([routes[index]]);
            } else {
              console.log('2 -> entrou aqui');
              // ROTA ANTIGA EM ABERTO - Informar que precisa encerrar a vistoria
              Alert.alert(
                'Atenção!',
                'A rota exibida a seguir é de uma data anterior ao dia de hoje e ainda não foi finalizada. Por favor, encerre esta rota.'
              );
            }
          } else {
            console.log('3 -> entrou aqui');
            props.removeFinishedRoute(trabalho_diario_id);
            setActivities([]);
            Alert.alert(
              'Atenção!',
              'As vistorias que constavam neste dispositivo e já estão finalizadas foram excluídas deste dispositivo.'
            );
            // ROTA ANTIGA ENCERRADA - Limpar cache do usuário
          }
        }
        if (connState === false) {
          if (routeFromToday) {
            console.log('4 -> entrou aqui');
            setActivities([routes[index]]);
          } else {
            console.log('5 -> entrou aqui');
            // Tem que ativar a internet para finalizar vistoria
          }
        }
      } else {
        if (connState) {
          console.log('6 -> entrou aqui');
          await getDailyWork();
        }
        if (connState === false) {
          console.log('7 -> entrou aqui');
        }
      }
      setLoading(false);
    }
    verifyConditions();
  }, [connState, currentRouteIndex, routes]);

  function formatDate(date) {
    const formattedDate = format(parseISO(date), 'dd/MM/yyyy');

    return formattedDate;
  }

  const ActivityComponent = () => {
    return activities.map(activity => (
      <Card key={activity.trabalhoDiario.id}>
        <Header>
          <FontAwesome5 name="route" size={23} color="#3a3c4e" />
          <Title>{formatDate(activity.trabalhoDiario.data)}</Title>
        </Header>
        <Pair>
          <Small>Metodologia - Objetivo</Small>
          <Description>
            {`${activity.trabalhoDiario.atividade.metodologia.sigla} - ${activity.trabalhoDiario.atividade.objetivo.sigla}`}
          </Description>
        </Pair>
        <ButtonRow>
          {!activity.trabalhoDiario.horaInicio ? (
            <RouteButton
              type="confirm"
              loading={loadingStartRoute}
              onPress={() => handleStartActivity(activity)}
            >
              Iniciar rota
            </RouteButton>
          ) : (
            <RouteButton type="error" onPress={() => handleFinishActivity()}>
              Encerrar rota
            </RouteButton>
          )}
          {activity.trabalhoDiario.horaInicio ? (
            <RouteButton
              onPress={() =>
                navigation.navigate('Rota', {
                  isStarted: activity.trabalhoDiario.horaInicio,
                })
              }
            >
              Vistorias
            </RouteButton>
          ) : (
            <RouteButton
              onPress={() =>
                navigation.navigate('Rota', {
                  rota: activity.rota,
                  isStarted: activity.trabalhoDiario.horaInicio,
                })
              }
            >
              Ver rota
            </RouteButton>
          )}
        </ButtonRow>
      </Card>
    ));
  };

  // const ProgressBarComponent = () => {
  //   const inspectionsSize = inspections.length;
  //   const propertiesSize = getTotalProperties();
  //   const percentage = Math.ceil((inspectionsSize / propertiesSize) * 100);

  //   return (
  //     <>
  //       <Header>
  //         <FontAwesome5 size={23} name="check-circle" color="#3a3c4e" />
  //         <Title>Progresso da vistoria</Title>
  //       </Header>
  //       <BarContainer>
  //         <DescriptionContainer>
  //           <PercentageText>{`${inspectionsSize} de ${propertiesSize} imóveis vistoriados`}</PercentageText>
  //           <PercentageText>{`${percentage}%`}</PercentageText>
  //         </DescriptionContainer>
  //         <OutsideBar>
  //           <InsideBar percentage={percentage} />
  //         </OutsideBar>
  //       </BarContainer>
  //     </>
  //   );
  // };

  const EmptyState = () => {
    return (
      <EmptyContainer>
        {connState && (
          <>
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
              Você não possui rotas planejadas para hoje. Que tal voltar mais
              tarde?
            </EmptyDescription>
          </>
        )}
        {connState === false && (
          <>
            <Image
              source={noInternet}
              style={{
                resizeMode: 'contain',
                width: 270,
                height: 160,
                marginBottom: 20,
                tintColor: '#999999',
              }}
            />
            <EmptyTitle>Ohh... não tem internet!</EmptyTitle>
            <EmptyDescription>
              Precisamos que conecte-se com a internet para sabermos se existe
              uma rota planejada para você hoje.
            </EmptyDescription>
          </>
        )}
      </EmptyContainer>
    );
  };

  return (
    <>
      <Container>
        {loading ? (
          <LoadingComponent />
        ) : activities.length > 0 ? (
          <ActivityComponent />
        ) : (
          <EmptyState />
        )}
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  // activity: state.currentActivity.dailyActivity,
  // routes: state.currentActivity.routes,
  // isStarted: state.currentActivity.isStarted,
  user_id: state.user.profile.id,
  routes: state.routes.routes,
  currentRouteIndex: state.routes.currentRouteIndex,
  loadingStartRoute: state.routes.loadingStartRoute,
  // inspections: state.inspections.vistorias,
  // loading: state.currentActivity.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startRouteRequest,
      removeFinishedRoute,
      setCurrentRoute,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartActivityButton);
