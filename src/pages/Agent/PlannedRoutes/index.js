import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { format, parseISO, isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import api from '../../../services/api';

import {
  Container,
  Header,
  Title,
  Description,
  Card,
  Content,
  Small,
  FullPair,
  HalfPair,
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
  StartRouteButton,
  EndRouteButton,
  RouteCard,
  RouteHeader,
  RouteContent,
  RouteTitle,
  RowPair,
  PercentageTextContainer,
  LoadingContainer,
} from './styles';

import {
  startRouteRequest,
  removeFinishedRoute,
  setCurrentRoute,
  finishDailyWork,
} from '../../../store/modules/routes/actions';

import getActualTime from '../../../utils/getActualTime';

// import { Container } from './styles';

const PlannedRoutes = ({
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

  function formatDate(date) {
    const formattedDate = format(parseISO(date), 'dd/MM/yyyy');

    return formattedDate;
  }

  function createInspectionsArray() {
    const time = getActualTime();
    const dailyWorkId = routes[currentRouteIndex].trabalhoDiario.id;
    const route = routes[currentRouteIndex].rota;
    const inspections = [];

    route.map(block => {
      const streets = block.lados;
      streets.map(street => {
        const properties = street.imoveis;
        properties.map(property => {
          if (property.inspection) {
            const imovel = {
              id: property.id,
              numero: property.numero,
              sequencia: property.sequencia,
              responsavel: property.responsavel,
              complemento: property.complemento,
              tipoImovel: property.tipoImovel,
            };
            const inspection = { ...property.inspection, imovel };
            inspections.push(inspection);
          }
        });
      });
    });
    props.finishDailyWork(inspections, time, dailyWorkId, currentRouteIndex);
  }

  function handleStartActivity(route) {
    if (connState) {
      const time = getActualTime();
      const dailyWorkId = route.trabalhoDiario.id;

      props.startRouteRequest(route, dailyWorkId, time);

      Alert.alert(
        'Trabalho diário iniciado com sucesso!',
        'Tenha um bom dia de trabalho!'
      );
    } else {
      Alert.alert(
        'Ocorreu um erro!',
        'Você precisa estar conectado á internet para iniciar esta rota'
      );
    }
  }

  function agentPerformance() {
    var routeLength = 0;
    var inspectionsLength = 0;

    const rota = routes[currentRouteIndex].rota;

    rota.map(route => {
      const lados = route.lados;
      lados.map(lado => {
        routeLength += lado.imoveis.length;
        const imoveis = lado.imoveis;
        imoveis.map(imovel => {
          if (imovel.inspection) {
            inspectionsLength += 1;
          }
        });
      });
    });

    return [routeLength, inspectionsLength];
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
            onPress: () => createInspectionsArray(),
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
        if (response.data.trabalhoDiario.horaInicio) {
          handleStartActivity(response.data);
        }
      }
    } catch (err) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível listar o trabalho diário'
      );
    }
  }

  async function verifyRouteStatus(dailyWorkId) {
    var routeStatus = false;

    try {
      const response = await api.get(`/trabalhoDiario/${dailyWorkId}`);

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
    async function manageRoutes() {
      setLoading(true);

      const index = routes.findIndex(
        p => p.trabalhoDiario.usuario_id === user_id
      );

      if (index >= 0) {
        props.setCurrentRoute(index);
        const dailyWorkId = routes[index].trabalhoDiario.id;
        const routeDate = routes[index].trabalhoDiario.data;
        const isThisRouteFromToday = isToday(parseISO(routeDate));

        if (connState) {
          const isRouteOpen = await verifyRouteStatus(dailyWorkId);

          if (isRouteOpen) {
            if (isThisRouteFromToday) {
              setActivities([routes[index]]);
            } else {
              setActivities([routes[index]]);
              // ROTA ANTIGA EM ABERTO - Informar que precisa encerrar a vistoria
              // Colocar componente amarelo de alerta!
            }
          } else {
            // ROTA ANTIGA ENCERRADA - Limpar cache do usuário
            props.removeFinishedRoute(dailyWorkId);
            setActivities([]);
            Alert.alert(
              'Atenção!',
              'As vistorias que constavam neste dispositivo e já estão finalizadas foram excluídas deste dispositivo.'
            );
          }
        }
        if (connState === false) {
          if (isThisRouteFromToday) {
            setActivities([routes[index]]);
          } else {
            // Tem que ativar a internet para finalizar vistoria
          }
        }
      } else {
        if (connState) {
          console.log('-> Caso 6');
          await getDailyWork();
        }
        if (connState === false) {
          console.log('7 -> entrou aqui');
        }
      }

      setLoading(false);
    }

    manageRoutes();
  }, [connState, currentRouteIndex, routes]);

  // useEffect(() => {
  //   function loadWorkInfo() {
  //     if (activity) {
  //     }
  //   }

  //   loadWorkInfo();
  // }, []);

  const ActivityComponent = () => {
    return activities.map(activity => (
      <RouteCard key={activity.trabalhoDiario.id}>
        <RouteHeader>
          <RouteTitle>
            {activity.trabalhoDiario.atividade.metodologia.sigla}
          </RouteTitle>
        </RouteHeader>
        <RouteContent>
          <FullPair>
            <Small>Objetivo</Small>
            <Description>
              {activity.trabalhoDiario.atividade.objetivo.descricao}
            </Description>
          </FullPair>
          {!activity.trabalhoDiario.horaInicio && (
            <RowPair>
              <HalfPair>
                <Small>Data</Small>
                <Description>
                  {formatDate(activity.trabalhoDiario.data)}
                </Description>
              </HalfPair>
              <HalfPair>
                <Small>Qtd. de quarteirões</Small>
                <Description>{activity.rota.length}</Description>
              </HalfPair>
            </RowPair>
          )}
          {activity.trabalhoDiario.horaInicio && (
            <>
              <RowPair>
                <HalfPair>
                  <Small>Data</Small>
                  <Description>
                    {formatDate(activity.trabalhoDiario.data)}
                  </Description>
                </HalfPair>
                <HalfPair>
                  <Small>Hora de início</Small>
                  <Description>
                    {activity.trabalhoDiario.horaInicio}
                  </Description>
                </HalfPair>
              </RowPair>
              <FullPair>
                <Small>Qtd. de quarteirões</Small>
                <Description>{activity.rota.length}</Description>
              </FullPair>
            </>
          )}
          <ButtonRow>
            {!activity.trabalhoDiario.horaInicio ? (
              <StartRouteButton
                loading={loadingStartRoute}
                onPress={() => handleStartActivity(activity)}
              >
                Iniciar rota
              </StartRouteButton>
            ) : (
              <EndRouteButton
                type="error"
                onPress={() => handleFinishActivity()}
              >
                Encerrar rota
              </EndRouteButton>
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
        </RouteContent>
      </RouteCard>
    ));
  };

  const ProgressBarComponent = () => {
    const [propertiesSize, inspectionsSize] = agentPerformance();
    const percentage = Math.ceil((inspectionsSize / propertiesSize) * 100);

    return (
      <>
        <Title>Progresso na rota atual</Title>
        <Card>
          <BarContainer>
            <DescriptionContainer>
              <PercentageTextContainer>
                <PercentageText
                  bold
                >{`${inspectionsSize} / ${propertiesSize}  `}</PercentageText>
                <PercentageText>imóveis vistoriados</PercentageText>
              </PercentageTextContainer>
              <PercentageText primary bold>{`${percentage}%`}</PercentageText>
            </DescriptionContainer>
            <OutsideBar>
              <InsideBar percentage={percentage} />
            </OutsideBar>
          </BarContainer>
        </Card>
      </>
    );
  };

  const EmptyState = () => {
    return (
      <EmptyContainer>
        {connState && (
          <>
            {/* <Image
              source={emptyState}
              style={{
                resizeMode: 'contain',
                width: 270,
                height: 160,
                marginBottom: 20,
                tintColor: '#999999',
              }}
            /> */}
            <EmptyTitle>Ohh... que pena!</EmptyTitle>
            <EmptyDescription>
              Você não possui rotas planejadas para hoje. Que tal voltar mais
              tarde?
            </EmptyDescription>
          </>
        )}
        {connState === false && (
          <>
            {/* <Image
              source={noInternet}
              style={{
                resizeMode: 'contain',
                width: 270,
                height: 160,
                marginBottom: 20,
                tintColor: '#999999',
              }}
            /> */}
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
      {loading ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Container>
          {activities.length > 0 ? (
            <>
              <ActivityComponent />
              {currentRouteIndex >= 0 && <ProgressBarComponent />}
            </>
          ) : (
            <EmptyState />
          )}
        </Container>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  user_id: state.user.profile.id,
  routes: state.routes.routes,
  currentRouteIndex: state.routes.currentRouteIndex,
  loadingStartRoute: state.routes.loadingStartRoute,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startRouteRequest,
      removeFinishedRoute,
      setCurrentRoute,
      finishDailyWork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlannedRoutes);
