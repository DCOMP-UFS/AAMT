import React, { useState, useEffect } from 'react';
import { Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO, isToday } from 'date-fns';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import AlertBox from '../../../components/AlertBox';
import Dropdown from '../../../components/Dropdown';

import emptyState from '../../../assets/empty-state.png';
import noInternet from '../../../assets/no-internet.png';

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
  resetfinishDailyWork
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
  const [connState, setConnState] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [isOldRouteWithConn, setIsOldRouteWithConn] = useState(false);
  const [isOldRouteWithoutConn, setIsOldRouteWithoutConn] = useState(false);
  const [loadingEndRoute, setLoadingEndRoute] = useState(false)
  const [loadingSearchRoute, setLoadingSearchRoute] = useState(false)


  const [listaAtividadesRotas, setListaAtividadesRotas] = useState([])
  const [indexAtividadeOptions, setIndexAtividadeOptions] = useState([])
  const [indexAtividade, setIndexAtividade] = useState(undefined)

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
    setLoadingEndRoute(true)
    props.finishDailyWork(inspections, time, dailyWorkId, currentRouteIndex);
  }

  function handleStartActivity(route) {
    if (connState) {
      const time = getActualTime();
      const dailyWorkId = route.trabalhoDiario.id;

      props.startRouteRequest(route, dailyWorkId, time);
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
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Encerrar rota',
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

  async function getDailyWorks() {
    try {
      setLoadingSearchRoute(true)
      setActivities([])
      setIndexAtividade(undefined)
      setIndexAtividadeOptions([])

      const response = await api.get(`/rotas/todas/${user_id}/usuarios/${date}/data`,{ params: {isMobile: true}});

      const data = response.data;
      var listaAtividadesRotas = []
      var indexAtividadeOptions = []
      var index = 0

      data.forEach(element => {
        if(element.trabalhoDiario.horaFim === null){

          //Evita problema caso uma rota tenha sido iniciada na aplicação web
          //e o agente começa a trabalhar nela no mobile
          element.trabalhoDiario.horaInicio = null

          listaAtividadesRotas.push(element)
          indexAtividadeOptions.push({
            id: index,
            name: element.trabalhoDiario.atividade.id+" ("+element.trabalhoDiario.atividade.metodologia.sigla+")"
          })
          index++
        }
      });
      setIndexAtividadeOptions(indexAtividadeOptions)
      setListaAtividadesRotas(listaAtividadesRotas)
      setLoadingSearchRoute(false)
    } catch (err) {
      setLoadingSearchRoute(false)
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
      setIsOldRouteWithConn(false);
      setIsOldRouteWithoutConn(false);

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
              setIsOldRouteWithConn(true);
            }
          } else {
            console.log(
              '-> ENTROU AQUI NO PROBLEMA DA ROTA NÃO ENCONTRADA!!!!!!!!'
            );
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
            setActivities([routes[index]]);
            setIsOldRouteWithoutConn(true);
          }
        }
      } else {
        if (connState) {
          await getDailyWorks();
        }
      }

      setLoading(false);
    }

    manageRoutes();
  }, [connState, currentRouteIndex, routes]);

  useEffect(() => {
    setLoadingEndRoute(false)
    if(props.finished){
      async function searchDailyWorks(){
        setLoading(true)
        await getDailyWorks()
        setLoading(false)
      }
      searchDailyWorks()
    }
    props.resetfinishDailyWork()
  }, [props.finished]);

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
            <Small>Código da atividade</Small>
            <Description>
              {activity.trabalhoDiario.atividade.id}
            </Description>
          </FullPair>
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
                disabled={loadingStartRoute}
                loading={loadingStartRoute}
                onPress={() =>
                  Alert.alert(
                    'Atenção!',
                    `Tem certeza que deseja iniciar esta rota? Ao fazer isso não será `+
                     `mais possivel iniciar outras rotas a até que esta seja encerrada`,
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },
                      {
                        text: 'Iniciar rota',
                        onPress: () => handleStartActivity(activity),
                      },
                    ],
                    { cancelable: false }
                  ) 
                }
              >
                Iniciar rota
              </StartRouteButton>
            ) : (
              <EndRouteButton
                // type="error"
                disabled={loadingEndRoute}
                loading={loadingEndRoute}
                onPress={() => handleFinishActivity()}
              >
                Encerrar rota
              </EndRouteButton>
            )}
            {activity.trabalhoDiario.horaInicio ? (
              <RouteButton
                isDisabled={loadingEndRoute}
                onPress={() =>
                  navigation.navigate('Rota', {
                    isRouteStarted: activity.trabalhoDiario.horaInicio,
                  })
                }
              >
                Vistorias
              </RouteButton>
            ) : (
              <RouteButton
                isDisabled={loadingStartRoute}
                onPress={() =>
                  navigation.navigate('Rota', {
                    rota: activity.rota,
                    isRouteStarted: activity.trabalhoDiario.horaInicio,
                  })
                }
                //isDisabled={true}
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
        {connState === true && (
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
              Não foi encontrada uma rota planejada para hoje. Caso deseje fazer outra busca, aperte o botão abaixo.
            </EmptyDescription>
            <StartRouteButton
                style={{marginTop:10}}
                disabled={loadingSearchRoute}
                loading={loadingSearchRoute}
                onPress={() => getDailyWorks()}
              >
                Buscar Rotas
              </StartRouteButton>
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

  const OldRouteAlert = () => {
    return (
      <>
        {isOldRouteWithoutConn && (
          <AlertBox
            type="warning"
            icon="exclamation-triangle"
            title="É preciso conexão com a internet"
            message="A rota atual é antiga e precisa ser encerrada antes de inicar uma nova rota."
          />
        )}
        {isOldRouteWithConn && (
          <AlertBox
            type="warning"
            icon="exclamation-triangle"
            title="Esta rota não é de hoje"
            message="A rota atual é antiga e precisa ser encerrada antes de inicar uma nova rota."
          />
        )}
      </>
    );
  };

  const CodeActivitySelector = () => {
    return (
      <>
      <Card>
          <Dropdown
            enabled={!loadingStartRoute && !loadingEndRoute}
            itens={indexAtividadeOptions}
            label="Codigo da atividade"
            placeholder="Selecione o codigo"
            selectedValue={indexAtividade}
            onValueChange={value => {
              setIndexAtividade(value)
              if(value != undefined){
                var activity = []
                activity.push( listaAtividadesRotas[value] )
                setActivities(activity)
              }
              else
                setActivities([])
            }}
          />
        </Card>
      </>
    )
  }

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Container>
          {listaAtividadesRotas.length > 0 || currentRouteIndex >= 0 ? (
            <>
              <OldRouteAlert />
              {currentRouteIndex < 0 && <CodeActivitySelector/>}
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
  finished: state.routes.finished,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startRouteRequest,
      removeFinishedRoute,
      setCurrentRoute,
      finishDailyWork,
      resetfinishDailyWork
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlannedRoutes);
