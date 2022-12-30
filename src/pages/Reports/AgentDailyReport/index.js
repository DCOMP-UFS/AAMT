import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import { View, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { Text } from 'react-native-svg';

import api from '../../../services/api';

import {
  Container,
  Card,
  Header,
  PropertyTitle,
  RowContainer,
  CardPair,
  InfoContainer,
  Title,
  MiniText,
  NumberText,
} from './styles';

import {LoadingContainer, LoadingComponent} from '../styles'

const AgentDailyReport = () => {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState([]);
  const [propertiesType, setPropertiesType] = useState([
    { label: 'Residencial', value: 0 },
    { label: 'Terreno Baldio', value: 0 },
    { label: 'Comercial', value: 0 },
    { label: 'Ponto Estratégico', value: 0 },
  ]);
  const [recipientType, setRecipientType] = useState([
    { label: 'A1', value: 0 },
    { label: 'A2', value: 0 },
    { label: 'B', value: 0 },
    { label: 'C', value: 0 },
    { label: 'D1', value: 0 },
    { label: 'D2', value: 0 },
    { label: 'E', value: 0 },
  ]);
  const [pendency, setPendency] = useState([
    { label: 'Fechado', value: 0 },
    { label: 'Recusado', value: 0 },
  ]);
  const [status, setStatus] = useState([
    { label: 'Trabalhados', value: 0 },
    { label: 'Inspecionados', value: 0 },
    { label: 'Com foco', value: 0 },
    { label: 'Tratados', value: 0 },
    { label: 'Fechados/Recusados', value: 0 },
    { label: 'Recuperados', value: 0 },
  ]);
  const [destination, setDestination] = useState([
    { label: 'Eliminado', value: 0 },
    { label: 'Tratado', value: 0 },
  ]);
  const [treatment, setTreatment] = useState([
    { label: 'Focal', value: 0 },
    { label: 'Perifocal', value: 0 },
  ]);
  const [sampleNumber, setSampleNumber] = useState(0);
  const [larvicide, setLarvicide] = useState(0);

  const navigation = useNavigation();

  function filter() {
    let pendencia = pendency;
    let statusVistoria = status;
    let tipoImovel = propertiesType;
    let tipoDeposito = recipientType;
    let destinoDeposito = destination;
    let tratamento = treatment;
    let amostras = sampleNumber;
    let qtdLarvicida = larvicide;

    activity.map(inspection => {
      switch (inspection.tipoImovelVistoria) {
        case 1:
          tipoImovel[0].value++;
          break;
        case 2:
          tipoImovel[1].value++;
          break;
        case 3:
          tipoImovel[2].value++;
          break;
        case 4:
          tipoImovel[3].value++;
          break;
        default:
          break;
      }
      switch (inspection.pendencia) {
        case 'F':
          pendencia[0].value++;
          statusVistoria[4].value++;
          break;
        case 'R':
          pendencia[1].value++;
          statusVistoria[4].value++;
          break;
        default:
          break;
      }
      switch (inspection.situacaoVistoria) {
        case 'N':
          statusVistoria[0].value++;
          break;
        case 'R':
          statusVistoria[5].value++;
          statusVistoria[0].value++;
          break;
        default:
          break;
      }
      if (inspection.depositos.length > 0) {
        statusVistoria[1].value++;
        inspection.depositos.map(deposito => {
          switch (deposito.tipoRecipiente) {
            case 'A1':
              tipoDeposito[0].value++;
              break;
            case 'A2':
              tipoDeposito[1].value++;
              break;
            case 'B':
              tipoDeposito[2].value++;
              break;
            case 'C':
              tipoDeposito[3].value++;
              break;
            case 'D1':
              tipoDeposito[4].value++;
              break;
            case 'D2':
              tipoDeposito[5].value++;
              break;
            case 'E':
              tipoDeposito[6].value++;
              break;
            default:
              break;
          }
          switch (deposito.fl_tratado) {
            case true:
              destinoDeposito[0].value++;
              break;
            default:
              break;
          }
          switch (deposito.fl_eliminado) {
            case true:
              destinoDeposito[1].value++;
              break;
            default:
              break;
          }
          if (deposito.tratamentos.length > 0) {
            deposito.tratamentos.map(tipoTratamento => {
              switch (tipoTratamento.tecnica) {
                case 1:
                  tratamento[0].value++;
                  qtdLarvicida = qtdLarvicida + tipoTratamento.quantidade;
                  break;
                case 2:
                  tratamento[1].value++;
                  qtdLarvicida = qtdLarvicida + tipoTratamento.quantidade;
                  break;
                default:
                  break;
              }
            });
          }
          if (deposito.amostras.length > 0) {
            amostras = amostras + deposito.amostras.length;
          }
          if (deposito.fl_comFoco) {
            statusVistoria[2].value++;
          }
          if (deposito.fl_tratado) {
            statusVistoria[3].value++;
          }
        });
      }
    });

    setPropertiesType(tipoImovel);
    setRecipientType(tipoDeposito);
    setPendency(pendencia);
    setStatus(statusVistoria);
    setDestination(destinoDeposito);
    setTreatment(tratamento);
    setSampleNumber(amostras);
    setLarvicide(qtdLarvicida);
  }

  const route = useRoute();
  const { id, date } = route.params;

  useEffect(() => {
    async function loadActivity() {
      try {
        setLoading(true)
        const response = await api.get(`/trabalhoDiario/${id}`);
        //console.log(JSON.stringify(response.data));
        if (response.data.status) {
          setActivity(response.data.data.vistorias);
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar o boletim diário'
        );
      }
    }

    loadActivity();
  }, []);

  useEffect(() => {
    if (activity.length > 0) {
      filter();
    }
  }, [activity]);

  function Bar(data) {
    const CUT_OFF = 0;
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={value.value > CUT_OFF ? x(0) + 10 : x(value.value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={value.value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
        >
          {value.value}
        </Text>
      ));

    return (
      <View
        style={{ flexDirection: 'row', height: 'auto', paddingVertical: 16 }}
      >
        <YAxis
          data={data}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          formatLabel={(_, index) => data[index].label}
          svg={{ fill: 'black' }}
        />
        <BarChart
          style={{ flex: 1, marginLeft: 8, height: 200 }}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.value}
          svg={{ fill: '#0095DA' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.VERTICAL} />
          <Labels />
        </BarChart>
      </View>
    );
  }

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>
      ) : (
        <Container>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por tipo</PropertyTitle>
            </Header>
            {Bar(propertiesType)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Imóveis por status</PropertyTitle>
            </Header>
            {Bar(status)}
          </Card>
          <Card>
            <Header>
              <PropertyTitle>Depósitos inspecionados por tipo</PropertyTitle>
            </Header>
            {Bar(recipientType)}
          </Card>
          <RowContainer>
            <CardPair>
              <InfoContainer>
                <Title>Amostra(s)</Title>
                <MiniText>Nº amostras</MiniText>
              </InfoContainer>
              <NumberText>{sampleNumber}</NumberText>
            </CardPair>
            <CardPair>
              <InfoContainer>
                <Title>Recusa(s)</Title>
                <MiniText>Nº de recusas</MiniText>
              </InfoContainer>
              <NumberText>{pendency[1].value}</NumberText>
            </CardPair>
          </RowContainer>
          <RowContainer>
            <CardPair>
              <InfoContainer>
                <Title>Fechada(s)</Title>
                <MiniText>Nº imóveis fechados</MiniText>
              </InfoContainer>
              <NumberText>{pendency[0].value}</NumberText>
            </CardPair>
            <CardPair>
              <InfoContainer>
                <Title>Eliminado(s</Title>
                <MiniText>Qtd. Depósito(s)</MiniText>
              </InfoContainer>
              <NumberText>{destination[0].value}</NumberText>
            </CardPair>
          </RowContainer>
          <RowContainer>
            <CardPair>
              <InfoContainer>
                <Title>Tratado(s)</Title>
                <MiniText>Qtd. Depósito(s)</MiniText>
              </InfoContainer>
              <NumberText>{destination[1].value}</NumberText>
            </CardPair>
            <CardPair>
              <InfoContainer>
                <Title>Larvicida</Title>
                <MiniText>Qtd. usada</MiniText>
              </InfoContainer>
              <NumberText>{`${larvicide} g`}</NumberText>
            </CardPair>
          </RowContainer>
        </Container>
      )}
    </>
  );
};

export default AgentDailyReport;
